import React, { Component } from 'react';
import styled from 'styled-components';

import DungeonService from '../services/dungeonService';

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
    this.setState({ characterInfo });
  }

  render() {
    return (
      <Container>
        { this.state.characterInfo && <div className="name">{ this.state.characterInfo.name }</div> }
        { this.state.characterInfo && <div className="name">{ `${this.state.characterInfo.name} test` }</div> }
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  & .name {
    padding: 1em;
  }
`;
