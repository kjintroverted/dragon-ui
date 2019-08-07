import React from 'react';
import PropTypes from 'prop-types';
import { Badge, TextField } from '@material-ui/core';
import {
  Card, Column, Row, BasicBox, Spacer,
} from './CustomStyled';
import { calculateModifier } from '../services/helper';

const Profile = ({
  character, hitDice, update, disabled, editing,
}) => {
  function onChange(field, numeric) {
    return (e) => {
      const val = numeric ? +e.target.value : e.target.value;
      update({ ...character, [field]: val });
    };
  }

  return (
    <Card>
      <Row style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Column>
          { !editing
            ? <h2 style={{ margin: 0 }}>{ character.name }</h2>
            : <TextField
              label="Name"
              value={character.name}
              onChange={onChange('name')}
            />
          }
          <p style={{ margin: 0 }}>{ character.race } { character.class } ({ hitDice })</p>
        </Column>
        <Spacer />
        <Badge badgeContent={`+${character.proBonus}`} color="secondary">
          <BasicBox>
            { !editing
              ? <TextField
                variant="outlined"
                disabled
                type="number"
                label="Level"
                value={character.level}
              />
              : <TextField
                variant="outlined"
                type="number"
                label="XP"
                value={character.xp}
                onChange={onChange('xp', true)}
              />
            }
          </BasicBox>
        </Badge>
        <BasicBox>
          { !editing
            ? <TextField
              variant="outlined"
              disabled={disabled}
              type="number"
              label={`HP/${character.maxHP}`}
              value={character.hp}
              onChange={onChange('hp', true)}
            />
            : <TextField
              variant="outlined"
              disabled={disabled}
              type="number"
              label="Max HP"
              value={character.maxHP}
              onChange={onChange('maxHP', true)}
            />
          }
        </BasicBox>
        <BasicBox>
          <TextField
            variant="outlined"
            disabled={!editing}
            type="number"
            label="AC"
            value={character.armor}
            onChange={onChange('armor', true)}
          />
        </BasicBox>
        <BasicBox>
          <TextField
            variant="outlined"
            disabled={!editing}
            type="number"
            label="Speed"
            value={character.speed}
            onChange={onChange('speed', true)}
          />
        </BasicBox>
        <Badge badgeContent={calculateModifier(character.dex)} color="secondary">
          <BasicBox>
            <TextField
              variant="outlined"
              disabled={disabled}
              type="number"
              label="Init"
              value={character.initiative || ''}
              onChange={onChange('initiative', true)}
            />
          </BasicBox>
        </Badge>
      </Row>
    </Card>
  );
};

export default Profile;

Profile.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
  hitDice: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
};
