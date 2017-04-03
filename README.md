# Munger

A parser that accepts various types as data and returns a JSON object.

## Setup

### Install Node.js

[Download page](https://nodejs.org/en/download/ "Node.js")

### Configure your Firebase Web App

* Create a new Firebase Web App using the Firebase console.
* Save your project's [config object](https://firebase.google.com/docs/database/web/start#initialize_the_database_javascript_sdk) in the config.js file.

### NPM Install Dependencies
```
$ cd <your-project-directory>
$ npm install
```

## Usage
```
$ cd <your-project-directory>
$ node munger.js
```

## Knows Bugs
* Firebase doesn't accept certain characters in its keys.
* select-shell list appends previous options.
