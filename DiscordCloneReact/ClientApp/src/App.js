import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import Chat from './components/Chat';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <div style={{ margin: '0 30%' }}>
            <Chat />
        </div>
    );
  }
}