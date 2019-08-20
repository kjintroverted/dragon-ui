import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Divider, TextField, FormControlLabel, Checkbox,
} from '@material-ui/core';
import {
  Row, Spacer, Card, HeaderBar, ActionBar,
} from './CustomStyled';
import { calculateModifier, skillsArray } from '../services/helper';

const Skills = ({ character, editing, update }) => {
  const [skillDisplay, setDisplay] = useState(skillsArray);
  const [query, setQuery] = useState('');

  function proCheck(proSkills, skill) {
    return !proSkills ? false : proSkills.findIndex(s => s === skill) !== -1;
  }

  function toggleSKill(e) {
    const arr = character.proSkills || [];
    const i = arr.findIndex(skill => skill === e.target.value);
    if (i === -1) update({ ...character, proSkills: [...arr, e.target.value] });
    else update({ ...character, proSkills: [...arr.slice(0, i), ...arr.slice(i + 1)] });
  }

  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const list = !query ? skillsArray
      : skillsArray.filter(({ label }) => label.toLowerCase().indexOf(lowerQuery) === 0);
    setDisplay(list);
  });

  return (
    <Card>
      <HeaderBar>
        <h2>Skills</h2>
        <Spacer />
        <ActionBar style={{ marginBottom: '0.3125em' }}>
          <TextField label="Search" value={query} onChange={e => setQuery(e.target.value)} />
        </ActionBar>
      </HeaderBar>
      { !editing
        ? skillDisplay.map(skill => (
          <div key={skill.label}>
            <Row>
              <p style={{ margin: '0.3125em' }}>{ skill.label }</p>
              <Spacer />
              <h4 style={{ margin: '0.3125em' }}>
                { calculateModifier(
                  character[skill.check],
                  proCheck(character.proSkills, skill.label) ? character.proBonus : 0,
                ) }
              </h4>
            </Row>
            <Divider />
          </div>
        ))
        : skillDisplay.map(({ label }) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox
                checked={(character.proSkills && character.proSkills.indexOf(label) !== -1) || false}
                value={label}
                onChange={toggleSKill}
                color="primary"
              />
            }
            label={label}
          />
        ))
      }
    </Card>
  );
};

export default Skills;

Skills.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
  editing: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired,
};
