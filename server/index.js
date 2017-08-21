require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Feeds = require('pusher-feeds-server');
const Twitter = require('twitter');

const app = express();

const feeds = new Feeds({
  instanceId: process.env.PUSHER_INSTANCE_ID,
  key: process.env.PUSHER_KEY,
});

const twitterClient = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let stats = { beer: 0, cider: 0, wine: 0 };

setInterval(() => {
  stats.date = new Date();
  
  feeds
    .publish('drinks', stats)
    .then(() => {
      console.log('Succesfully published:', stats);
      stats = { beer: 0, cider: 0, wine: 0 };
    })
    .catch((err) => console.log(err))
}, 5000);

twitterClient.stream('statuses/filter', {track: '#cider, #beer, #wine'},  (stream) => {
  stream.on('data', (tweet) => {
    const hashtags = tweet.entities.hashtags;

    hashtags.forEach(hashtag => {
      const name = hashtag.text.toLowerCase();
      if (typeof stats[name] !== 'number') {
        return;
      }

      stats[name]++;
    });
  });

  stream.on('error', console.log);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Locally listening on port ${PORT}`);
});
