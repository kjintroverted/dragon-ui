import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { Badge, TextField } from '@material-ui/core';
import { Card } from './CustomStyled';
import { calculateModifier } from '../services/helper';


function Attributes({ character }) {
  return (
    <Card>
      <StatGrid>
        <Badge badgeContent={calculateModifier(character.str)} color="secondary">
          <TextField variant="outlined" disabled type="number" label="Strength" value={character.str} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.dex)} color="secondary">
          <TextField variant="outlined" disabled type="number" label="Dexterity" value={character.dex} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.con)} color="secondary">
          <TextField variant="outlined" disabled type="number" label="Constitution" value={character.con} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.intel)} color="secondary">
          <TextField variant="outlined" disabled type="number" label="Intelligence" value={character.intel} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.wis)} color="secondary">
          <TextField variant="outlined" disabled type="number" label="Wisdom" value={character.wis} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.cha)} color="secondary">
          <TextField variant="outlined" disabled type="number" label="Charisma" value={character.cha} />
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
};

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
`;
