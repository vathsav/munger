const d3 = require('d3');
const excel = require('excel');
const fs = require('fs');
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
const utils = require('./utils.js');

var invalidCharacters = ['.', '#', '$', '/', '[', ']', '\n', '\r'];
var numberOfSheets = 1;
var data;
var columnData;

var spinner = ora('Chunking your data').start();
spinner.color = 'yellow';

/*
  TODO Include keys for departments
*/

var displaySelector = function(titles) {
  // Push each title to the list
  titles.forEach(function(title, index) {
    if (title.length != 0)
      list.option(title);
  });

  list.on('select', function(choices) {
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    reader.question('\nEnter the number of records to parse: ', (count, err) => {
      if (err)
        console.log(err);
      constructJSON(columnData.length, choices);
      reader.close();
    });
  });

  list.on('cancel', function(choices) {
    console.log("Cancelled!");
  });

  list.list();
}

fs.readFile('data/data.csv', 'utf8', function (err, data) {
  if(err) spinner.fail('Failed to parse data');
  spinner.succeed('Data read successfully');
  columnData = d3.csvParseRows(data);

  var titles = [];

  // Display the column titles
  for (var i = 0; i < columnData[0].length; i++)
    titles.push(columnData[0][i]);

  displaySelector(titles);
});

function constructJSON(count, choices) {
  var listOfCourses = [];
  var listOfKeywords = [];

  for (var i = 0; i < count; i++) {
    if (columnData[i][1].includes(',')) {
      // Make sure
      columnData[i][1].replace(',', ';');
    }
    listOfCourses.push(columnData[i][0]);
    listOfKeywords.push(columnData[i][1]);
  }

  var keywords = {};
  // Omit the titles of the columns. Iterate from index 1.
  for (var i = 1; i < count; i++) {
    var course = listOfCourses[i].toLowerCase();
    var arrayOfKeywords = listOfKeywords[i].split('; ');

    if (course.length == 0)
      course = 'Error';

    arrayOfKeywords.forEach(function(keyword, index) {
      // Ditch invalid characters - Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
      if (keyword.length == 0 || keyword.length > 100)
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
        var keywordObject = JSON.stringify(keywords[keyword]);
        keywordObject = keywordObject.substring(1, keywordObject.length - 1);

        if (keywords[keyword][course] != undefined) {
          // The course has already been encountered for this keyword. So get the count, and increment it.
          var count = keywords[keyword][course] + 1;
          keywords[keyword] = JSON.parse('{ ' + keywordObject + ', "' + course + '": ' + count + ' }');
        } else {
          // First encounter for a particular course
          keywords[keyword] = JSON.parse('{ ' + keywordObject + ', "' + course + '": ' + 1 + ' }');
        }
      } else {
        // Encountering the keyword for the first time
        keywords[keyword] = JSON.parse('{ "' + course + '": ' + 1 + '}');
      }

      keywords[keyword].total = 0;
      keywords[keyword].total = d3.sum(d3.values(keywords[keyword]));
    });
  }

  utils.push('/keywords', keywords);
}
