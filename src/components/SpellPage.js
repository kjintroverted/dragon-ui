import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox, Button } from '@material-ui/core';
import {
  Card, HeaderBar, Spacer, ActionBar, Column, Row,
} from './CustomStyled';
import dungeonService from '../services/dungeonService';

const SpellPage = ({
  level, spells, slots, addSpell,
}) => {
  const [spellList, setSpellList] = useState([]);
  const [openSlots, setOpenSlots] = useState([]);
  const [spellSearchResult, setSearchResults] = useState([]);
  const [showResults, setShow] = useState(false);
  const [newSpell, setNewSpell] = useState({});

  async function getNewSpells() {
    const results = await dungeonService.getSpells(level);
    setSearchResults(results.filter(spell => !spellList.find(known => known.slug === spell.slug)));
  }

  function loadSpellSearch() {
    if (!spellSearchResult.length) getNewSpells();
    setShow(true);
  }

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
      <Column>
        <SpellList>
          { showResults
            && spellSearchResult
              .map(spell =>
                <Button
                  key={spell.name}
                  variant="contained"
                  color={spell.name === newSpell.name ? 'primary' : 'secondary'}
                  onClick={() => setNewSpell(spell)}
                >{ spell.name }
                </Button>)
          }
        </SpellList>
      </Column>
      { !showResults
        ? <Button color="secondary" onClick={loadSpellSearch}>See Spells</Button>
        : <Row style={{ justifyContent: 'center' }}>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={loadSpellSearch}>Learn Spell</Button>
          </Row>
      }
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

const SpellList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 10px;
  margin: 10px 0px;
`;
