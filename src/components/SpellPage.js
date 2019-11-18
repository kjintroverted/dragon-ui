import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions,
} from '@material-ui/core';
import {
  Card, HeaderBar, Spacer, ActionBar, Column,
} from './CustomStyled';
import dungeonService from '../services/dungeonService';
import SpellDetail from './SpellDetail';

const SpellPage = ({
  level, spells, slots, addSpell, forgetSpell, mod,
}) => {
  const [spellList, setSpellList] = useState([]);
  const [openSlots, setOpenSlots] = useState([]);
  const [spellSearchResult, setSearchResults] = useState([]);
  const [showResults, setShow] = useState(false);

  async function getNewSpells() {
    const results = await dungeonService.getSpellsForLevel(level);
    setSearchResults(results.filter(spell => !spellList.find(known => known.slug === spell.slug)));
  }

  function loadSpellSearch() {
    if (!spellSearchResult.length) getNewSpells();
    setShow(true);
  }

  useEffect(() => {
    setSpellList(
      spells
        .filter(spell => (spell.level === 'Cantrip' && level === 'Cantrip') || spell.level === `${ level }-level`),
    );
  }, [spells]);

  useEffect(() => {
    let slotArr = localStorage.getItem(level);
    slotArr = !slotArr || slotArr.length !== slots ? [] : JSON.parse(slotArr);
    if (!slotArr.length) {
      for (let i = 0; i < slots; i++) {
        slotArr.push(false);
      }
    }
    setOpenSlots(slotArr);
  }, [slots]);

  useEffect(() => {
    localStorage.setItem(level, JSON.stringify(openSlots));
  }, [openSlots]);

  const spellLookupButton = !showResults
    ? <Button color="secondary" onClick={ loadSpellSearch }>See Library</Button>
    : <Button onClick={ () => setShow(false) }>Close</Button>;

  return (
    <Card>
      <HeaderBar>
        <Column>
          <h2>{ level } Level Spells</h2>
          <p><b>Modifier:</b> { mod } | <b>DC:</b> { 8 + +mod }</p>
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
      { spellList.map((spell, i) =>
        <ExpansionPanel key={ spell.name }>
          <ExpansionPanelSummary>{ spell.name }</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SpellDetail spell={ spell } />
          </ExpansionPanelDetails>
          { forgetSpell &&
            <ExpansionPanelActions>
              <Button onClick={ () => forgetSpell(spell) }
                variant="contained"
                color="secondary">Forget</Button>
            </ExpansionPanelActions>
          }
        </ExpansionPanel>
      )
      }

      {/* NEW SPELL LOOKUP */ }
      { showResults &&
        <>
          <HeaderBar>
            <h2>New Spells</h2>
          </HeaderBar>
          {
            spellSearchResult.map(spell =>
              <ExpansionPanel key={ spell.name }>
                <ExpansionPanelSummary>{ spell.name }</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <SpellDetail spell={ spell } />
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                  <Button variant="contained" color="secondary" onClick={ () => addSpell(spell) }>
                    Learn
                  </Button>
                </ExpansionPanelActions>
              </ExpansionPanel>
            )
          }
        </>
      }
      { addSpell && spellLookupButton }
    </Card >
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
  forgetSpell: PropTypes.func.isRequired,
  mod: PropTypes.string.isRequired,
};
