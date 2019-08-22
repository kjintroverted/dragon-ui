import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';
import { Card, HeaderBar, Column, } from './CustomStyled';
import dungeonService from '../services/dungeonService';

const Feats = ({ featIDs, level, update }) => {
  const [feats, setFeats] = useState([]);
  const [featSearchArr, setSearchArr] = useState([]);

  async function getAllFeats() {
    const results = await dungeonService.getFeats();
    setSearchArr(results.filter(feat => feat.level <= level));
  }

  function loadFeatSearch() {
    if (!featSearchArr.length) getAllFeats();
  }

  function add(id) {
    update([...featIDs, id])
  }

  function remove(i) {
    update([...featIDs.slice(0, i), ...featIDs.slice(i + 1)])
  }

  async function loadFeats(ids) {
    const results = await dungeonService.getFeats(ids);
    setFeats(results);
  }

  useEffect(() => {
    if (featIDs && featIDs.length) loadFeats(featIDs)
  }, [featIDs]);

  return (
    <Card>
      <HeaderBar>
        <h2>Feats and Abilities</h2>
      </HeaderBar>
      {
        feats.map(feat => (
          <Column key={ `feat-${ feat.id }` }>
            <h3>{ feat.name }</h3>
            {
              feat.desc.map(words => <p key={ `feat-${ feat.id }-desc.${ words.length }` }>{ words }</p>)
            }
            <Divider />
          </ Column>
        ))
      }
    </Card>
  );
};

export default Feats;

Feats.propTypes = {
  level: PropTypes.number.isRequired,
  featIDs: PropTypes.arrayOf(PropTypes.number).isRequired,
  update: PropTypes.func.isRequired,
};
