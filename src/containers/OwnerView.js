import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Fab, TextField, IconButton, Select, MenuItem, OutlinedInput, FormControl, FormLabel, FormControlLabel, Checkbox, Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CharacterSummary from '../components/CharacterSummary';
import DungeonService from '../services/dungeonService';
import {
  BottomAnchor, TopAnchor, HeaderBar, ActionBar, Card, Spacer, BasicBox,
} from '../components/CustomStyled';
import { skillsArray } from '../services/helper';

function OwnerView({ owner }) {
  const [characters, updateCharacters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [values, setValues] = useState({});
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

  function handleValueChange(field, numeric) {
    return e => setValues({ ...values, [field]: numeric ? +e.target.value : e.target.value });
  }

  function raceSelect(e) {
    const race = races.find(r => r.name === e.target.value);
    setValues({ ...values, race: race.name, speed: race.speed });
  }

  function toggleSKill(e) {
    const arr = values.proSkills || [];
    const i = arr.findIndex(skill => skill === e.target.value);
    if (i === -1) setValues({ ...values, proSkills: [...arr, e.target.value] });
    else setValues({ ...values, proSkills: [...arr.slice(0, i), ...arr.slice(i + 1)] });
  }

  async function addCharacter() {
    const data = { ...values, owner };
    await DungeonService.saveCharacter(data);
    setValues({});
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
  characters.forEach((character) => {
    characterCards.push(
      <CharacterSummary
        key={character.id}
        character={character}
        highlight={party.indexOf(character.id) !== -1}
        add={() => toggleCharacter(character.id)}
        linkTo={`/character?id=${character.id}`}
      />,
    );
  });

  return (
    <Container>
      <TopAnchor>
        <Fab size="small" color="secondary" onClick={() => setAdding(!isAdding)}>
          <i className="material-icons">{ !isAdding ? 'add' : 'close' }</i>
        </Fab>
      </TopAnchor>
      { characterCards }
      { isAdding
        && <Card>
          <HeaderBar>
            <h4>New Character</h4>
            <Spacer />
            <ActionBar>
              <IconButton onClick={addCharacter}>
                <i className="material-icons">done</i>
              </IconButton>
            </ActionBar>
          </HeaderBar>
          <InfoRow>
            <TextField variant="outlined" label="Name" onChange={handleValueChange('name')} />
            <BasicBox>
              <TextField variant="outlined" label="HP" type="number" onChange={handleValueChange('maxHP', true)} />
            </BasicBox>
          </InfoRow>
          <InfoRow>
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <FormLabel htmlFor="race">Race</FormLabel>
              <Select
                value={values.race || ''}
                onChange={raceSelect}
                input={<OutlinedInput id="race" />}
              >
                {
                  races.map(val => <MenuItem key={val.name} value={val.name}>{ val.name }</MenuItem>)
                }
              </Select>
            </FormControl>
            <Spacer />
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <FormLabel htmlFor="class">Class</FormLabel>
              <Select
                value={values.class || ''}
                onChange={handleValueChange('class')}
                input={<OutlinedInput id="class" />}
              >
                {
                  classes.map(val => <MenuItem key={val.name} value={val.name}>{ val.name }</MenuItem>)
                }
              </Select>
            </FormControl>
          </InfoRow>
          <Divider />
          <HeaderBar>
            <p><strong>Proficient Skills</strong></p>
          </HeaderBar>
          <SkillSelect>
            { skillsArray.map(({ label }) => (
              <FormControlLabel
                key={label}
                control={
                  <Checkbox
                    checked={(values.proSkills && values.proSkills.indexOf(label) !== -1) || false}
                    value={label}
                    onChange={toggleSKill}
                    color="primary"
                  />
                }
                label={label}
              />
            )) }
          </SkillSelect>
           </Card>
      }
      { !!party.length
        && <BottomAnchor>
          <Link to={`/character?id=${party.join()}`} style={{ zIndex: 10 }}>
            <Fab color="secondary">
              <i className="material-icons">group</i>
            </Fab>
          </Link>
           </BottomAnchor>
      }
    </Container>
  );
}

export default OwnerView;

OwnerView.propTypes = {
  owner: PropTypes.string.isRequired,
};

const Container = styled.div`
        position: relative;
        width: 100vw;
        display: grid;
        grid-template-columns: repeat(auto-fill, 22em);
        grid-gap: .625em;
        justify-content: center;
    `;

const InfoRow = styled.div`
  display: flex;
  margin-top: .62em;
`;

const SkillSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 10px;
  margin: 10px 0px;
  justify-content: center;
`;
