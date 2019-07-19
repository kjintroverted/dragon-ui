import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fab } from '@material-ui/core';
import Profile from './Profile';
import Attributes from './Attributes';
import Skills from './Skills';
import { TopAnchor } from './CustomStyled';
import dungeonService from '../services/dungeonService';


const CharacterSheet = ({ data }) => {
  const [character, updateCharacter] = useState(data);
  const [isDirty, setDirty] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  function update(charUpdates) {
    setDirty(true);
    updateCharacter(charUpdates);
  }

  async function save() {
    setDirty(false);
    const success = await dungeonService.saveCharacter(character);
    if (!success) setDirty(true);
  }

  async function checkAuthorized(user) {
    const result = await dungeonService.checkUserAuth(character.id, user.email);
    console.log('authorized:', result.authorized);
    setAuthorized(result.authorized);
  }

  useEffect(() => {
    checkAuthorized(firebase.auth().currentUser);
  }, [data]);

  return (
    <SheetContainer>
      { isDirty
        && <TopAnchor>
          <Fab color="secondary" size="small" onClick={ save }>
            <i className="material-icons">done</i>
          </Fab>
        </TopAnchor>
      }
      <ProfileArea>
        <Profile character={ character } update={ update } />
      </ProfileArea>
      <StatsArea>
        <Attributes character={ character } update={ update } />
      </StatsArea>
      <SkillsArea>
        <Skills character={ character } />
      </SkillsArea>
      <WeaponsArea />
      <EquipmentArea />
    </SheetContainer>
  );
};

export default CharacterSheet;

CharacterSheet.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
};

const SheetContainer = styled.div`
  position: relative;
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
