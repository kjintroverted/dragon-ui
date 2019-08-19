import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { Badge, TextField } from '@material-ui/core';
import { Card, HeaderBar } from './CustomStyled';
import { calculateModifier } from '../services/helper';


function Attributes({
  character, saves, update, disabled,
}) {
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
          <TextField variant="outlined" disabled={disabled} type="number" label="Strength" value={character.str} onChange={onChange('str')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.dex)} color="secondary">
          <TextField variant="outlined" disabled={disabled} type="number" label="Dexterity" value={character.dex} onChange={onChange('dex')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.con)} color="secondary">
          <TextField variant="outlined" disabled={disabled} type="number" label="Constitution" value={character.con} onChange={onChange('con')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.int)} color="secondary">
          <TextField variant="outlined" disabled={disabled} type="number" label="Intelligence" value={character.int} onChange={onChange('int')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.wis)} color="secondary">
          <TextField variant="outlined" disabled={disabled} type="number" label="Wisdom" value={character.wis} onChange={onChange('wis')} />
        </Badge>
        <Badge badgeContent={calculateModifier(character.cha)} color="secondary">
          <TextField variant="outlined" disabled={disabled} type="number" label="Charisma" value={character.cha} onChange={onChange('cha')} />
        </Badge>
      </StatGrid>
      <p className="min-margin"><strong>Saving Throws:</strong> { `+${character.proBonus}` } { saves } </p>
    </Card>
  );
}

export default Attributes;

Attributes.propTypes = {
  character: PropTypes.shape({
    dex: PropTypes.number,
    int: PropTypes.number,
    str: PropTypes.number,
  }).isRequired,
  saves: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: .625em;
`;
