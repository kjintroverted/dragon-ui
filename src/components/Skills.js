import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';
import { Row, Spacer, Card } from './CustomStyled';
import { calculateModifier } from '../services/helper';

const Skills = ({ character }) => (
  <Card>
    {
      skillsArray.map(skill => (
        <div key={skill.label}>
          <Row>
            <p style={{ margin: '5px 5px' }}>{ skill.label }</p>
            <Spacer />
            <h4 style={{ margin: '5px 5px' }}>{ calculateModifier(character[skill.check]) }</h4>
          </Row>
          <Divider />
        </div>
      ))
    }
  </Card>
);

export default Skills;

Skills.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
};

const skillsArray = [
  {
    label: 'Acrobatics',
    check: 'dex',
  },
  {
    label: 'Animal Handling',
    check: 'wis',
  },
  {
    label: 'Arcana',
    check: 'intel',
  },
  {
    label: 'Athletics',
    check: 'str',
  },
  {
    label: 'Deception',
    check: 'cha',
  },
  {
    label: 'History',
    check: 'intel',
  },
  {
    label: 'Insight',
    check: 'wis',
  },
  {
    label: 'Intimidation',
    check: 'cha',
  },
  {
    label: 'Investigation',
    check: 'intel',
  },
  {
    label: 'Medicine',
    check: 'wis',
  },
  {
    label: 'Nature',
    check: 'intel',
  },
  {
    label: 'Perception',
    check: 'wis',
  },
  {
    label: 'Performance',
    check: 'cha',
  },
  {
    label: 'Persuasion',
    check: 'cha',
  },
  {
    label: 'Religion',
    check: 'intel',
  },
  {
    label: 'Sleight of Hand',
    check: 'dex',
  },
  {
    label: 'Stealth',
    check: 'dex',
  },
  {
    label: 'Survival',
    check: 'wis',
  },
];
