require("dotenv").config();

var keys = require('./keys.js');

var request = require("request");
var fs = require("fs");

// var Spotify = require('spotify-web-api-js');

var searchType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

// var Spotify = function() {
//     this.findSong = function() {
        
//     }
// }

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

// console.log(spotify);
// console.log(client);

var Movie = function() {
    this.findMovie = function(title) {
        var URL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
        request(URL, function(err, response, body) {
            var data = JSON.parse(body);
            console.log(body);
        })
    }
}

var movie = new Movie();

if (search === "movie-this") {
    console.log("Searching for movie...");
    movie.findMovie(searchTerm);
}