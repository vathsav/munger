const credentials = require('./config.js');
const excel = require('excel');
const firebase = require('firebase');
var list = require('select-shell')({
    pointer: ' ▸ ',
    pointerColor: 'yellow',
    checked: ' ◉  ',
    unchecked:' ◎  ',
    checkedColor: 'green',
    msgCancel: 'No selected options!',
    msgCancelColor: 'orange',
    multiSelect: true,
    inverse: true,
    prepend: true
  }
);
const ora = require('ora');
const readline = require('readline');

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

var invalidCharacters = ['.', '#', '$', '/', '[', ']'];
var numberOfSheets = 1;
var data;
var columnData;

var spinner = ora('Chunking your data').start();
spinner.color = 'yellow';

excel('data/data.xlsx', numberOfSheets, function(err, cells) {
  if(err) spinner.fail('Failed to parse data');
  spinner.succeed('Data read successfully');
  data = cells;

  // Display the column titles
  displaySelector(data[0]);
});

/*
  TODO Include keys for departments
*/

function askCount() {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  reader.question('\nEnter the number of records to parse: ', (count, err) => {
    if (err)
      console.log(err);
    constructJSON(count);
    reader.close();
  });
}

var displaySelector = function(titles) {
  // Push each title to the list
  titles.forEach(function(title, index) {
    if (title.length != 0)
      list.option(title);
  });

  list.on('select', function(choices) {
    getColumnData(titles, choices);
  });

  list.on('cancel', function(choices) {
    console.log("Cancelled!");
  });

  list.list();
}

var getColumnData = function(titles, choices) {
  columnData = new Array(choices.length);

  for (var i = 0; i < choices.length; i++) {
    columnData[i] = new Array(20);

    // Figure out the length of this array
    data.forEach(function(datum, index) {
      // TODO UUUHHHM.
      columnData[i][index] = datum[titles.indexOf(choices[i].value)];
    });
  }

  askCount();
}

function constructJSON(count) {
  var listOfCourses = columnData[0];
  var listOfKeywords = columnData[1];
  var keywords = {};

  // Omit the titles of the columns. Iterate from index 1.
  for (var i = 1; i < count; i++) {
    var course = listOfCourses[i];
    var arrayOfKeywords = listOfKeywords[i].split('; ');

    if (course.length == 0)
      course = 'Error';

    arrayOfKeywords.forEach(function(keyword, index) {
      // Ditch invalid characters Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
      if (keyword.length == 0)
        keyword = "Error";

      invalidCharacters.forEach(function(character, index) {
        for (var position = 0; position < keyword.length; position++) {
          if (keyword.includes(character)) {
            keyword = keyword.replace(character, "");
          }
        }
      });

      // Check if keyword is already present in the object
      if (keywords[keyword] != undefined) {
        // Check if the course has already been encountered for this keyword
        var pandaWord = JSON.stringify(keywords[keyword]);
        pandaWord = pandaWord.substring(1, pandaWord.length - 1);

        if (keywords[keyword][course] != undefined) {
          // The course has already been encountered for this keyword. So get the count, and increment it.
          var count = keywords[keyword][course] + 1;
          keywords[keyword] = JSON.parse('{ ' + pandaWord + ', "' + course + '": ' + count + ' }');
        } else {
          // First encounter for a particular course
          keywords[keyword] = JSON.parse('{ ' + pandaWord + ', "' + course + '": ' + 1 + ' }');
        }
      } else {
        // Encountering the keyword for the first time
        keywords[keyword] = JSON.parse('{ "' + course + '": ' + 1 + '}');
      }
    });
  }

  firebase.database().ref('/').set(keywords)
    .then(function() {
      console.log("Push successful!");
      askCount();
    })
    .catch(function() {
      console.log("Failed to push :(");
    });
}
