import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Fab, Divider, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CharacterSummary from '../components/CharacterSummary';
import DungeonService from '../services/dungeonService';
import {
  BottomAnchor,
  Column,
  Row,
  Card,
  ProgressContainer,
} from '../components/CustomStyled';

function OwnerView({ owner }) {
  const [characters, updateCharacters] = useState([]);
  const [party, updateParty] = useState([]);
  const [loading, setLoading] = useState(true);

  function toggleCharacter(id) {
    const i = party.indexOf(id);
    if (i !== -1) updateParty([...party.slice(0, i), ...party.slice(i + 1)]);
    else updateParty([...party, id]);
  }

  useEffect(() => {
    (async function getCharacters() {
      const characterList = await DungeonService.getCharactersByOwner(owner);
      updateCharacters(characterList || []);
      setLoading(false);
    }());
  }, [owner]);

  const ownCharacters = characters
    .filter(character => character.owner === owner)
    .map(character => (
      <CharacterSummary
        key={ character.id }
        character={ character }
        highlight={ party.indexOf(character.id) !== -1 }
        add={ () => toggleCharacter(character.id) }
        linkTo={ `/character?id=${ character.id }` }
      />
    ));

  const otherCharacters = characters
    .filter(character => character.owner !== owner)
    .map(character => (
      <CharacterSummary
        key={ character.id }
        character={ character }
        highlight={ party.indexOf(character.id) !== -1 }
        add={ () => toggleCharacter(character.id) }
        linkTo={ `/character?id=${ character.id }` }
      />
    ));

  const ownerParties = []

  if (loading) {
    return (
      <ProgressContainer>
        <CircularProgress style={ { justifySelf: 'center' } } />
      </ProgressContainer>
    );
  }

  return (
    <Column>
      { !!ownerParties.length
        && <Card>
          <Row>
            <h3>Parties: </h3>
            { ownerParties }
          </Row>
        </Card>
      }
      <Grid>
        { ownCharacters }
      </Grid>
      { !!otherCharacters.length && (
        <>
          <Divider />
          <Grid>{ otherCharacters }</Grid>
        </>
      ) }
      { !!party.length && (
        <BottomAnchor>
          <Link onClick={ () => { localStorage.removeItem('selected'); } } to={ `/character?id=${ party.join() }` } style={ { zIndex: 10 } }>
            <Fab color="secondary">
              <i className="material-icons">group</i>
            </Fab>
          </Link>
        </BottomAnchor>
      ) }
    </Column>
  );
}

export default OwnerView;

OwnerView.propTypes = {
  owner: PropTypes.string.isRequired,
};

const Grid = styled.div`
  position: relative;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, 22em);
  grid-gap: 0.625em;
  justify-content: center;
`;
