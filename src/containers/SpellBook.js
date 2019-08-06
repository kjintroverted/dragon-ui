import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpellPage from '../components/SpellPage';
import dungeonService from '../services/dungeonService';

const SpellBook = ({
  spells, classInfo, level, update,
}) => {
  const [spellDetails, setSpellDetails] = useState([]);

  function addSpell(spell) {
    update([...spells, spell.slug]);
  }

  const cantrips = (
    <SpellPage
      level="Cantrip"
      slots={0}
      spells={spellDetails || []}
      addSpell={addSpell}
    />);

  const spellContainers = classInfo.Level.map((val, i) => {
    if (i > level - 1 || !classInfo[val][i]) return null;
    return (
      <SpellPage
        key={`${val}-level-spells`}
        level={val}
        slots={+classInfo[val][i + 1]}
        spells={spellDetails || []}
        addSpell={addSpell}
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
  update: PropTypes.func.isRequired,
};
