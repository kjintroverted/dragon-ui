import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  IconButton,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Divider,
  FormControlLabel,
  Checkbox,
  TextField,
  OutlinedInput,
} from '@material-ui/core';
import {
  Card, Spacer, HeaderBar, ActionBar, BasicBox,
} from './CustomStyled';
import { skillsArray } from '../services/helper';

const CharacterForm = ({ races, classes, save }) => {
  const [values, setValues] = useState({});

  function handleValueChange(field, numeric) {
    return e =>
      setValues({
        ...values,
        [field]: numeric ? +e.target.value : e.target.value,
      });
  }

  function raceSelect(e) {
    const race = races.find(r => r.name === e.target.value);
    setValues({ ...values, race: race.name, speed: race.speed });
  }

  function toggleSKill(e) {
    const arr = values.proSkills || [];
    const i = arr.findIndex(skill => skill === e.target.value);
    if (i === -1) setValues({ ...values, proSkills: [...arr, e.target.value] });
    else {
      setValues({
        ...values,
        proSkills: [...arr.slice(0, i), ...arr.slice(i + 1)],
      });
    }
  }

  async function addCharacter() {
    setValues({});
    save(values);
  }

  return (
    <Card>
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
        <TextField
          variant="outlined"
          label="Name"
          onChange={handleValueChange('name')}
        />
        <BasicBox>
          <TextField
            variant="outlined"
            label="HP"
            type="number"
            onChange={handleValueChange('maxHP', true)}
          />
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
            {races.map(val => (
              <MenuItem key={val.name} value={val.name}>
                {val.name}
              </MenuItem>
            ))}
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
            {classes.map(val => (
              <MenuItem key={val.name} value={val.name}>
                {val.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </InfoRow>
      <Divider />
      <HeaderBar>
        <p>
          <strong>Proficient Skills</strong>
        </p>
      </HeaderBar>
      <SkillSelect>
        {skillsArray.map(({ label }) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox
                checked={
                  (values.proSkills
                    && values.proSkills.indexOf(label) !== -1)
                  || false
                }
                value={label}
                onChange={toggleSKill}
                color="primary"
              />
            }
            label={label}
          />
        ))}
      </SkillSelect>
    </Card>
  );
};

export default CharacterForm;

CharacterForm.propTypes = {
  save: PropTypes.func.isRequired,
  races: PropTypes.array.isRequired,
  classes: PropTypes.array.isRequired,
};

const InfoRow = styled.div`
  display: flex;
  margin-top: 0.62em;
`;

const SkillSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 10px;
  margin: 10px 0px;
  justify-content: center;
`;
