require("dotenv").config();

var keys = require('./keys.js');

var request = require("request");
var fs = require("fs");

var searchType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

var Spotify = require("node-spotify-api");
var Twitter = require('twitter');

function findMovie(title) {
    var URL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    request(URL, function(err, response, body) {
        var data = JSON.parse(body);
        var logData = `Title: ${data.Title}\nYear: ${data.Year}\nIMDB Rating: ${data.imdbRating}\nRotten Tomatoes Rating: ${data.ratings}\nCountry: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}\n-----------`;
        console.log(logData);
    })
}

function findSong(song) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: "track", query: song, limit: 1}, function(err, data) {
        if (err) {
        return console.log("Error: " + err);
        }
        var info = data.tracks.items[0];
        var logData = `Artist(s): ${info.artists[0].name}\nSong Title: ${info.name}\nPreview Spotify Link: ${info.preview_url}\nAlbum: ${info.album.name}\n------------`;
        console.log(logData);
    });
}

function getTweets() {
    var client = new Twitter(keys.twitter);
    var params = {screen_name: "susehan27", limit: 20};
    client.get("statuses/user_timeline", params, function(err, tweets, response) {
        if (err) {
        return console.log("Error: " + err);
        }
        for (var i=0; i < tweets.length; i ++) {
            var tweets = `Tweet #(${i+1})\nTweet: ${tweets[i].text}\n`
            console.log(tweets);
        }
        
      });
}

if (searchType === "movie-this") {
    console.log("Searching for movie...");
    findMovie(searchTerm);
}
else if (searchType === "spotify-this-song") {
    console.log("Searching for song...");
    findSong(searchTerm);

}
else if (searchType === "my-tweets") {
    console.log("Retrieving latest 20 tweets...");
    getTweets();
}
else {
    console.log("error");
}