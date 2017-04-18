/*
  Utility methods
*/

const credentials = require('./config.js');
const firebase = require('firebase');

var config = {
  apiKey: credentials.apiKey,
  authDomain: credentials.authDomain,
  databaseURL: credentials.databaseURL,
  storageBucket: credentials.storageBucket,
  messagingSenderId: credentials.messagingSenderId
};

firebase.initializeApp(config);
var database = firebase.database();

exports.generateKey = function(reference) {
  return firebase.database().ref("keywords").child(reference).push().key;
}

exports.fetch = function(reference) {
  firebase.database().ref(reference).once('value')
    .thne(function(snapshot) {
      console.log(snapshot.value());
    })
    .catch(function(e) {
      console.log("Failed to fetch :( " + e);
    });
}

exports.push = function(reference, data) {
  firebase.database().ref(reference).set(data)
    .then(function() {
      console.log("Push successful!");
    })
    .catch(function(e) {
      console.log("Failed to push :( " + e);
    });
}

exports.update = function(reference, updates) {
  firebase.database().ref().update(updates)
    .then(function() {
      console.log("Update successful!");
    })
    .catch(function(e) {
      console.log("Failed to update :( " + e);
    });
}

exports.remove = function(reference) {
  firebase.database().ref(reference).remove()
    .then(function() {
      console.log("Updated successfully");
      process.exit();
    })
    .catch(function(e) {
      console.log("Failed to delete :( " + e);
    });
}

exports.chainedUpdate = function(data) {
  firebase.database().ref().update(data)
    .then(function() {
      console.log("Updated successfully");
      process.exit();
    })
    .catch(function(e) {
      console.log("Failed to update :( " + e);
    });
}
