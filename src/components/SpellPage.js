import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Checkbox, Button, Chip, IconButton, Divider,
} from '@material-ui/core';
import {
  Card, HeaderBar, Spacer, ActionBar, Column, Row,
} from './CustomStyled';
import dungeonService from '../services/dungeonService';
import SpellDetail from './SpellDetail';

const SpellPage = ({
  level, spells, slots, addSpell,
}) => {
  const [spellList, setSpellList] = useState([]);
  const [openSlots, setOpenSlots] = useState([]);
  const [spellSearchResult, setSearchResults] = useState([]);
  const [showResults, setShow] = useState(false);
  const [newSpell, setNewSpell] = useState({});
  const [selectedSpell, setSpell] = useState({});

  async function getNewSpells() {
    const results = await dungeonService.getSpellsForLevel(level);
    setSearchResults(results.filter(spell => !spellList.find(known => known.slug === spell.slug)));
  }

  function loadSpellSearch() {
    if (!spellSearchResult.length) getNewSpells();
    setShow(true);
  }

  function learn(spell) {
    addSpell(spell);
    setShow(false);
    setNewSpell({});
  }

  useEffect(() => {
    setSpellList(
      spells
        .filter(spell => (spell.level === 'Cantrip' && level === 'Cantrip') || spell.level === `${level}-level`),
    );
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

      {/* KNOWN SPELLS */ }
      <Column>
        { !!selectedSpell.name
          && <SpellDetail spell={selectedSpell} close={() => setSpell({})} />
        }
        <SpellList>
          { spellList
            .map(spell =>
              <Chip
                key={spell.name}
                label={spell.name}
                variant="outlined"
                onClick={() => setSpell(spell)}
                color={spell.name === selectedSpell.name ? 'primary' : 'secondary'}
              />)
          }
        </SpellList>
        <Divider />
      </Column>

      {/* NEW SPELL LOOKUP */ }
      <Column>
        { !!newSpell.name
          && <SpellDetail spell={newSpell} close={() => setNewSpell({})} />
        }
        <SpellList>
          { showResults
            && spellSearchResult
              .map(spell =>
                <Chip
                  key={spell.name}
                  label={spell.name}
                  variant="outlined"
                  onClick={() => setNewSpell(spell)}
                  color={spell.name === newSpell.name ? 'primary' : 'secondary'}
                />)
          }
        </SpellList>
      </Column>
      { !showResults
        ? <Button color="secondary" onClick={loadSpellSearch}>See Spells</Button>
        : <Row style={{ justifyContent: 'center' }}>
          <Button onClick={() => {
            setShow(false);
            setNewSpell({});
          }}
          >Cancel
          </Button>
          <Button
            disabled={!newSpell.name}
            variant="contained"
            color="secondary"
            onClick={() => learn(newSpell)}
          >Learn Spell
          </Button>
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
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 10px;
  margin: 10px 0px;
  justify-content: center;
`;
