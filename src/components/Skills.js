import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider, TextField } from '@material-ui/core';
import {
  Row, Spacer, Card, HeaderBar, ActionBar,
} from './CustomStyled';
import { calculateModifier, skillsArray } from '../services/helper';

const Skills = ({ character }) => {
  const [skillDisplay, setDisplay] = useState(skillsArray);
  const [query, setQuery] = useState('');

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
        <ActionBar style={{ marginBottom: '5px' }}>
          <TextField label="Search" value={query} onChange={e => setQuery(e.target.value)} />
        </ActionBar>
      </HeaderBar>
      {
        skillDisplay.map(skill => (
          <div key={skill.label}>
            <Row>
              <p style={{ margin: '5px' }}>{ skill.label }</p>
              <Spacer />
              <h4 style={{ margin: '5px' }}>{ calculateModifier(character[skill.check]) }</h4>
            </Row>
            <Divider />
          </div>
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
};
