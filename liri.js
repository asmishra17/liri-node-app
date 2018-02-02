```js
require("dotenv").config();
```

// global variables
var fs = require("fs");
var keys = require("./keys.js");
var userCommand = process.argv[2];
var userInput = process.argv[3];

var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
// var computerSearch = [];
// ^^^ not sure what this is

// function to console movies