import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fab } from '@material-ui/core';
import Profile from '../components/Profile';
import Attributes from '../components/Attributes';
import Skills from '../components/Skills';
import { TopAnchor } from '../components/CustomStyled';
import dungeonService from '../services/dungeonService';
import Weapons from '../components/Weapons';
import Inventory from '../components/Inventory';
import SpellBook from './SpellBook';


const CharacterSheet = ({ characterData }) => {
  const [character, updateCharacter] = useState(characterData);
  const [isDirty, setDirty] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [classInfo, setClassInfo] = useState(false);

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
    if (!character) return;
    const result = await dungeonService.checkUserAuth(character.id, user.email);
    setAuthorized(result.authorized);
  }

  async function getClassInfo(className) {
    if (!className) return;
    const result = await dungeonService.getClass(className);
    setClassInfo(result);
  }

  useEffect(() => {
    updateCharacter(characterData);
  }, [characterData]);

  useEffect(() => {
    checkAuthorized(firebase.auth().currentUser);
    getClassInfo(character.class);
  }, [character]);

  return (
    <SheetContainer>
      { isDirty
        && <TopAnchor>
          <Fab color="secondary" size="small" onClick={save}>
            <i className="material-icons">done</i>
          </Fab>
           </TopAnchor>
      }
      <ProfileArea>
        <Profile
          character={character}
          hitDice={classInfo.hit_dice || ''}
          update={update}
          disabled={!authorized}
          editing={editMode}
        />
      </ProfileArea>
      <StatsArea>
        <Attributes
          character={character}
          saves={classInfo.prof_saving_throws || ''}
          update={update}
          disabled={!authorized}
        />
      </StatsArea>
      <SkillsArea>
        <Skills character={character} />
      </SkillsArea>
      <WeaponsArea>
        <Weapons
          disabled={!authorized}
          proWeapons={classInfo.prof_weapons || ''}
          weaponList={character.weapons || []}
          dex={character.dex}
          str={character.str}
          proBonus={character.proBonus}
          update={weapons => update({ ...character, weapons })}
        />
      </WeaponsArea>
      <EquipmentArea>
        <Inventory
          disabled={!authorized}
          itemList={character.inventory || []}
          gold={character.gold}
          update={(gold, inventory) => update({ ...character, gold, inventory })}
        />
      </EquipmentArea>
      <Misc>
        { classInfo && classInfo.spellcasting_ability
          && <SpellBook
            classInfo={classInfo.info}
            level={character.level}
            spells={character.spells || []}
            update={spells => update({ ...character, spells })}
          />
        }
      </Misc>
    </SheetContainer>
  );
};

export default CharacterSheet;

CharacterSheet.propTypes = {
  characterData: PropTypes.shape({
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
    grid-template-rows: auto 14.5em auto auto auto;
    grid-template-areas:
      "pro pro pro"
      "skill stat stat"
      "skill wpn wpn"
      "skill eqp eqp"
      "etc etc etc";
  
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
const Misc = styled.div`
    grid-area: etc;
    display: flex;
    flex-direction: column;
  `;
