import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';


function CharacterBackground(props) {
  return (
    <Container className="card">
      { props.character.name && <div className="attribute"> Name: <h4> { props.character.name } </h4> </div> }
      { props.character.race && <div className="attribute">Race: <h4> { props.character.race } </h4></div> }
      { props.character.class && <div className="attribute"> Class: <h4> { props.character.class } </h4></div> }
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
