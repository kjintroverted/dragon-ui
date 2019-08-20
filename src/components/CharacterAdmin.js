import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import { Card, Row, HeaderBar } from './CustomStyled';

const CharacterAdmin = ({ character, update }) => {
  function remove(field, i) {
    return () => {
      character[field].splice(i, 1);
      update(character);
    };
  }

  return (
    <Card>
      <HeaderBar>
        <h2>Authorized Users</h2>
      </HeaderBar>
      <Row>
        {
          character.authUsers
          && character.authUsers.map((user, i) => (
            <Chip
              key={`user-${user}`}
              label={user}
              onDelete={remove('authUsers', i)}
              color="primary"
            />
          ))
        }
      </Row>
    </Card>
  );
};

export default CharacterAdmin;

CharacterAdmin.propTypes = {
  character: PropTypes.shape({
    authUsers: PropTypes.arrayOf(PropTypes.string),
    visibileTo: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  update: PropTypes.func.isRequired,
};
