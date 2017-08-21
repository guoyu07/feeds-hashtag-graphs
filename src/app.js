import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './style.css'

import Header from './header';
import Footer from './footer';

import Feeds from 'pusher-feeds-client';
import RTChart from 'react-rt-chart';

// Api is running on different port in development
const API_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : '';

const feeds = new Feeds({
  instanceId: ''
});

class App extends Component {

  githubEventsFeed = {};

  state = {
    data: {
      date: 0,
      beer: 0,
      wine: 0,
      cider: 0
    }
  };

  componentWillMount () {
    this.githubEventsFeed = feeds.feed('drinks');
    this.githubEventsFeed.subscribe({
      previousItems: 10,
      onItem: item => {
        this.setState({ data: item.data });
      },
      onError: error => {
        this.setState({ error });
      }
    });
  }

  getError () {
    if (!this.state.error) {
      return false;
    }

    return (
      <div className="notification is-danger">
        {this.state.error}
      </div>
    );
  }

  render() {
    let data = {
      date: this.state.data.date,
      Beer: this.state.data.beer,
      Wine: this.state.data.wine,
      Cider: this.state.data.cider
    };

    return (
      <div className="container">
        <Header />
        
        {this.getError()}

        <div>
          <RTChart
            fields={['Beer', 'Wine', 'Cider']}
            maxValues={10}
            data={data} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
