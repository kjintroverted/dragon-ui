import React from 'react';
import PropTypes from 'prop-types';

const SpellBook = ({ classInfo, level }) => {
  const spells = classInfo.Level.map((val, i) => {
    if (i > level - 1 || !classInfo[val][i]) return null;
    return (
      <p key={val}>{ classInfo[val][i] } { val } Level Spell Slots</p>
    );
  });
  return (
    <>
      <h2>SpellBook</h2>
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
