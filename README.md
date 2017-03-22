# PoliParser

A parser that scans a list of Polimi theses and returns a super huge JSON object. The object contains keywords used in the theses and its number of occurrences in each school.

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
$ node poliparser.js
```

## Knows Bugs
* Firebase doesn't accept certain characters in its keys. [Temporary workaround](https://github.com/vathsav/poliparser/blob/b1cdb1b56f1b7f7f60ac03e3ed69a5d8ad16ede0/poliparser.js#L32).
* select-shell list appends previous options.
