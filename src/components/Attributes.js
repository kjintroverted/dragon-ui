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

  function getSaveBonus(field) {
    return saves.toLowerCase().indexOf(field) === -1 ? 0 : character.proBonus;
  }

  return (
    <Card>
      <HeaderBar>
        <h2>Stats</h2>
      </HeaderBar>
      <StatGrid>
        <Badge badgeContent={!disabled ? calculateModifier(character.str) : character.str} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Strength"
            value={!disabled ? character.str : calculateModifier(character.str)}
            onChange={onChange('str')}
            helperText={`Save: ${calculateModifier(character.str, getSaveBonus('str'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(character.dex) : character.dex} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Dexterity"
            value={!disabled ? character.dex : calculateModifier(character.dex)}
            onChange={onChange('dex')}
            helperText={`Save: ${calculateModifier(character.dex, getSaveBonus('dex'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(character.con) : character.con} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Constitution"
            value={!disabled ? character.con : calculateModifier(character.con)}
            onChange={onChange('con')}
            helperText={`Save: ${calculateModifier(character.con, getSaveBonus('con'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(character.int) : character.int} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Intelligence"
            value={!disabled ? character.int : calculateModifier(character.int)}
            onChange={onChange('int')}
            helperText={`Save: ${calculateModifier(character.int, getSaveBonus('int'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(character.wis) : character.wis} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Wisdom"
            value={!disabled ? character.wis : calculateModifier(character.wis)}
            onChange={onChange('wis')}
            helperText={`Save: ${calculateModifier(character.wis, getSaveBonus('wis'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(character.cha) : character.cha} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Charisma"
            value={!disabled ? character.cha : calculateModifier(character.cha)}
            onChange={onChange('cha')}
            helperText={`Save: ${calculateModifier(character.cha, getSaveBonus('cha'))}`}
          />
        </Badge>
      </StatGrid>
          <p><i>Passive Perception: {10 + parseInt(calculateModifier(character.wis))}</i></p>
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
