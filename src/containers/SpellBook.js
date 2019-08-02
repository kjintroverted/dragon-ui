import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpellPage from '../components/SpellPage';

const SpellBook = ({ classInfo, level }) => {
  const cantrips = (
    <SpellPage
      level="Cantrip"
      slots={0}
      spells={[]}
      addSpell={console.log}
    />);

  const spells = classInfo.Level.map((val, i) => {
    if (i > level - 1 || !classInfo[val][i]) return null;
    return (
      <SpellPage
        key={`${val}-level-spells`}
        level={val}
        slots={+classInfo[val][i]}
        spells={[]}
        addSpell={console.log}
      />
    );
  });

  return (
    <>
      { cantrips }
      { spells }
    </>
  );
};

export default SpellBook;

SpellBook.propTypes = {
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
};
