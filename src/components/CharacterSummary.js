import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Card, HeaderBar, Spacer, ActionBar, Column, Row,
} from './CustomStyled';


function CharacterSummary({
  character, save, add, linkTo,
}) {
  return (
    <Card>
      <HeaderBar>
        <Column>
          <h4>{ character.name }</h4>
          <p>{ character.race } { character.class }</p>
        </Column>
        <Spacer />
        <ActionBar>
          { linkTo
            && <Link to={linkTo}>
              <IconButton>
                <i className="material-icons">fullscreen</i>
              </IconButton>
               </Link>
          }
          { add
            && <IconButton onClick={add}>
              <i className="material-icons">group_add</i>
               </IconButton>
          }
          { save
            && <IconButton onClick={save}>
              <i className="material-icons">save</i>
               </IconButton>
          }
        </ActionBar>
      </HeaderBar>
      <InfoRow>
        <TextField variant="outlined" disabled type="number" label="Level" value={character.level} />
        <TextField variant="outlined" disabled type="number" label="Hit Points" value={character.hp} />
        <TextField variant="outlined" disabled type="number" label="Initiative" value={character.initiative} />
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
  save: PropTypes.func,
  add: PropTypes.func,
  linkTo: PropTypes.string,
};

CharacterSummary.defaultProps = {
  save: null,
  add: null,
  linkTo: null,
};

const InfoRow = styled.div`
      display: flex;
      margin-top: 10px;
    `;
