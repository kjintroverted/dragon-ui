import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';


function Vitals({ character }) {
  return (
    <Container className="card">
      { <div className="attribute"> Armor: <h4> { character.armor } </h4> </div> }
      { <div className="attribute">Iniative: <h4> { character.iniative } </h4></div> }
      { <div className="attribute"> Speed: <h4> { character.speed } </h4></div> }
      { <div className="hitpoints"> Hit Points: <h2> { character.hp } </h2></div> }
    </Container>
  );
}

export default Vitals;

Vitals.propTypes = {
  character: PropTypes.shape({
    armor: PropTypes.number,
    hp: PropTypes.number,
    iniative: PropTypes.number,
    speed: PropTypes.number,
  }).isRequired,
};

const Container = styled.div`
  max-width: 20em;
  flex-wrap: wrap;
  & .attribute {
    padding: 1em;
  }
  & .hitpoints {
    font-size:1.5em;
    align-content:center;
  }
`;
