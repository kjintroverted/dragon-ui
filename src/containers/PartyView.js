import React, { useState, useEffect } from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Fab, Button } from "@material-ui/core";
import DungeonService from "../services/dungeonService";
import {
  SideBar,
  SideBarToggle,
  ContentWithSideBar,
  RowCenter
} from "../components/CustomStyled";
import CharacterSummary from "../components/CharacterSummary";
import CharacterSheet from "./CharacterSheet";

function PartyView({ location }) {
  const [sidebar, setSidebar] = useState(false);
  const [idList, setIDList] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [focus, setFocus] = useState(null);

  function clearInitiative() {
    const { email } = firebase.auth().currentUser;
    characters
      .forEach(async character => {
        const { authorized } = await DungeonService.checkUserAuth(character.id, email)
        if (authorized) DungeonService.saveCharacter({ ...character, initiative: null })
      })
  }

  useEffect(() => {
    const ids = location.search.split("id=")[1].split(",");
    setIDList(ids);
    const socket = DungeonService.watchCharacters(ids);
    socket.onmessage = event => {
      const updatedCharacters = JSON.parse(event.data).sort((a, b) => {
        if (!a.initiative) {
          if (!b.initiative) return 0;
          return 1;
        }
        if (!b.initiative) return -1;
        return b.initiative - a.initiative;
      });
      setCharacters(updatedCharacters);
    };

    return () => socket.close();
  }, [location.search]);

  useEffect(() => {
    const id = !focus ? idList[0] : focus.id || idList[0];
    if (!id) return;
    setFocus(characters.find(c => c.id === id));
  }, [characters, idList, focus]);

  if (!focus) return null;

  return (
    <ContentWithSideBar>
      <Content>

        <RowCenter>
          <CharacterSheet characterData={ focus } />
        </RowCenter>
        { characters.length > 1 && (
          <>
            <SideBar className={ sidebar ? "open" : "" }>
              <Button color="secondary" onClick={ clearInitiative }>Clear Initiative</Button>
              <SideContainer>
                { characters.map(character => (
                  <CharacterSummary
                    key={ character.id }
                    character={ character }
                    open={ () => setFocus(character) }
                    highlight={ focus.id === character.id }
                  />
                )) }
              </SideContainer>
            </SideBar>
            <SideBarToggle>
              <Fab color='secondary' onClick={ () => setSidebar(!sidebar) }>
                <i className='material-icons'>{ sidebar ? "close" : "group" }</i>
              </Fab>
            </SideBarToggle>
          </>
        ) }
      </Content>
    </ContentWithSideBar>
  );
}

PartyView.propTypes = {
  location: PropTypes.object.isRequired
};

export default PartyView;

const SideContainer = styled.div`
  margin-bottom: 4em;
`;

const Content = styled.div`
  margin-bottom: 4em;
`;
