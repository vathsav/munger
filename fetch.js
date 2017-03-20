const firebase = require("firebase");
const readline = require('readline');
const credentials = require("./config.js");
const fs = require('fs');

// Initialize Firebase
var config = {
  apiKey: credentials.apiKey,
  authDomain: credentials.authDomain,
  databaseURL: credentials.databaseURL,
  storageBucket: credentials.storageBucket,
  messagingSenderId: credentials.messagingSenderId
};

firebase.initializeApp(config);
var database = firebase.database();

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask() {
  reader.question('Enter keyword to query for: ', (keyword, err) => {
    if (err)
      console.log(err);
    firebase.database().ref('/keywords/' + keyword).once('value').then(function(snapshot) {
      // Print the whole JSON object
      console.log(snapshot.val());
      reader.close();
    });
  });
}

ask();
