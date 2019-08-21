import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import CharacterSummary from "../components/CharacterSummary";
import CharacterForm from "../components/CharacterForm";
import DungeonService from "../services/dungeonService";
import { BottomAnchor, TopAnchor } from "../components/CustomStyled";

function OwnerView({ owner }) {
  const [characters, updateCharacters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [party, updateParty] = useState([]);
  const [isAdding, setAdding] = useState(false);

  async function getCharactersByOwner() {
    const characterList = await DungeonService.getCharactersByOwner(owner);
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
    getCharactersByOwner();
  }, [owner]);

  useEffect(() => {
    if (!isAdding || races.length || classes.length) return;
    loadBackgroundOptions();
  }, [isAdding]);

  const characterCards = [];
  characters.forEach(character => {
    characterCards.push(
      <CharacterSummary
        key={character.id}
        character={character}
        highlight={party.indexOf(character.id) !== -1}
        add={() => toggleCharacter(character.id)}
        linkTo={`/character?id=${character.id}`}
      />
    );
  });

  return (
    <Container>
      <TopAnchor>
        <Fab
          size='small'
          color='secondary'
          onClick={() => setAdding(!isAdding)}
        >
          <i className='material-icons'>{!isAdding ? "add" : "close"}</i>
        </Fab>
      </TopAnchor>
      {characterCards}
      {isAdding && (
        <CharacterForm races={races} classes={classes} save={addCharacter} />
      )}
      {!!party.length && (
        <BottomAnchor>
          <Link to={`/character?id=${party.join()}`} style={{ zIndex: 10 }}>
            <Fab color='secondary'>
              <i className='material-icons'>group</i>
            </Fab>
          </Link>
        </BottomAnchor>
      )}
    </Container>
  );
}

export default OwnerView;

OwnerView.propTypes = {
  owner: PropTypes.string.isRequired
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, 22em);
  grid-gap: 0.625em;
  justify-content: center;
`;
