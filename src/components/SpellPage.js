import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Checkbox, Button, Chip, Divider,
} from '@material-ui/core';
import {
  Card, HeaderBar, Spacer, ActionBar, Column, Row,
} from './CustomStyled';
import dungeonService from '../services/dungeonService';
import SpellDetail from './SpellDetail';

const SpellPage = ({
  level, spells, slots, addSpell, mod,
}) => {
  const [spellList, setSpellList] = useState([]);
  const [openSlots, setOpenSlots] = useState([]);
  const [spellSearchResult, setSearchResults] = useState([]);
  const [showResults, setShow] = useState(false);
  const [newSpell, setNewSpell] = useState({});
  const [selectedSpell, setSpell] = useState({});
  const [showSpellDetail, setShowSpellDetail] = useState(false);
  const [showNewSpellDetail, setShowNewSpellDetail] = useState(false);

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
        .filter(spell => (spell.level === 'Cantrip' && level === 'Cantrip') || spell.level === `${ level }-level`),
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
        <Column>
          <h2>{ level } Level Spells</h2>
          <p><b>Modifier:</b> { mod } | <b>DC:</b> { 10 + +mod }</p>
        </Column>
        <Spacer />
        <ActionBar>
          { openSlots.map((val, i) => (
            <Checkbox
              key={ `${ level }-slot-${ i }` }
              checked={ val }
              value={ i }
              onChange={ () => setOpenSlots([...openSlots.slice(0, i), !val, ...openSlots.slice(i + 1)]) }
            />
          ))
          }
        </ActionBar>
      </HeaderBar>

      {/* KNOWN SPELLS */ }
      <Column>
        { !!selectedSpell.name && showSpellDetail
          && <SpellDetail spell={ selectedSpell } close={ () => { setSpell({}); setShowSpellDetail(false); } } />
        }
        <SpellList>
          { spellList
            .map(spell =>
              <Chip
                key={ spell.name }
                label={ spell.name }
                variant="outlined"
                onClick={ () => setSpell(spell) }
                color={ spell.name === selectedSpell.name ? 'primary' : 'secondary' }
                onDelete={ () => { setShowSpellDetail(true); setSpell(spell); } }
                deleteIcon={ <i className="material-icons">info</i> }
              />)
          }
        </SpellList>
        <Divider />
      </Column>

      {/* NEW SPELL LOOKUP */ }
      <Column>
        { !!newSpell.name && showNewSpellDetail
          && <SpellDetail spell={ newSpell } close={ () => { setNewSpell({}); setShowNewSpellDetail(false); } } />
        }
        <SpellList>
          { showResults
            && spellSearchResult
              .map(spell =>
                <Chip
                  key={ spell.name }
                  label={ spell.name }
                  variant="outlined"
                  onClick={ () => setNewSpell(spell) }
                  color={ spell.name === newSpell.name ? 'primary' : 'secondary' }
                  onDelete={ () => { setShowNewSpellDetail(true); setNewSpell(spell); } }
                  deleteIcon={ <i className="material-icons">info</i> }
                />)
          }
        </SpellList>
      </Column>
      { !showResults
        ? <Button color="secondary" onClick={ loadSpellSearch }>See Spells</Button>
        : <Row style={ { justifyContent: 'center' } }>
          <Button onClick={ () => {
            setShow(false);
            setNewSpell({});
          } }
          >Cancel
          </Button>
          <Button
            disabled={ !newSpell.name }
            variant="contained"
            color="secondary"
            onClick={ () => learn(newSpell) }
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
  mod: PropTypes.string.isRequired,
};

const SpellList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 10px;
  margin: 10px 0px;
  justify-content: center;
`;
