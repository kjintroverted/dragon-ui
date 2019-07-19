import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { Badge, TextField } from '@material-ui/core';
import { Card, HeaderBar } from './CustomStyled';
import { calculateModifier } from '../services/helper';


function Attributes({ character, update }) {
  function onChange(field) {
    return (e) => {
      const val = +e.target.value;
      update({ ...character, [field]: val });
    };
  }

  return (
    <Card>
      <HeaderBar>
        <h2>Stats</h2>
      </HeaderBar>
      <StatGrid>
        <Badge badgeContent={calculateModifier(character.str)} color="secondary">
          <TextField variant="outlined" type="number" label="Strength" value={character.str} onChange={onChange('str')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.dex)} color="secondary">
          <TextField variant="outlined" type="number" label="Dexterity" value={character.dex} onChange={onChange('dex')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.con)} color="secondary">
          <TextField variant="outlined" type="number" label="Constitution" value={character.con} onChange={onChange('con')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.intel)} color="secondary">
          <TextField variant="outlined" type="number" label="Intelligence" value={character.intel} onChange={onChange('intel')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.wis)} color="secondary">
          <TextField variant="outlined" type="number" label="Wisdom" value={character.wis} onChange={onChange('wis')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.cha)} color="secondary">
          <TextField variant="outlined" type="number" label="Charisma" value={character.cha} onChange={onChange('cha')} />
        </Badge>
      </StatGrid>
    </Card>
  );
}

export default Attributes;

Attributes.propTypes = {
  character: PropTypes.shape({
    dex: PropTypes.number,
    intel: PropTypes.number,
    str: PropTypes.number,
  }).isRequired,
  update: PropTypes.func.isRequired,
};

const StatGrid = styled.div`
  margin-top: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: .625em;
`;
