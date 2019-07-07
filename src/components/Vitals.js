import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

function Vitals({ character }) {
  return (
    <Container>
        { character.armor && <div className="attribute"> Armor Class: <h4> { character.armor } </h4> </div> }
        { character.iniative && <div className="attribute">Iniative: <h4> { character.iniative } </h4></div> }
        { character.speed && <div className="attribute"> Speed: <h4> { character.speed } </h4></div> }
    </Container>
  );
}

export default Vitals;

const Container = styled.div`
  & .attribute {
    padding: 1em;
  }
`;
