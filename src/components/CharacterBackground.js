import React, { Component } from 'react';

import DungeonService from '../services/dungeonService';

import './CharacterBackground.css';

export default class CharacterBackground extends Component {
  constructor() {
    super();
    // Hard Coded for quick development
    const characterId = '6oHp62hgG0zeFPjwa8RB';
    this.state = { characterId };
  }

  componentWillMount() {
    this.getCharacterInfo(this.state.characterId);
  }

    getCharacterInfo = async (characterId) => {
      const characterInfo = await DungeonService.getCharacter(characterId);
      console.log(JSON.parse(characterInfo));
      // TODO: need to figure out way to do the parsing on the service layer
      this.setState({ characterInfo: JSON.parse(characterInfo) });
    }

    render() {
      return (
            <div className="container">
                {this.state.characterInfo && <div className="name">{this.state.characterInfo.name}</div>}
                {this.state.characterInfo && <div className="name">{`${this.state.characterInfo.name} test`}</div>}
            </div>
      );
    }
}
