# Game-Club

A book club for video games made as a project for Metropolia UAS course Web-development 2.
<br><br>
The website is built using React NextJS via TypeScript and uses Graphql and mongoDB as the backend.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Frameworks and Technologies](#frameworks-and-technologies)

## Description

Think book club but replace 'book' with 'game'.. yeah.. a Game Club! That's what this project is supposed to be. A club for gamers by gamers. It is a combination of three services; Game reviews, forum discussions and "Looking for groups" (LFG) services. These three services are grouped up to be game specific, meaning that every game has its own collection of reviews, "LFG's" and forum discussions.
<br><br>
Reviews are plain objective ratings of a game. The score spans from 1 to 5 with an optional textbox. LFG is meant to help players find like-minded individuals to play and interact with. You can create an LFG post where you ask for, for example, assistance or a full squad for a co-op game. The forum is meant for all other discussions related to the video game. You can create a post, other people can comment on your posts.
<br><br>
The project is meant for gamers who are looking for reviews and discussions about a particular game as well as finding other gamers to play with. The average user would discuss the game in the forums section, look for others to play with in the LFG and afterwards review the game in the review service.

## Features

Since this is a backend course, the front end features are a bit limited.

#### Register

Users can register to the service with a unique user name. Afterwards they can log in with said account.

#### Reviews

Users can write public reviews for a selection of different games. These reviews display who has written them and show for the specifig game.

#### LFG's (Looking For Group)

Users can write LFG posts to look for people to play games with. These are game specific.

#### Forum

Users can write game specific forum posts and comment on said posts. The posts are game specific and the omments are post specific and can be toggled on and off. This prevents any external clutter from displaying.

## Installation

The project can be installed locally. In order to do that, you need both this project and the [Game-Club auth server](https://github.com/TapioAJ/Game-Club-auth-server). Follow the instructions there before running continuing.
Clone this repository and to install required dependencies via `npm i`.\
The project uses MongoDB so next you need to create a mongodb cloud database using MongoDB Atlas. After setting up the cloud database you need to generate a `.env` file. Use the `.env.sample` as a boilerplate. Using Mongo Atlas, add the database url to the DATABASE_URL value. Write down a JWT secret that is used as a key to compare the authentication. Make sure this is the same in the auth server.
After that is done use `npm run dev` to start the development server.\
It will open the dev server on `localhost:3000`.\
The GraphQL API endpoint can be visited through `localhost:3000/api/graphql`.

## Usage

Game Club is meant for people who enjoy watching, playing and reading about videogames. The login, register and logout can be accessed from the top right at all times and are context based, meaning you cannot accidentally log in again if you are already logged in. Registering an account requires logging out.
<br>
Click the Game Club logo to open the list of games that are currently added to the database. Currently the database for the games is static.
(For future development plans, more games will be added and a possible user adding of new videogames. Currently if you wish to do so, you can add games manually to the database via mongoose.)
<br>
Clicking on a game opens up the page where you can navigate over to either the reviews, lfg or forum page for that single game. Users will need to register and log in to the service if they wish to interact with most of the sites content, (e.g. Write forum posts, comment on posts, leave a review etc.). The written data is accessable to everyone but adding your own requires authentication.
<br>
When registering an account, if succesfull, the website informs of the registration and redirects to the login page. Here you can log in with the newly created account. After that, you can create posts in the games reviews, lfgs or forums.
<br>
The profile contains a small bio that can be edited. As of this version it has no actual use other than a proof of concept. The bio updates to the database.

## Frameworks and Technologies

This project uses the following frameworks and libraries:

- React
- NextJS (App Router)
- Mongoose
- MongoDB Atlas
- Apollo GraphQL

## [Check out the website here!](gameclubmain.azurewebsites.net)
