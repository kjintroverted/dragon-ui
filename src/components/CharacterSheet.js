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
    <WeaponsArea />
    <EquipmentArea />
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
  grid-gap: .625em;
  grid-template-columns: 18.75em minmax(auto, 15.625em) minmax(auto, 12.5em);
  grid-template-rows: auto 13em auto auto;
  grid-template-areas:
    "pro pro pro"
    "skill stat stat"
    "skill wpn eqp";

  @media screen and (max-width: 36em){
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
const WeaponsArea = styled.div`
  grid-area: wpn;
`;
const EquipmentArea = styled.div`
  grid-area: eqp;
`;
