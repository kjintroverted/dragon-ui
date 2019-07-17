import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@material-ui/core';
import styled from 'styled-components';
import {
  Card, HeaderBar, Spacer, ActionBar, Column, Row,
} from './CustomStyled';


function CharacterSummary({ character }) {
  return (
    <Card>
      <HeaderBar>
        <Column>
          <h4>{ character.name }</h4>
          <p>{ character.race } { character.class }</p>
        </Column>
        <Spacer />
        <ActionBar>
          <IconButton>
            <i className="material-icons">group_add</i>
          </IconButton>
        </ActionBar>
      </HeaderBar>
      <InfoRow>
        { character.level && <TextField variant="outlined" disabled label="Level" value={character.level} /> }
      </InfoRow>
    </Card>
  );
}

export default CharacterSummary;

CharacterSummary.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
};

const InfoRow = styled.div`
  display: flex;
  margin-top: 10px;
`;
