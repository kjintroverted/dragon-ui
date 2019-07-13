import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';


function Attributes({ character }) {
  return (
    <Container className="verticle card">
      { <div className="attribute"> Strength: <h4> { character.str } </h4> </div> }
      { <div className="attribute">Dexterity: <h4> { character.dex } </h4></div> }
      { <div className="attribute"> Intelligence: <h4> { character.intel } </h4></div> }
    </Container>
  );
}

export default Attributes;

Attributes.propTypes = {
  character: PropTypes.shape({
    dex: PropTypes.number,
    intel: PropTypes.number,
    str: PropTypes.number,
  }).isRequired,
};

const Container = styled.div`
  & .attribute {
    padding: 1em;
  }
`;
