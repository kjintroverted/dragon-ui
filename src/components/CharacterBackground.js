import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';


function CharacterBackground({ character }) {
  return (
    <Container className="card">
      { character.name && <div className="attribute"> Name: <h4> { character.name } </h4> </div> }
      { character.race && <div className="attribute">Race: <h4> { character.race } </h4></div> }
      { character.class && <div className="attribute"> Class: <h4> { character.class } </h4></div> }
    </Container>
  );
}

export default CharacterBackground;

CharacterBackground.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
};

const Container = styled.div`
  & .attribute {
    padding: 1em;
  }
`;
