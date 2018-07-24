LIRI Node App: Language Interpretation and Recognition Interface

This application is a command-line node app that takes in parameters and gives you back data. 

There are 4 different commands LIRI can take in: 
  1. movie-this
  2. spotify-this-song
  3. my-tweets
  4. do-what-it-says
  
1. node liri.js movie-this '<movie title here>'
  This command line will take in any movie titles and give you back the follwing in your terminal/bash window
    - title of the movie
    - year the movie was made
    - IMDB rating of the movie
    - rotten tomatoes rating of the movie
    - country where the movie was produced
    - language of the movie
    - plot of the movie
    - actors in the movie
  
2. node liri.js spotify-this-song '<song title here>'
  This command line will take in any song title and give you back the following in your terminal/bash window
    - Artist(s)
    - Song's title
    - Preview link of the song from Spotify
    - Album the song is from

3. node liri.js my-tweets
  This command line will show the last 20 tweets and when they were created in your terminal/bash window

4. node liri.js do-what-it-says
  This comman dline will read the text inside the "random.txt" files and use it to call one of LIRI's command lines
