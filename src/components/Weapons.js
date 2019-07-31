import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, TextField, FormControl, FormLabel, Select, OutlinedInput, MenuItem,
} from '@material-ui/core';
import {
  Card, HeaderBar, ActionBar, Row, Spacer, Column, BasicBox,
} from './CustomStyled';
import { isFinesse, calculateModifier } from '../services/helper';
import dungeonService from '../services/dungeonService';

const Weapons = ({
  weaponList, dex, str, update,
}) => {
  const [isAdding, setAdding] = useState(false);
  const [weaponOptions, setWeaponOptions] = useState([]);
  const [selectedWeapon, setWeaponSelect] = useState({});

  async function loadWeaponOptions() {
    const result = await dungeonService.getWeapons();
    setWeaponOptions(result);
  }

  function onWeaponChange(e) {
    const weapon = weaponOptions.find(w => w.name === e.target.value);
    setWeaponSelect(weapon);
  }

  function addWeapon() {
    update([...weaponList, selectedWeapon]);
    setAdding(false);
  }

  useEffect(() => {
    if (isAdding && !weaponOptions.length) loadWeaponOptions();
  }, [isAdding]);

  return (
    <Card>
      <HeaderBar>
        <h2>Weapons</h2>
        <Spacer />
        <ActionBar>
          <IconButton onClick={() => setAdding(!isAdding)}>
            <i className="material-icons">{ isAdding ? 'close' : 'add' }</i>
          </IconButton>
        </ActionBar>
      </HeaderBar>
      { // ADD NEW WEAPON
        isAdding
        && <Row>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <FormLabel htmlFor="class">Weapon Select</FormLabel>
            <Select
              value={selectedWeapon.name || ''}
              onChange={onWeaponChange}
              input={<OutlinedInput id="weapon" />}
            >
              {
                weaponOptions.map(val => <MenuItem key={val.name} value={val.name}>{ val.name }</MenuItem>)
              }
            </Select>
          </FormControl>
          <Spacer />
          <IconButton onClick={addWeapon}>
            <i className="material-icons">done</i>
          </IconButton>
           </Row>
      }
      { // DISPLAY ALL WEAPONS
        weaponList.map((weapon) => {
          const mod = isFinesse(weapon) ? calculateModifier(dex) : calculateModifier(str);
          return (
            <Row key={`${weapon.name}`}>
              <Column>
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
  update: PropTypes.func.isRequired,
};
