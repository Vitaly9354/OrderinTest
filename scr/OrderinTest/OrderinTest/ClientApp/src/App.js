import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { SearchResults } from './components/SearchResults/SearchResults';
import { About } from './components/About/About';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={SearchResults} />
        <Route path='/about' component={About} />
      </Layout>
    );
  }
}
