import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Button } from '@material-ui/core';
import {
  Card, HeaderBar, Spacer, ActionBar,
} from './CustomStyled';

const SpellPage = ({
  level, spells, slots, addSpell,
}) => {
  const [spellList, setSpellList] = useState([]);
  const [openSlots, setOpenSlots] = useState([]);

  useEffect(() => {
    setSpellList(spells.filter(spell => spell.level === `${level}-level`));
  }, [spells]);

  useEffect(() => {
    const slotArr = [];
    for (let i = 0; i < slots; i++) {
      slotArr.push(false);
    }
    setOpenSlots(slotArr);
  }, [slots]);

  return (
    <Card>
      <HeaderBar>
        <h2>{ level } Level Spells</h2>
        <Spacer />
        <ActionBar>
          { openSlots.map((val, i) => (
            <Checkbox
              key={`${level}-slot-${i}`}
              checked={val}
              value={i}
              onChange={() => setOpenSlots([...openSlots.slice(0, i), !val, ...openSlots.slice(i + 1)])}
            />
          ))
          }
        </ActionBar>
      </HeaderBar>
      <Button color="secondary">Learn Spell</Button>
    </Card>
  );
};

export default SpellPage;

SpellPage.propTypes = {
  level: PropTypes.string.isRequired,
  spells: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    level: PropTypes.string,
    casting_time: PropTypes.string,
  })).isRequired,
  slots: PropTypes.number.isRequired,
  addSpell: PropTypes.func.isRequired,
};
