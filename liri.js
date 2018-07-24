require("dotenv").config();

var keys = require('./keys.js');

var request = require("request");
var fs = require("fs");

var searchType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

var Spotify = require("node-spotify-api");
var Twitter = require('twitter');

function findMovie(title) {
    if (!title) {
        title = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/\nIt's on Netflix!");
    }
    var URL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    request(URL, function(err, response, body) {
        if (err) {
            return console.log("Error: " + err);
        }
        var data = JSON.parse(body);
        var logData = `Title: ${data.Title}\nYear: ${data.Year}\nIMDB Rating: ${data.imdbRating}\nRotten Tomatoes Rating: ${data.ratings}\nCountry: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}\n-----------`;
        console.log(logData);
    });
}

function findSong(song) {
    if (!song) {
        song = "The Sign Ace of Base";
    }
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
        for (var i=0; i < 20; i ++) {
            var tweets = `Tweet #(${i+1})\nTweet: ${tweets[i].text}\nCreated: ${tweets[i].created_at}\n---------`
            console.log(tweets);
        }  
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log("Error: " + err);
        }
        var split = data.split(",");
        searchType = split[0];
        searchTerm = split[1];
        runApp();
    })
}

function runApp() {
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
    else if (searchType === "do-what-it-says") {
        console.log("Reading random.txt...");
        doWhatItSays();
    }
    else {
        console.log("error");
    } 
}

runApp();