import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@material-ui/core';
import {
  Card, HeaderBar, ActionBar, Row, Spacer, Column, BasicBox,
} from './CustomStyled';
import { isFinesse, calculateModifier } from '../services/helper';

const Weapons = ({ weaponList, dex, str }) => {
  const [isAdding, setAdding] = useState(false);
  return (
    <Card>
      <HeaderBar>
        <h2>Weapons</h2>
        <Spacer />
        <ActionBar>
          <IconButton onClick={() => setAdding(!isAdding)}>
            <i className="material-icons">add</i>
          </IconButton>
        </ActionBar>
      </HeaderBar>
      {
        weaponList.map((weapon) => {
          const mod = isFinesse(weapon) ? calculateModifier(dex) : calculateModifier(str);
          return (
            <Row key={`${weapon.name}`}>
              <Column style={{ alignItems: 'flex-end' }}>
                <h3 className="min-margin">{ weapon.name }</h3>
                <p className="min-margin">{ weapon.damage_type }</p>
              </Column>
              <Spacer />
              <BasicBox>
                <TextField variant="outlined" disabled label="Check" value={mod} />
              </BasicBox>
              <BasicBox>
                <TextField variant="outlined" disabled label="Damage" value={`${weapon.damage_dice} ${mod}`} />
              </BasicBox>
            </Row>
          );
        })
      }
    </Card>
  );
};

export default Weapons;

Weapons.propTypes = {
  weaponList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    damage_dice: PropTypes.string,
    damage_type: PropTypes.string,
    weight: PropTypes.string,
  })).isRequired,
  dex: PropTypes.number.isRequired,
  str: PropTypes.number.isRequired,
};
