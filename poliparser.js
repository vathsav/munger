const fs = require('fs');

const keywords = fs.readFileSync('data/keywords.txt', 'utf8', function(err, data) {
  if (err) console.log(err);
});

const courses = fs.readFileSync('data/courses.txt', 'utf8', function(err, data) {
  if (err) console.log(err);
});

var listOfCourses = courses.split('\n');
var listOfSetsOfKeywords = keywords.split('\n');

var pandapandapanda = JSON.parse("{}");

/*
  TODO something like this?
    [{
  	"milan": [{
  		"design": {
  			"something": 30,
  			"somethingElse": 40
  		},
  		"engineering": {
  			"something": 30,
  			"somethingElse": 40
  		}
  	}]
  }]

  For now:
  [{
  	"milan": {
  		"something": 30,
  		"somethingElse": 40
  	},
  	"milan1": {
  		"something": 30,
  		"somethingElse": 40
  	},
  	"milan2": {
  		"something": 30,
  		"somethingElse": 40
  	}
  }]
*/

// Parse through every keyword in the list.
for (var i = 41; i < 200; i++) {
  for (var j = 0; j < listOfCourses.length; j++) {
    var course = listOfCourses[j];
    var setOfKeywords = listOfSetsOfKeywords[i].split("; ");

    setOfKeywords.forEach(function(keyword, index) {
      // Check if keyword is already present in the object
      if (pandapandapanda[keyword] != null) {
        // First encounter for a particular course
        var count = keyword[course] == undefined ? 1 : keyword[course] + 1;
        pandapandapanda[keyword] = JSON.parse('{ "' + course + '": ' + count + '}');
        if (count > 1)
          console.log("Repeated: " + count);
      } else {
        pandapandapanda[keyword] = JSON.parse('{ "' + course + '": ' + 1 + '}');
      }
    });
  }
}

// console.log(JSON.stringify(pandapandapanda));

class Keyword {
  constructor(keyword, count) {
    this.keyword = keyword;
    this.count = count;
  }
}
