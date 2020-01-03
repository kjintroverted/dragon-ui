import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Row } from './CustomStyled';


function PartyCard({ name, party }) {
  const [display, setDisplay] = useState(true);
  function removeParty() {
    const parties = JSON.parse(localStorage.getItem('parties'));
    delete parties[name];
    localStorage.setItem('parties', JSON.stringify(parties));
    setDisplay(false);
  }
  // localStorage doesn't trigger a rerender
  if (display) {
    return (
          <Card>
              <Row style={{ justifyContent: 'space-between' }}>
                <Link to={`/character?id=${party.join()}`}>
                    <h3>{name} Party </h3>
                </Link>
                <IconButton style={{ width: '1rem' }} color="secondary" onClick={removeParty}>
                    <i className="material-icons">delete</i>
                </IconButton>
              </Row>
          </Card>
    );
  }
  return null;
}

export default PartyCard;
