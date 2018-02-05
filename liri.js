// global variables
var env = require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");

var request = require("request");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

// store all of the arguments in an array
var nodeArgs = process.argv;
var userRequest = process.argv[2];

// create an empty variable for holding the movie/song name
var movieName = "";
var songName = "";

// "movie-this '<movie name here>'" function

function consoleMovies (body) {

    console.log(`Title: ${JSON.parse(body).Title}`);
    console.log(`Year: ${JSON.parse(body).Year}`);
    console.log(`IMDB Rating: ${JSON.parse(body).imdbRating}`);
    console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`); 
    console.log(`Country of Production: ${JSON.parse(body).Country}`);
    console.log(`Language: ${JSON.parse(body).Language}`);
    console.log(`Plot: ${JSON.parse(body).Plot}`);
    console.log(`Actors: ${JSON.parse(body).Actors}`);

}

// loop through all words in the node argument 
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    } else {
        movieName += nodeArgs[i];
    }
}

// IMDB API call 

var queryURL = `http://www.omdbapi.com/?t="${movieName}"&y=&plot=short&apikey=trilogy`

if (userRequest === "movie-this" && movieName) {

    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            consoleMovies(body);
        }
    });

} else if (userRequest === "movie-this" && "undefined") { 

    queryURL = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";

    request(queryURL, function (error, response, body){

        if (!error && response.statusCode === 200) {
           consoleMovies(body);
        }
    });
}

/// Twitter API call
var client = new Twitter(keys.twitter);

// "my-tweets" function
var params = {screen_name: 'asmishra93'};

function twitterFunction () {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("*-*-*-Your Tweets-*-*-*");

            for (var i = 0; i < 20; i++) {
            console.log(`Tweet Created On: ${tweets[i].created_at}`);
            console.log(`Tweet: ${tweets[i].text}`)
            }
        } 
    });
}

if (userRequest === "my-tweets") {
    twitterFunction();
};

// Spotify API call
var spotify = new Spotify(keys.spotify);

// loop through all words in the node argument 

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        songName = songName + " " + nodeArgs[i];
    } else {
        songName += nodeArgs[i];
    }
}

function consoleSongs (data) {
    console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
    console.log(`Song Title: ${data.tracks.items[0].name}`);
    console.log(`Link to Song: ${data.tracks.items[0].href}`);
    console.log(`Album: ${data.tracks.items[0].album.name}`);
}

// "spotify-this-song '<song name here>'" function

if (userRequest === "spotify-this-song" && songName) {
    spotify.search({type: "track", query: songName}, function (error, data){
        if (error) {
            throw (error);
        } else { 
            consoleSongs(data);
        }
    });
} else if (userRequest === "spotify-this-song" && "undefined") {
    songName = "The Sign";
    spotify.search({type: "track", query: songName}, function (error, data){
        if (error) {
            throw (error);
        } else { 
            console.log(`Artist: ${data.tracks.items[5].artists[0].name}`);
            console.log(`Song Title: ${data.tracks.items[5].name}`);
            console.log(`Link to Song: ${data.tracks.items[5].href}`);
            console.log(`Album: ${data.tracks.items[5].album.name}`);  
        }
    }); 
}

// "do-what-it-says" function
if (userRequest === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data){

        var spotify = new Spotify(keys.spotify);
        var dataArr = data.split(",");

        songName = dataArr[1];

        function test () {
            spotify.search({type: "track", query: songName}, function (error, data) {
                if (error) {
                    throw (error);
                } else { 
                    consoleSongs(data);
                }
            });
        }
        test();
    });
}





