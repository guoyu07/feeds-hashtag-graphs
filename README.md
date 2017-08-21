# Pusher Feeds Hashtag Graphs

This is a source code of [Pusher Feeds Hashtag Graphs demo app](https://feeds-hashtag-graphs.herokuapp.com/)

### Usage

Please copy `.env-example` file and rename to `.env`.

#### Feeds instance setup and Twitter instance setup

Please get your `instanceId` and `key` from [Dashboard](https://dash.pusher.com/) first.

Then you can define them:

- For client app can define your `instanceId` in `src/app.js`.
- For server app you can create `.env` file and add following: (or just pass them as process variables)
    - `PUSHER_INSTANCE_ID`=your_instance_id
    - `PUSHER_KEY`=your_key

Please get your Twitter keys [here](https://apps.twitter.com/)

Define in `.env` file:
 - `CONSUMER_KEY`=your_consumer_key
 - `CONSUMER_SECRET`=your_consumer_secret
 - `ACCESS_TOKEN_KEY`=your_access_token_key
 - `ACCESS_TOKEN_SECRET`=your_access_token_secret

#### Yarn
```sh
yarn install
yarn start-dev
```

#### NPM
```sh
npm install
npm run start-dev
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
