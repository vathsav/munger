# PoliParser

A parser that scans a list of Polimi theses and returns a super huge JSON object. The object contains keywords used in the theses and its number of occurrences in each school.

## Setup

### Install Node.js

[Download page](https://nodejs.org/en/download/ "Node.js")

### NPM Install Firebase

You can use the npm module to use Firebase in the Node.js runtime.

```
$ cd <your-project-directory>
$ npm init
$ npm install --save firebase
```
### Set up your Firebase Web App

* Create a new Firebase Web App using the Firebase console.
* Save your project's [config object](https://firebase.google.com/docs/database/web/start#initialize_the_database_javascript_sdk) in the config.js file.

## Usage
```
$ node poliparser.js
```
