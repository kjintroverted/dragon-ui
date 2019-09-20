import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Chip, TextField, IconButton } from '@material-ui/core';
import { Card, Row, HeaderBar } from './CustomStyled';

const CharacterAdmin = ({ character, update }) => {
  const [values, setValues] = useState({});

  function onChange(field) {
    return e => setValues({ ...values, [field]: e.target.value });
  }

  function add(field, valueField) {
    return () => {
      const array = character[field] || [];
      update({ ...character, [field]: [...array, values[valueField]] });
      setValues({ ...values, [valueField]: '' });
    };
  }

  function remove(field, i) {
    return () => {
      const array = [
        ...character[field].slice(0, i),
        ...character[field].slice(i + 1),
      ];
      update({ ...character, [field]: array });
    };
  }

  return (
    <Card>
      <HeaderBar>
        <h2>Authorized Users</h2>
      </HeaderBar>
      <Row>
        {character.authUsers
          && character.authUsers.map((user, i) => (
            <Chip
              key={`user-${user}`}
              label={user}
              onDelete={remove('authUsers', i)}
              color="primary"
            />
          ))}
        <TextField
          label="New Email"
          value={values.authEmail || ''}
          onChange={onChange('authEmail')}
        />
        <IconButton color="primary" onClick={add('authUsers', 'authEmail')}>
          <i className="material-icons">done</i>
        </IconButton>
      </Row>

      <HeaderBar>
        <h2>Read-Only Users</h2>
      </HeaderBar>
      <Row>
        {character.visibleTo
          && character.visibleTo.map((user, i) => (
            <Chip
              key={`user-${user}`}
              label={user}
              onDelete={remove('visibleTo', i)}
              color="primary"
            />
          ))}
        <TextField
          label="New Email"
          value={values.readEmail || ''}
          onChange={onChange('readEmail')}
        />
        <IconButton color="primary" onClick={add('visibleTo', 'readEmail')}>
          <i className="material-icons">done</i>
        </IconButton>
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
