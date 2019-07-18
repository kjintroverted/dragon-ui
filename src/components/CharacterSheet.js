import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Profile from './Profile';
import Attributes from './Attributes';
import Skills from './Skills';


const CharacterSheet = ({ character }) => (
  <SheetContainer>
    <ProfileArea>
      <Profile character={character} />
    </ProfileArea>
    <StatsArea>
      <Attributes character={character} />
    </StatsArea>
    <SkillsArea>
      <Skills character={character} />
    </SkillsArea>
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
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    "pro pro pro"
    "skill stat stat"
    "skill stat stat"
    "skill wpn eqp"
    "skill wpn eqp"
    "skill wpn eqp"
    "skill wpn eqp";

  @media screen and (max-width: 450px){
    display: flex;
    flex-direction: column;
  }
`;

const ProfileArea = styled.div`
  grid-area: pro;
`;
const StatsArea = styled.div`
  grid-area: stat;
`;
const SkillsArea = styled.div`
  grid-area: skill;
`;
const Weapons = styled.div`
  background: red;
  grid-area: wpn;
`;
const Equipment = styled.div`
  background: yellow;
  grid-area: eqp;
`;
