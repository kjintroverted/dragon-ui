import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, TextField, FormControl, FormLabel, Select, OutlinedInput, MenuItem,
} from '@material-ui/core';
import {
  Card, HeaderBar, ActionBar, Row, Spacer, Column, BasicBox,
} from './CustomStyled';
import { isFinesse, calculateModifier, isProWeapon } from '../services/helper';
import dungeonService from '../services/dungeonService';

const Weapons = ({
  proWeapons, weaponList, dex, str, proBonus, update, disabled,
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
    setWeaponSelect({});
  }

  useEffect(() => {
    if (isAdding && !weaponOptions.length) loadWeaponOptions();
  }, [isAdding]);

  return (
    <Card>
      <HeaderBar>
        <h2>Weapons</h2>
        <Spacer />
        { !disabled
          && <ActionBar>
            <IconButton onClick={() => setAdding(!isAdding)}>
              <i className="material-icons">{ isAdding ? 'close' : 'add' }</i>
            </IconButton>
             </ActionBar>
        }
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
          const proMod = isProWeapon(weapon, proWeapons) ? proBonus : 0;
          const mod = isFinesse(weapon) ? calculateModifier(dex, proMod) : calculateModifier(str, proMod);
          return (
            <Row key={`${weapon.name}`}>
              <Column>
                <h3 className="min-margin">{ weapon.name }</h3>
                <p className="min-margin">{ weapon.damage_type }</p>
              </Column>
              <Spacer />
              <BasicBox>
                <TextField variant="outlined" disabled label="Attack" value={mod} />
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
  proWeapons: PropTypes.string.isRequired,
  weaponList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    damage_dice: PropTypes.string,
    damage_type: PropTypes.string,
    weight: PropTypes.string,
  })).isRequired,
  dex: PropTypes.number.isRequired,
  str: PropTypes.number.isRequired,
  proBonus: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
