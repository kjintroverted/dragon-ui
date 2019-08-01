import React from 'react';
import PropTypes from 'prop-types';
import { Badge, TextField } from '@material-ui/core';
import {
  Card, Column, Row, BasicBox, Spacer,
} from './CustomStyled';

const Profile = ({
  character, hitDice, update, disabled,
}) => {
  function onChange(field, max) {
    return (e) => {
      let val = +e.target.value;
      val = val > max ? max : val;
      update({ ...character, [field]: val });
    };
  }

  return (
    <Card>
      <Row style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Column>
          <h2 style={{ margin: 0 }}>{ character.name }</h2>
          <p style={{ margin: 0 }}>{ character.race } { character.class } ({ hitDice })</p>
        </Column>
        <Spacer />
        <Badge badgeContent={`+${character.proBonus}`} color="secondary">
          <BasicBox>
            <TextField variant="outlined" disabled type="number" label="Level" value={character.level} />
          </BasicBox>
        </Badge>
        <BasicBox>
          <TextField
            variant="outlined"
            disabled={disabled}
            type="number"
            label="HP"
            value={character.hp}
            onChange={onChange('hp')}
          />
        </BasicBox>
        <BasicBox>
          <TextField
            variant="outlined"
            disabled={disabled}
            type="number"
            label="AC"
            value={character.armor}
            onChange={onChange('armor')}
          />
        </BasicBox>
        <BasicBox>
          <TextField
            variant="outlined"
            disabled={disabled}
            type="number"
            label="Speed"
            value={character.speed}
            onChange={onChange('speed')}
          />
        </BasicBox>
        <BasicBox>
          <TextField
            variant="outlined"
            disabled={disabled}
            type="number"
            label="Init"
            value={character.initiative || ''}
            onChange={onChange('initiative')}
          />
        </BasicBox>
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
};
