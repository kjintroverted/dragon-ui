import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, TextField, Divider,
} from '@material-ui/core';
import {
  Card, HeaderBar, ActionBar, Row, Spacer, Column, BasicBox,
} from './CustomStyled';

const Inventory = ({
  itemList, gold, update, disabled,
}) => {
  const [isAdding, setAdding] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [itemValues, setItemValues] = useState({});
  const [goldValue, setGold] = useState(gold);
  const [showDesc, setDescVisible] = useState(itemList.map(() => false));

  function handleChange(field, numeric) {
    return (e) => {
      setItemValues({ ...itemValues, [field]: numeric ? +e.target.value : e.target.value });
    };
  }

  function addItem() {
    if (!itemValues.qty) itemValues.qty = 1;
    update(goldValue, [...itemList, itemValues]);
    setAdding(false);
    setItemValues({});
  }

  function changeGold(e) {
    const newGold = +e.target.value;
    update(newGold, itemList);
    setGold(newGold);
  }

  function remove(i) {
    update(goldValue, [...itemList.slice(0, i), ...itemList.slice(i + 1)]);
  }

  function toggleDesc(i) {
    setDescVisible([...showDesc.slice(0, i), !showDesc[i], ...showDesc.slice(i + 1)]);
  }

  function updateQty(i) {
    const item = itemList[i];
    return (e) => {
      const qty = +e.target.value;
      update(
        goldValue,
        [...itemList.slice(0, i), { ...item, qty }, ...itemList.slice(i + 1)],
      );
    };
  }

  useEffect(() => setGold(gold), [gold]);

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
            <TextField
              style={{ maxWidth: 100 }}
              variant="outlined"
              type="number"
              label="Qty"
              value={itemValues.qty || ''}
              onChange={handleChange('qty', true)}
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
        itemList.map((item, i) => (
          <Column key={`${item.name}`}>
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
                  onChange={updateQty(i)}
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
