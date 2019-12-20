import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpellPage from '../components/SpellPage';
import dungeonService from '../services/dungeonService';

const SpellBook = ({
  spells, classInfo, level, mod, update, disabled
}) => {

  const [spellDetails, setSpellDetails] = useState([]);

  function addSpell(spell) {
    update([...spells, spell.slug]);
  }

  function removeSpell(spell) {
    const i = spells.findIndex(s => s === spell.slug)
    update([...spells.slice(0, i), ...spells.slice(i + 1)]);
  }

  const cantrips = (
    <SpellPage
      level="Cantrip"
      ability={ classInfo.spellcasting_ability }
      slots={ 0 }
      spells={ spellDetails || [] }
      addSpell={ disabled ? null : addSpell }
      forgetSpell={ disabled ? null : removeSpell }
      mod={ mod }
    />);

  const spellContainers = classInfo.info.Level.map((val, i) => {
    if (i > level - 1 || !classInfo.info[val][level - 1]) return null;
    return (
      <SpellPage
        key={ `${ val }-level-spells` }
        level={ val }
        ability={ classInfo.spellcasting_ability }
        slots={ +classInfo.info[val][level - 1] }
        spells={ spellDetails || [] }
        addSpell={ disabled ? null : addSpell }
        forgetSpell={ disabled ? null : removeSpell }
        mod={ mod }
      />
    );
  });

  async function loadSpells(slugs) {
    const result = await dungeonService.getSpells(slugs);

    setSpellDetails(result);
  }

  useEffect(() => {
    loadSpells(spells);
  }, [spells]);

  return (
    <>
      { cantrips }
      { spellContainers }
    </>
  );
};

export default SpellBook;

SpellBook.propTypes = {
  spells: PropTypes.arrayOf(PropTypes.string).isRequired,
  classInfo: PropTypes.shape({
    spellcasting_ability: PropTypes.string,
    info: PropTypes.shape({
      '1st': PropTypes.arrayOf(PropTypes.string),
      '2nd': PropTypes.arrayOf(PropTypes.string),
      '3rd': PropTypes.arrayOf(PropTypes.string),
      '4th': PropTypes.arrayOf(PropTypes.string),
      '5th': PropTypes.arrayOf(PropTypes.string),
      '6th': PropTypes.arrayOf(PropTypes.string),
      '7th': PropTypes.arrayOf(PropTypes.string),
      '8th': PropTypes.arrayOf(PropTypes.string),
      '9th': PropTypes.arrayOf(PropTypes.string),
      'Cantrips Known': PropTypes.arrayOf(PropTypes.string),
      Level: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  level: PropTypes.number.isRequired,
  mod: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
