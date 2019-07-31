import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, TextField, Divider,
} from '@material-ui/core';
import {
  Card, HeaderBar, ActionBar, Row, Spacer, Column,
} from './CustomStyled';

const Inventory = ({
  itemList, gold, update, disabled,
}) => {
  const [isAdding, setAdding] = useState(false);
  const [itemValues, setItemValues] = useState({});
  const [goldValue, setGold] = useState(gold);

  function handleChange(field, numeric) {
    return (e) => {
      setItemValues({ ...itemValues, [field]: numeric ? +e.target.value : e.target.value });
    };
  }

  function addItem() {
    update(goldValue, [...itemList, itemValues]);
    setAdding(false);
  }

  function changeGold(e) {
    const newGold = +e.target.value;
    update(newGold, itemList);
    setGold(newGold);
  }

  function remove(i) {
    update(goldValue, [...itemList.slice(0, i), ...itemList.slice(i + 1)]);
  }

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
             </ActionBar>
        }
      </HeaderBar>
      { // ADD NEW ITEM
        isAdding
        && <Column>
          <Row>
            <TextField
              style={{ maxWidth: 100 }}
              variant="outlined"
              type="number"
              label="Value (gp)"
              value={itemValues.goldCost || ''}
              onChange={handleChange('goldCost', true)}
            />
            <TextField
              style={{ maxWidth: 150 }}
              variant="outlined"
              label="Name"
              value={itemValues.name || ''}
              onChange={handleChange('name')}
            />
            <Spacer />
            <IconButton onClick={addItem}>
              <i className="material-icons">done</i>
            </IconButton>
          </Row>
          <TextField
            variant="outlined"
            label="Description (optional)"
            value={itemValues.description || ''}
            onChange={handleChange('description')}
          />
           </Column>
      }

      <Row>
        <TextField
          style={{ maxWidth: 150 }}
          variant="outlined"
          type="number"
          label="Gold Pieces"
          value={goldValue || 0}
          onChange={changeGold}
        />
        <Divider />
      </Row>

      { // DISPLAY ALL ITEMS
        itemList.map((item, i) => (
          <Column key={`${item.name}`}>
            <Row style={{ alignItems: 'center' }}>
              <h4 className="min-margin">{ item.name }</h4>
              <p className="min-margin"> ({ item.goldCost }gp)</p>
              <Spacer />
              <IconButton color="secondary" onClick={() => remove(i)}>
                <i className="material-icons">close</i>
              </IconButton>
            </Row>
            { item.description && <p className="min-margin">{ item.description }</p> }
            <Divider />
          </Column>
        ))
      }
    </Card>
  );
};

export default Inventory;

Inventory.propTypes = {
  itemList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    damage_dice: PropTypes.string,
    damage_type: PropTypes.string,
    weight: PropTypes.string,
  })).isRequired,
  gold: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
