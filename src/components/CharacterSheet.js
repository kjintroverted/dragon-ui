import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const CharacterSheet = ({ character }) => (
  <SheetContainer>
    <Profile />
    <Stats />
    <Skills />
    <Weapons />
    <Equipment />
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
  width: 100%;
  height: 100vh;
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    "pro pro pro"
    "skill stat stat"
    "skill stat stat"
    "skill stat stat"
    "skill stat stat"
    "skill wpn eqp"
    "skill wpn eqp";

  @media screen and (max-width: 450px){
    display: flex;
    flex-direction: column;
  }
`;

const Profile = styled.div`
  background: black;
  grid-area: pro;
`;
const Stats = styled.div`
  background: green;
  grid-area: stat;
`;
const Skills = styled.div`
  background: blue;
  grid-area: skill
`;
const Weapons = styled.div`
  background: red;
  grid-area: wpn;
`;
const Equipment = styled.div`
  background: yellow;
  grid-area: eqp;
`;
