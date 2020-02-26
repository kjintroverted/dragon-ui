import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Fab, Button, TextField, Card, CircularProgress, IconButton,
} from '@material-ui/core';
import DungeonService from '../services/dungeonService';
import {
  SideBar,
  SideBarToggle,
  ContentWithSideBar,
  RowCenter,
  Row,
  ProgressContainer,
  Spacer,
} from '../components/CustomStyled';
import CharacterSummary from '../components/CharacterSummary';
import CharacterSheet from './CharacterSheet';

function PartyView({ location }) {
  const [sidebar, setSidebar] = useState(false);
  const [idList, setIDList] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [focus, setFocus] = useState(null);
  const [partyName, setPartyName] = useState(''); // Controls the Naming of a new Party
  const [existingParty, setExistingParty] = useState(false); // Toggles form or display of existing

  function clearInitiative() {
    const { email } = firebase.auth().currentUser;
    characters
      .forEach(async (character) => {
        const { authorized } = await DungeonService.checkUserAuth(character.id, email);
        if (authorized) DungeonService.saveCharacter({ ...character, initiative: null });
      });
  }

  function longRest() {
    const { email } = firebase.auth().currentUser;
    characters
      .forEach(async (character) => {
        const { authorized } = await DungeonService.checkUserAuth(character.id, email);
        if (authorized) DungeonService.saveCharacter({ ...character, hp: character.maxHP });
      });
  }

  async function saveParty(event) {
    event.preventDefault();
    let parties = localStorage.getItem('parties');
    parties = parties ? JSON.parse(parties) : [];
    const characterIds = characters.map(character => character.id);
    const party = {
      name: partyName,
      members: characterIds,
    };
    parties.push(party);
    await localStorage.setItem('parties', JSON.stringify(parties));
    setExistingParty(true);
  }

  useEffect(() => {
    const ids = location.search.split('id=')[1].split(',');
    setIDList(ids);
    const selected = localStorage.getItem('selected');
    if (selected) {
      setPartyName(selected);
      setExistingParty(true);
    }
    async function fetchCharactersByOwner() {
      const owned = await DungeonService.getCharactersByOwner();
      setCharacters(owned);
    }
    fetchCharactersByOwner();
    // const socket = DungeonService.watchCharacters(ids);
    // socket.onmessage = (event) => {
    //   const updatedCharacters = JSON.parse(event.data).sort((a, b) => {
    //     if (!a.initiative) {
    //       if (!b.initiative) return 0;
    //       return 1;
    //     }
    //     if (!b.initiative) return -1;
    //     return b.initiative - a.initiative;
    //   });
    //   setCharacters(updatedCharacters);
    // };

    // return () => socket.close();
  }, [location.search]);

  useEffect(() => {
    const id = !focus ? idList[0] : focus.info.id || idList[0];
    if (!id || (focus && focus.info.id === id)) return;
    setFocus(characters.find(c => `${c.info.id}` === id));
  }, [characters, idList, focus]);
  if (characters.length === 0 || !focus) {
    return (
      <ProgressContainer>
        <CircularProgress style={{ justifySelf: 'center' }} />
      </ProgressContainer>
    );
  }
  return (
    <ContentWithSideBar>
      <Content>
        <RowCenter>
          <CharacterSheet characterData={focus} />
        </RowCenter>
        { characters.length > 1 && (
          <>
            <SideBar className={sidebar ? 'open' : ''}>
              <Card style={{ margin: '.25rem', marginTop: '2rem' }}>
                <PartyActions>
                {existingParty ? <h2>{partyName}</h2>
                  : <form>
                      <Row>
                          <TextField onChange={(event) => { setPartyName(event.target.value); }} label="PartyName" />
                          <Spacer />
                          {partyName.length > 0
                          && <IconButton onClick={saveParty} color="primary">
                            <i className="material-icons">save</i>
                             </IconButton>
                            }
                      </Row>
                    </form>
                    }
                    <Row style={{ justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <Button variant="contained" color="primary" onClick={longRest}>Long Rest</Button>
                      <Button variant="contained" color="secondary" onClick={clearInitiative}>Clear Initiative</Button>
                    </Row>
                </PartyActions>
              </Card>
              <SideContainer>
                { characters.map(character => (
                  <CharacterSummary
                    key={character.info.id}
                    character={character}
                    open={() => setFocus(character)}
                    highlight={focus.info.id === character.info.id}
                  />
                )) }
              </SideContainer>
            </SideBar>
            <SideBarToggle>
              <Fab color="secondary" onClick={() => setSidebar(!sidebar)}>
                <i className="material-icons">{ sidebar ? 'close' : 'group' }</i>
              </Fab>
            </SideBarToggle>
          </>
        ) }
      </Content>
    </ContentWithSideBar>
  );
}

PartyView.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PartyView;

const PartyActions = styled.div`
  margin: 1rem;
`;

const SideContainer = styled.div`
  margin-bottom: 4em;
`;

const Content = styled.div`
  margin-bottom: 4em;
`;
