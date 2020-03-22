import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, TextField, Divider,
  FormControl, FormLabel,
  Select, OutlinedInput, MenuItem,
} from '@material-ui/core';
import {
  Card, HeaderBar, ActionBar, Row, Spacer, Column, BasicBox,
} from './CustomStyled';
import dungeonService from '../services/dungeonService';

const Inventory = ({
  characterInfo, ownedItems, update, disabled,
}) => {
  const [isAdding, setAdding] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [itemValues, setItemValues] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [itemList, setItemList] = useState([]);
  const [goldValue, setGold] = useState(characterInfo.gold);
  const [showDesc, setDescVisible] = useState(ownedItems.map(() => false));

  async function loadItems() {
    const items = await dungeonService.getItems();
    console.log(items);
    setItemList(items);
  }

  // function handleChange(field, numeric) {
  //   return (e) => {
  //     setItemValues({ ...itemValues, [field]: numeric ? +e.target.value : e.target.value });
  //   };
  // }

  // function addItem() {
  //   // if (!itemValues.qty) itemValues.qty = 1; TODO: Re-enable after quantity is added again
  //   update([...ownedItems, itemValues]);
  //   setAdding(false);
  //   setItemValues({});
  // }
  function onItemChange(e) {
    const item = itemList.find(i => i.name === e.target.value);
    setSelectedItem(item);
  }

  function changeGold(e) {
    const newGold = +e.target.value;
    update({ ...characterInfo, gold: newGold });
    setGold(newGold);
  }

  function remove(i) {
    update(goldValue, [...ownedItems.slice(0, i), ...ownedItems.slice(i + 1)]);
  }

  function toggleDesc(i) {
    setDescVisible([...showDesc.slice(0, i), !showDesc[i], ...showDesc.slice(i + 1)]);
  }

  function displayOwnedItems() {
    ownedItems.map((item) => {
      const inventoryItem = characterInfo.inventory.filter(inventory => inventory.id === +item.id);
      item.qty = inventoryItem[0].qty;
    });
    setItemList(ownedItems);
  }

  // Need to fix once quantity gets added.
  function updateQty(item) {
    return (e) => {
      const value = +e.target.value;
      const { inventory } = characterInfo;
      console.log(value, 'value');
      console.log(inventory, 'inventory');
      console.log(item, 'item');
      const found = inventory.find(inv => inv.id === +item.id);
      found.qty = value;
      console.log(found, 'found');
      update({ ...characterInfo, inventory });
    };
  }

  useEffect(() => {
    loadItems();
  }, [isAdding]);

  useEffect(() => {
    displayOwnedItems();
  }, [characterInfo]);
  return (
    <Card>
      <HeaderBar>
        <h2>Inventory</h2>
        <Spacer />
        { !disabled
          && <ActionBar>
            <IconButton onClick={() => setAdding(!isAdding)}>
              <i className="material-icons">{ isAdding ? 'close' : 'add' }</i>
            </IconButton>
            <IconButton onClick={() => {
              setEditing(!isEditing);
              setItemValues({});
            }
              }
            >
              <i className="material-icons">{ isEditing ? 'check' : 'edit' }</i>
            </IconButton>
             </ActionBar>
        }
      </HeaderBar>
      { // ADD NEW ITEM
        isAdding && itemList.length > 0
        && <Column>
          <Row>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <FormLabel htmlFor="class">Item Select</FormLabel>
            <Select
              value={selectedItem.name || ''}
              onChange={onItemChange}
              input={<OutlinedInput id="item" />}
            >
              {
                itemList.map(val => <MenuItem key={val.name} value={val.name}>{ val.name }</MenuItem>)
              }
            </Select>
          </FormControl>
          <Spacer />
          <IconButton>
            <i className="material-icons">done</i>
          </IconButton>
          </Row>

           </Column>
      }

      <Row style={{ justifyContent: 'flex-end' }}>
        <TextField
          disabled={disabled}
          style={{ maxWidth: 150 }}
          variant="outlined"
          type="number"
          label="Gold Pieces"
          value={goldValue || 0}
          onChange={changeGold}
        />
      </Row>

      { // DISPLAY ALL ITEMS
        ownedItems.map((item, i) => (
          <Column key={`${item.name}`}>
            {console.log(item)}
            <Row style={{ alignItems: 'center' }}>
              { isEditing
                && <IconButton color="secondary" onClick={() => remove(i)}>
                  <i className="material-icons">delete</i>
                   </IconButton>
              }
              <h4 className="min-margin">{ item.name }</h4>
              {
                (item.description || !!item.goldCost)
                && <IconButton onClick={() => toggleDesc(i)}>
                  <i className="material-icons">{ showDesc[i] ? 'cancel' : 'info' }</i>
                   </IconButton>
              }
              <Spacer />
              <BasicBox>
                <TextField
                  variant="outlined"
                  type="number"
                  disabled={disabled}
                  label="Qty"
                  value={item.qty}
                  onChange={updateQty(item)}
                />
              </BasicBox>
            </Row>
            { showDesc[i]
              && <p className="min-margin">
                { item.description ? item.description : null }
                { !item.goldCost ? null : `(${item.goldCost} gp)` }
                 </p>
            }
            <Divider />
          </Column>
        ))
      }
    </Card>
  );
};

export default Inventory;

Inventory.propTypes = {
  ownedItems: PropTypes.array.isRequired,
  // gold: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
