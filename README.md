# Discover Music

[Brian Musonza](https://github.com/) ||
[Elizabeth Luong](https://github.com/elizabethluong/)

## Contents

[User-Instructions](#User-Instructions) ||
[Brief](#brief) ||
[User Stories](#user-stories) ||
[Methodologies and Processes](#methodologies-and-processes) ||
[Reflections on the Project](#reflections-on-the-project)

## User Instructions

1. Open terminal and run `git clone`
2. Then cd `Discover_Music`
3. Then run `npm install`
4. Then run `python -m pip install -r requirements.txt`
5. Then cd `client`
6. Then run `npm install`
7. Then cd .. `Discover_Music`
8. Then run `yarn start`
9. Login using your Spotify details

## Brief

Project Guidance/Requirements:
Must:

- Be Fullstack - i.e. have a Front End, Back End and Persistent Data Storage
- Have a defined MVP (Minimum Viable Product)
- Have User stories
- Have a GREAT readme!
- Be tested min level 60% coverage, ideally 80% (reflective of current industry targets)
- Have User authentication of some description
  Should:
- Have a carefully considered user journey
- Have a beautiful, clean and purposeful UI
- Have defined models/schema/relationships mapped out up front (maybe even in readme)
  Could:
- Make use of FE resources such as BootStrap, Bluma, - Tailwind etc.
- Be deployed

## User Stories

- As a user I would like to discover new music by genre:
- As a user I would like to log into my account.
  - As a user I want to select a genre and view music related to that genre.
  - As a user I want to be able to listen to the tracks.
  - As a user U want to be able to log out of my account.

## Methodologies and Processes

- Standups every morning at 9.15AM
- Each team member:
  - Go through what was achieved the day before.
  - What they're looking to achieve in the day ahead.
  - if there's any blockers.
- Retros at 5.45pm

### Technologies

- Flask
- React
- Python
- JavaScript
- CSS
- Bulma
- Git & Github

## Reflections on the Project

In the planning process, we knew we wanted to use Flask as our backend and React as our frontend. The biggest challenge we faced was authorizing the user where we had issues connecting the front end login page to authorization.

On reflection we were a bit too ambitious. We initially wanted to have a sentiment analysis for track functionality, user profile containing information about liked tracks and comments. We therefore scaled the project back.

