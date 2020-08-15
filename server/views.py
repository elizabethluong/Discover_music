from flask import Blueprint, g, flash, jsonify, request, redirect, session, url_for
from flask_login import login_manager, login_user, logout_user, login_required
import ast
from . import db
from .models import User, Comment, Followed, Saved
import json
import requests
from urllib.parse import quote
from server.models import User, Comment
from datetime import datetime as dt
from flask_cors import CORS, cross_origin


main = Blueprint('main', __name__)
#  Client Keys
CLIENT_ID = "dae4590c85a24ae9a56d11fc2294dc0a"
CLIENT_SECRET = "62b0275af70c49d7af8077d2267b8161"

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

# Server-side Parameters
CLIENT_SIDE_URL = "http://127.0.0.1"
PORT = 33507
REDIRECT_URI = "{}:{}/api/callback/".format(CLIENT_SIDE_URL, PORT)
SCOPE = "user-read-private playlist-read-private user-read-email user-top-read"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    # "state": STATE,
    # "show_dialog": SHOW_DIALOG_str,
    "client_id": CLIENT_ID
}

# @login_manager.user_loader
# def user_loader(user_id):
#     return 

@main.route("/")
def index():
    # Auth Step 1: Authorization
    url_args = "&".join(["{}={}".format(key, quote(val))
                         for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return redirect(auth_url)


@main.route("/api/callback/")
def callback():
    session.clear()
    # Auth Step 4: Requests refresh and access tokens
    auth_token = request.args['code']

    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }

    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload)
    # Auth Step 5: Tokens are Returned to mainlocation
    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    session["token_info"] = access_token
    # Auth Step 6: Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(
        access_token), "Access-Control-Allow-Origin": "*"}

    # Get profile data
    user_profile_api_endpoint = "{}/me".format(SPOTIFY_API_URL)
    profile_response = requests.get(
        user_profile_api_endpoint, headers=authorization_header)
    profile_data = json.loads(profile_response.text)

    # data = request.args["data"]
    # Convert data to dictionary
    # df = ast.literal_eval(profile_data)
    id = profile_data["id"]
    name = profile_data["display_name"]
    email = profile_data["email"]
    country = profile_data["country"]
    # Check existing user.
    if id and email:
        existing_user = User.query.filter(
            User.id == id or User.email == email).first()
        if existing_user:
            flash("Already registered!")
            return redirect("http://localhost:3000/dash/#id={}&code={}" .format(id, access_token))
    # Add new user
    new_user = User(id=id, name=name, email=email, country=country,
                    created=dt.now())
    db.session.add(new_user)
    db.session.commit()
    flash("User created")

    # Combine profile and playlist data to display
    return redirect("http://localhost:3000/dash/#id={}&code={}" .format(id, access_token))


@main.route("/user/<id>")
def user(id):
    user = User.query.filter_by(id=id).first()

    if not user:
        flash("Please login!")
        redirect(url_for(".index"))
    # Get data from database

    # Import
    # access_token = session["toke"]
    # Auth Step 6: Use the access token to access Spotify API
    # authorization_header = {"Authorization": "Bearer {}".format(access_token)}

    # Get profile data

    results = [
        {
            "name": user.name,
            "country": user.country,
            "id": user.id
        }
    ]
    return jsonify({'data': results})


@main.route("/get_playlists/<token>/<id>")
def get_playlists(token, id):
    access_token = token
    user_id = id
    # Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}

    # Get user playlist data
    playlist_api_endpoint = "https://api.spotify.com/v1/users/{}/playlists".format(
        user_id)
    playlists_response = requests.get(
        playlist_api_endpoint, headers=authorization_header)
    playlist_data = json.loads(playlists_response.text)
    return jsonify(playlist_data)


@main.route("/get_genres/<token>")
def get_genres(token):
    access_token = token
    # Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}
    # Get genre data
    genre_endpoint = "https://api.spotify.com/v1/recommendations/available-genre-seeds"
    genre_endpoint_response = requests.get(
        genre_endpoint, headers=authorization_header)
    genre_data = json.loads(genre_endpoint_response.text)
    return jsonify(genre_data)


@main.route("/get_tracks/<token>/<genre>")
def get_tracks(token, genre):
    access_token = token
    # Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}
    # Get genre data
    tracks_end_point = "https://api.spotify.com/v1/recommendations?seed_genres={}".format(
        genre)
    tracks_endpoint_response = requests.get(
        tracks_end_point, headers=authorization_header)
    tracks_data = json.loads(tracks_endpoint_response.text)
    return jsonify(tracks_data)


@main.route("/follow_artist/<token>/<artist_id>/<user_id>")
def follow_artist(token, artist_id, user_id):

    # Save followed artist id to our database
    follow_artist = Followed(
        body=artist_id, timestamp=dt.now(), user_id=user_id)
    db.session.add(follow_artist)
    db.session.commit()
    flash("Artist followed!")

    access_token = token
    # Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}
    # Get genre data
    follow_endpoint = "https://api.spotify.com/v1/me/following?type=artists&ids=" + artist_id
    follow_endpoint_response = requests.put(
        follow_endpoint, headers=authorization_header)
    follow_data = json.loads(follow_endpoint_response.text)
    return "Following artist!"


@main.route("/save_track/<token>/<track_id>/<user_id>")
def save_track(token, track_id, user_id):

    # Save followed artist id to our database
    saved_track = Saved(body=track_id, timestamp=dt.now(), user_id=user_id)
    db.session.add(saved_track)
    db.session.commit()

    access_token = token
    # Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}
    # Get genre data
    follow_endpoint = "https://api.spotify.com/v1/me/tracks?ids=" + track_id
    follow_endpoint_response = requests.put(
        follow_endpoint, headers=authorization_header)
    follow_data = json.loads(follow_endpoint_response.text)
    return "Saved track!"


@main.route("/logout")
def logout():
    session.clear()
    return redirect("https://accounts.spotify.com")
