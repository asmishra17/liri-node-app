// global variables
var fs = require("fs");
var keys = require("./keys.js");

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

var client = new Twitter({
    consumer_key: "BU4NhW1l64Gva5RSXKZI2ZuPj",
    consumer_secret: "wOd6C4d8ixDhS03KtbcSTqTbsyA4Aq8hCLAovAjmq4hKNNcPli",
    access_token_key: "1517100054-Ja2G0XsFYFo58GQ03VFSQncrHi6qr5ns5G4aKIM",
    access_token_secret: "x6X4C41vLuq1TO52GhnIIvdkH9tyj8AVtHUv8txF8j1Re"
});

// "my-tweets" function
var params = {screen_name: 'asmishra93'};

function twitterFunction () {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("*-*-*-Your Tweets-*-*-*");

            console.log(`Tweet Created On: ${tweets[0].created_at}`);
            console.log(`Tweet: ${tweets[0].text}`)

            console.log(`Tweet Created On: ${tweets[1].created_at}`);
            console.log(`Tweet: ${tweets[1].text}`)

            console.log(`Tweet Created On: ${tweets[2].created_at}`);
            console.log(`Tweet: ${tweets[2].text}`)

            console.log(`Tweet Created On: ${tweets[3].created_at}`);
            console.log(`Tweet: ${tweets[3].text}`)

            console.log(`Tweet Created On: ${tweets[4].created_at}`);
            console.log(`Tweet: ${tweets[4].text}`)

            console.log(`Tweet Created On: ${tweets[5].created_at}`);
            console.log(`Tweet: ${tweets[5].text}`)

            console.log(`Tweet Created On: ${tweets[6].created_at}`);
            console.log(`Tweet: ${tweets[6].text}`)

            console.log(`Tweet Created On: ${tweets[7].created_at}`);
            console.log(`Tweet: ${tweets[7].text}`)

            console.log(`Tweet Created On: ${tweets[8].created_at}`);
            console.log(`Tweet: ${tweets[8].text}`)

            console.log(`Tweet Created On: ${tweets[9].created_at}`);
            console.log(`Tweet: ${tweets[9].text}`)

            console.log(`Tweet Created On: ${tweets[10].created_at}`);
            console.log(`Tweet: ${tweets[10].text}`)
        } 
    });
}

if (userRequest === "my-tweets") {
    twitterFunction();
};

// Spotify API call

var spotify = new Spotify({
    id: "3f878e381e46479783adb4b883910545",
    secret: "f7ae58fbe4344712a3ce94110feea449"
});

songName = "Beat It"
if (userRequest === "spotify-this-song" && songName) {
    spotify.search({type: "track", query: songName}, function (error, data){
        if (error) {
            throw (error);
        } else { 
            console.log(data);
        }
    });
}

