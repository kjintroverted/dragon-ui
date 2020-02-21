import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Fab, Divider, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CharacterSummary from '../components/CharacterSummary';
import CharacterForm from '../components/CharacterForm';
import DungeonService from '../services/dungeonService';
import {
  BottomAnchor,
  TopAnchor,
  Column,
  Row,
  Card,
  ProgressContainer,
} from '../components/CustomStyled';
import PartyChip from '../components/PartyChip';

function OwnerView({ owner }) {
  const [characters, updateCharacters] = useState([]);
  const [parties, updateParties] = useState([]);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [party, updateParty] = useState([]);
  const [isAdding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getCharactersByOwner() {
    const characterList = await DungeonService.getCharactersByOwner(owner);
    console.log(characterList);
    updateCharacters(characterList || []);
  }

  function toggleCharacter(id) {
    const i = party.indexOf(id);
    if (i !== -1) updateParty([...party.slice(0, i), ...party.slice(i + 1)]);
    else updateParty([...party, id]);
  }

  async function loadBackgroundOptions() {
    const raceList = await DungeonService.getRaces();
    setRaces(raceList);
    const classList = await DungeonService.getClasses();
    setClasses(classList);
  }

  async function addCharacter(data) {
    await DungeonService.saveCharacter({ ...data, owner });
    setAdding(false);
    getCharactersByOwner();
  }

  useEffect(() => {
    (async function getCharacters() {
      const characterList = await DungeonService.getCharactersByOwner(owner);
      updateCharacters(characterList || []);
      setLoading(false);
    }());
    const storedParties = JSON.parse(localStorage.getItem('parties'));
    if (storedParties) {
      updateParties(storedParties);
    }
  }, [owner]);

  useEffect(() => {
    if (!isAdding || races.length || classes.length) return;
    loadBackgroundOptions();
  }, [isAdding, classes.length, races.length]);

  const ownCharacters = characters
    .filter(character => character.owner === owner)
    .map(character => (
      <CharacterSummary
        key={character.info.id}
        character={character}
        highlight={party.indexOf(character.info.id) !== -1}
        add={() => toggleCharacter(character.info.id)}
        linkTo={`/character?id=${character.info.id}`}
      />
    ));

  const otherCharacters = characters
    .filter(character => character.owner !== owner)
    .map(character => (
      <CharacterSummary
        key={character.info.id}
        character={character}
        highlight={party.indexOf(character.info.id) !== -1}
        add={() => toggleCharacter(character.info.id)}
        linkTo={`/character?id=${character.info.id}`}
      />
    ));

  const ownerParties = parties.map(savedParty => (
        <PartyChip key={savedParty.name} name={savedParty.name} members={savedParty.members} />
  ));

  if (loading) {
    return (
      <ProgressContainer>
        <CircularProgress style={{ justifySelf: 'center' }} />
      </ProgressContainer>
    );
  }
  console.log(characters);
  return (
    <Column>
      <TopAnchor>
        <Fab
          size="small"
          color="secondary"
          onClick={() => setAdding(!isAdding)}
        >
          <i className="material-icons">{ !isAdding ? 'add' : 'close' }</i>
        </Fab>
      </TopAnchor>
      {!!ownerParties.length
      && <Card>
          <Row>
            <h3>Parties: </h3>
            {ownerParties}
          </Row>
         </Card>
      }
      <Grid>
        { ownCharacters }
        { isAdding && (
          <CharacterForm races={races} classes={classes} save={addCharacter} />
        ) }
      </Grid>
      { !!otherCharacters.length && (
        <>
          <Divider />
          <Grid>{ otherCharacters }</Grid>
        </>
      ) }
      { !!party.length && (
        <BottomAnchor>
          <Link onClick={() => { localStorage.removeItem('selected'); }} to={`/character?id=${party.join()}`} style={{ zIndex: 10 }}>
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
