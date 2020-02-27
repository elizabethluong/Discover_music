from . import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.String(160), primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(84), unique=True, nullable=False)
    created = db.Column(db.DateTime, nullable=False, index=True, default=datetime.utcnow)
    country = db.Column(db.String(64), nullable=True) 
    age = db.Column(db.Integer, nullable=True)
    comments = db.relationship('Comment', backref='author', lazy='dynamic')

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(240))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.String(160), db.ForeignKey('user.id'))

class Followed(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(240))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.String(160), db.ForeignKey('user.id'))

class Saved(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(240))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.String(160), db.ForeignKey('user.id'))
