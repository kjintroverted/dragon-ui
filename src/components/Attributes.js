import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { Badge, TextField } from '@material-ui/core';
import { Card, HeaderBar } from './CustomStyled';
import { calculateModifier } from '../services/helper';


function Attributes({
  character, saves, update, disabled,
}) {
  const { stats } = character.info;
  function onChange(field) {
    return (e) => {
      const val = +e.target.value;
      update({ ...character, [field]: val });
    };
  }

  function getSaveBonus(field) {
    return saves.toLowerCase().indexOf(field) === -1 ? 0 : character.level.proBonus;
  }
  return (
    <Card>
      <HeaderBar>
        <h2>Stats</h2>
      </HeaderBar>
      <StatGrid>
        <Badge badgeContent={!disabled ? calculateModifier(stats.str) : stats.str} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Strength"
            value={!disabled ? stats.str : calculateModifier(stats.str)}
            onChange={onChange('str')}
            helperText={`Save: ${calculateModifier(stats.str, getSaveBonus('str'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(stats.dex) : stats.dex} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Dexterity"
            value={!disabled ? stats.dex : calculateModifier(stats.dex)}
            onChange={onChange('dex')}
            helperText={`Save: ${calculateModifier(stats.dex, getSaveBonus('dex'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(stats.con) : stats.con} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Constitution"
            value={!disabled ? stats.con : calculateModifier(stats.con)}
            onChange={onChange('con')}
            helperText={`Save: ${calculateModifier(stats.con, getSaveBonus('con'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(stats.int) : stats.int} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Intelligence"
            value={!disabled ? stats.int : calculateModifier(stats.int)}
            onChange={onChange('int')}
            helperText={`Save: ${calculateModifier(stats.int, getSaveBonus('int'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(stats.wis) : stats.wis} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Wisdom"
            value={!disabled ? stats.wis : calculateModifier(stats.wis)}
            onChange={onChange('wis')}
            helperText={`Save: ${calculateModifier(stats.wis, getSaveBonus('wis'))}`}
          />
        </Badge>
        <Badge badgeContent={!disabled ? calculateModifier(stats.cha) : stats.cha} color="secondary">
          <TextField
            variant="outlined"
            disabled={disabled}
            type={!disabled ? 'number' : 'mod'}
            label="Charisma"
            value={!disabled ? stats.cha : calculateModifier(stats.cha)}
            onChange={onChange('cha')}
            helperText={`Save: ${calculateModifier(stats.cha, getSaveBonus('cha'))}`}
          />
        </Badge>
      </StatGrid>
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
