import React from 'react';
import PropTypes from 'prop-types';
import { Badge, TextField } from '@material-ui/core';
import {
  Card, Column, Row, BasicBox, Spacer, RowCenter,
} from './CustomStyled';

const Profile = ({ character }) => (
  <Card>
    <Row style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
      <Column>
        <h2 style={{ margin: 0 }}>{ character.name }</h2>
        <p style={{ margin: 0 }}>{ character.race } { character.class }</p>
      </Column>
      <Spacer />
      <Badge badgeContent={`+${character.proBonus}`} color="secondary">
        <BasicBox>
          <TextField variant="outlined" disabled type="number" label="Level" value={character.level} />
        </BasicBox>
      </Badge>
      <BasicBox>
        <TextField variant="outlined" disabled type="number" label="HP" value={character.hp} />
      </BasicBox>
      <BasicBox>
        <TextField variant="outlined" disabled type="number" label="AC" value={character.armor} />
      </BasicBox>
      <BasicBox>
        <TextField variant="outlined" disabled type="number" label="Speed" value={character.speed} />
      </BasicBox>
      <BasicBox>
        <TextField variant="outlined" disabled type="number" label="Init" value={character.initiative} />
      </BasicBox>
    </Row>
  </Card>
);

export default Profile;

Profile.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
};
