import React, { Component } from 'react';

import DungeonService from '../services/dungeonService';


export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.welcomeBanner();
  }

    welcomeBanner = async () => {
      let welcome;
      try {
        welcome = await DungeonService.getWelcome();
      } catch (error) {
        console.error('Error connecting to the server', error);
      }
      this.setState({ welcome });
    };

    render() {
      return (
            <div>
                { this.state.welcome && <div>{this.state.welcome}</div> }
            </div>
      );
    }
}
