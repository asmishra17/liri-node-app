// global variables
var fs = require("fs");
var keys = require("./keys.js");
var userCommand = process.argv[2];
var userInput = process.argv[3];

var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
// var computerSearch = [];
// ^^^ not sure what this is

// "movie-this '<movie name here>'" function
function consoleMovies (body) {

    // title, year movie came out, IMDB rating, RT rating, country of production, language, plot, actors

    console.log(`Title: ${JSON.parse(body).Title}`);
    console.log(`Year: ${JSON.parse(body).Year}`);
    console.log(`IMDB Rating: ${JSON.parse(body).imdbRating}`);
    console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`); 
    console.log(`Country of Production: ${JSON.parse(body).Country}`);
    console.log(`Language: ${JSON.parse(body).Language}`);
    console.log(`Plot: ${JSON.parse(body).Plot}`);
    console.log(`Actors: ${JSON.parse(body).Actors}`);

}

// "spotify-this-song"


// IMDB API call 

// consider using a switch
if (userCommand === "movie-this" && userInput) {

    var queryURL = `http://www.omdbapi.com/?t="${userInput}"&y=&plot=short&apikey=trilogy`

    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            consoleMovies(body);
        }

    });

} else if (userCommand === "movie-this" && "undefined") { 

    userInput = "Mr. Nobody";

    queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function (error, response, body){

        if (!error && response.statusCode === 200) {
           consoleMovies(body);
        }
    });

}