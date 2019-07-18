import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const CharacterSheet = ({ character }) => (
  <SheetContainer>
    <h2>{ character.name }</h2>
  </SheetContainer>
);

export default CharacterSheet;

CharacterSheet.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
};

const SheetContainer = styled.div`
  display: grid;
`;
