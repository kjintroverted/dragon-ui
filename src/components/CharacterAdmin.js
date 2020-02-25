import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Chip, TextField, IconButton } from '@material-ui/core';
import {
  Card, Row, HeaderBar,
} from './CustomStyled';

const CharacterAdmin = ({ character, update }) => {
  const [values, setValues] = useState({});

  function onChange(field) {
    return e => setValues({ ...values, [field]: e.target.value });
  }

  function add(field, valueField) {
    return () => {
      const array = character.info[field] || [];
      update({ ...character, info: { ...character.info, [field]: [...array, values[valueField]] } });
      setValues({ ...values, [valueField]: '' });
    };
  }

  function remove(field, i) {
    return () => {
      const array = [
        ...character.info[field].slice(0, i),
        ...character.info[field].slice(i + 1),
      ];
      update({ ...character, info: { ...character.info, [field]: array } });
    };
  }

  return (
    <Card>
      <HeaderBar style={{ marginTop: '2.5rem' }}>
        <h2>Authorized Users</h2>
      </HeaderBar>
      <Row>
        {character.info.authUsers
          && character.info.authUsers.map((user, i) => (
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
