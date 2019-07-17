import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './CustomStyled';


function CharacterSummary({ character }) {
  return (
    <Card>
      { character.name && <div className="attribute"> Name: <h4> { character.name } </h4> </div> }
      { character.race && <div className="attribute">Race: <h4> { character.race } </h4></div> }
      { character.class && <div className="attribute"> Class: <h4> { character.class } </h4></div> }
    </Card>
  );
}

export default CharacterSummary;

CharacterSummary.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
};
