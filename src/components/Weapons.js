import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, TextField, FormControl, InputLabel, FormLabel, Select, OutlinedInput, MenuItem, Button,
} from '@material-ui/core';
import styled from 'styled-components';
import {
  Card, HeaderBar, ActionBar, Row, Spacer, Column, BasicBox,
} from './CustomStyled';
import { dexAttack, calculateModifier, isProWeapon, isRangeWeapon } from '../services/helper';
import dungeonService from '../services/dungeonService';


const Weapons = ({
  proWeapons, weaponList, dex, str, proBonus, update, disabled,
}) => {
  const [isAdding, setAdding] = useState(false);
  const [isAddingUnique, setAddingUnique] = useState(false);
  const [weaponOptions, setWeaponOptions] = useState([]);
  const [selectedWeapon, setWeaponSelect] = useState({});
  const [weaponCategories, setWeaponCategories] = useState([]);
  const [damageTypes, setDamageTypes] = useState([]);
  const [uniqueWeapon, setUniqueWeapon] = useState({
    name: '',
    category: '',
    damage_dice: '',
    damage_type: '',
    properties: [],
  });

  async function loadWeaponOptions() {
    const weapons = await dungeonService.getWeapons();
    const uniqueCategories = new Set();
    const uniqueDamageTypes = new Set();
    weapons.map((weapon) => {
      uniqueCategories.add(weapon.category);
      uniqueDamageTypes.add(weapon.damage_type.trim());
    });
    setWeaponCategories([...uniqueCategories]);
    setDamageTypes([...uniqueDamageTypes]);
    setWeaponOptions(weapons);
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

  function handleUniqueSelect(event) {
    setUniqueWeapon(oldWeapon => ({
      ...oldWeapon,
      [event.target.name]: event.target.value,
    }));
  }

  function handleValueChange(field) {
    return (e) => {
      const weapon = uniqueWeapon;
      // TODO: splice based on commas to put into a list
      if (field === 'properties') {
        weapon[field] = [e.target.value];
      } else {
        weapon[field] = e.target.value;
      }
      setUniqueWeapon(weapon);
    };
  }

  function submitUniqueWeapon() {
    update([...weaponList, uniqueWeapon]);
    setAddingUnique(false);
    setUniqueWeapon({});
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
            <IconButton onClick={ () => { setAdding(!isAdding); setAddingUnique(false); } }>
              <i className="material-icons">{ isAdding ? 'close' : 'add' }</i>
            </IconButton>
          </ActionBar>
        }
      </HeaderBar>
      { // ADD NEW WEAPON
        isAdding && !isAddingUnique
        && <Row>
          <FormControl variant="outlined" style={ { minWidth: 120 } }>
            <FormLabel htmlFor="class">Weapon Select</FormLabel>
            <Select
              value={ selectedWeapon.name || '' }
              onChange={ onWeaponChange }
              input={ <OutlinedInput id="weapon" /> }
            >
              {
                weaponOptions.map(val => <MenuItem key={ val.name } value={ val.name }>{ val.name }</MenuItem>)
              }
            </Select>
          </FormControl>
          <Spacer />
          <IconButton onClick={ addWeapon }>
            <i className="material-icons">done</i>
          </IconButton>
<<<<<<< HEAD
  <Row>
    <h2>Can&apos;t find your weapon?</h2>
    <Button variant="contained" color="primary" onClick={ () => setAddingUnique(true) }>Add Unique Weapon</Button>
  </Row>
           </Row >
=======
        </Row>
>>>>>>> master
      }
{
  isAddingUnique
    && <>
      <Row>
        <h3>Add Unique Weapon</h3>
        <Spacer />
      </Row>
      <Row>
        <InputContainer>
          <InputLabel htmlFor="unique-category">Name</InputLabel>
          <TextField
            style={ { width: '7rem' } }
            variant="outlined"
            onChange={ handleValueChange('name') }
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="unique-category">Category</InputLabel>
          <Select
            style={ { width: '7rem' } }
            variant="outlined"
            inputProps={ {
              name: 'category',
              id: 'unique-category',
            } }
            input={ <OutlinedInput id="weapon" /> }
            value={ uniqueWeapon.category }
            onChange={ handleUniqueSelect }
          >
            {
              weaponCategories.map(category => <MenuItem key={ category } value={ category }>{ category }</MenuItem>)
            }
          </Select>
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="unique-category">Damage Dice</InputLabel>
          <TextField
            style={ { width: '7rem' } }
            variant="outlined"
            placeholder="1d4"
            onChange={ handleValueChange('damage_dice') }
          />
        </InputContainer>
      </Row>
      <Row>
        <InputContainer>
          <InputLabel htmlFor="unique-damage-type">Damage Type</InputLabel>
          <Select
            style={ { width: '7rem' } }
            variant="outlined"
            inputProps={ {
              name: 'damage_type',
              id: 'unique-damage-type',
            } }
            input={ <OutlinedInput id="weapon" /> }
            value={ uniqueWeapon.damage_type }
            onChange={ handleUniqueSelect }
          >
            {
              damageTypes.map(damageType => <MenuItem key={ damageType } value={ damageType }>{ damageType }</MenuItem>)
            }
          </Select>
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="unique-category">Weight</InputLabel>
          <TextField
            style={ { width: '7rem' } }
            variant="outlined"
            onChange={ handleValueChange('weight') }
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="unique-category">Properties</InputLabel>
          <TextField
            style={ { width: '7rem' } }
            variant="outlined"
            onChange={ handleValueChange('properties') }
          />
        </InputContainer>
      </Row>
      <Row>
        <Button variant="contained" color="primary" className="submit-button" onClick={ submitUniqueWeapon }>
          Submit Weapon
            </Button>
      </Row>
    </>
}
{ // DISPLAY ALL WEAPONS
  weaponList.map((weapon) => {
    const dexCheck = dexAttack(weapon);
    const proMod = isProWeapon(weapon, proWeapons) ? proBonus : 0;
    const atkMod = dexCheck ? calculateModifier(dex, proMod) : calculateModifier(str, proMod);
    const rangeAtk = isRangeWeapon(weapon) ? calculateModifier(dex, proMod) : 0;
    const dmgMod = dexCheck ? calculateModifier(dex) : calculateModifier(str);
    const rangeDmg = isRangeWeapon(weapon) ? calculateModifier(dex) : 0;

    return (
      <Row key={ `${ weapon.name }` }>
        <Column>
          <h3 className="min-margin">{ weapon.name }</h3>
          <p className="min-margin">{ weapon.damage_type }</p>
        </Column>
        <Spacer />
        <BasicBox>
          <TextField variant="outlined" disabled label="Attack" value={ atkMod }
            helperText={ !dexCheck && rangeAtk ? `thrown: ${ rangeAtk }` : '' } />
        </BasicBox>
        <BasicBox>
          <TextField variant="outlined" disabled label="Damage"
            value={ `${ weapon.damage_dice } ${ dmgMod }` }
            helperText={ !dexCheck && rangeDmg ? `thrown: ${ rangeDmg }` : '' } />
        </BasicBox>
      </Row>
    );
  })
}
    </Card >
  );
};

export default Weapons;

const InputContainer = styled.div`
  margin: 0.5rem;
`;

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
