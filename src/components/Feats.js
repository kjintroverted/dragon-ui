import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  IconButton,
  TextField,
  Button,
  ExpansionPanelActions
} from '@material-ui/core';
import { Card, HeaderBar, Spacer, ActionBar, Row, Column } from './CustomStyled';
import dungeonService from '../services/dungeonService';

const Feats = ({ featIDs, traits, update, disabled }) => {
  const [feats, setFeats] = useState([]);
  const [featSearchArr, setSearchArr] = useState([]);
  const [searchQuery, setQuery] = useState("");
  const [featSearchResults, setSearchResults] = useState([]);
  const [adding, setIsAdding] = useState(false);

  function updateSearchResults() {
    setSearchResults(featSearchArr.filter(feat => feat.name.toLowerCase().indexOf(searchQuery) !== -1))
  }

  function add(url) {
    const parsed = url.split('/');
    update([...featIDs, +parsed[parsed.length - 1]])
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
    else setFeats([])
  }, [featIDs]);

  useEffect(() => {
    if (adding) {
      if (!featSearchArr.length) (async function getAllFeats() {
        const results = await dungeonService.getFeats();
        setSearchArr(results);
      })()
    }
    else {
      setQuery("")
      setSearchResults([])
    }
  }, [adding, featSearchArr.length]);

  return (
    <Card>
      <HeaderBar>
        <h2>Abilities</h2>
        <Spacer />
        <ActionBar>
          { !disabled &&
            <IconButton onClick={ () => setIsAdding(!adding) }>
              <i className='material-icons'>{ adding ? 'done' : 'add' }</i>
            </IconButton>
          }
          { adding &&
            <>
              <IconButton disabled={ searchQuery.length < 3 } onClick={ updateSearchResults }>
                <i className='material-icons'>search</i>
              </IconButton>
              <TextField
                label="Search"
                value={ searchQuery || '' }
                onChange={ e => setQuery(e.target.value) } />
            </>
          }
        </ActionBar>
      </HeaderBar>
      { // ADD NEW FEAT
        adding && !!featSearchArr.length &&
        <Column>
          <Row>
            {
              featSearchResults.map(feat => (
                <Card key={ `new-feat-${ feat.name.replace(' ', '-') }` }>
                  <Row>
                    <p>{ feat.name }</p>
                    <IconButton color="secondary" onClick={ () => add(feat.url) }>
                      <i className='material-icons'>add</i>
                    </IconButton>
                  </Row>
                </Card>
              ))
            }
          </Row>
        </Column>
      }
      { // DISPLAY TRAITS
        traits.map((trait) => (
          <ExpansionPanel key={ `trait-${ trait.name.replace(' ', '-') }` }>
            <ExpansionPanelSummary>{ trait.name }</ExpansionPanelSummary>
            <ExpansionPanelDetails>
              { trait.desc }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))
      }
      { // DISPLAY FEATS
        feats.map((feat, i) => (
          <ExpansionPanel key={ `feat-${ feat.name.replace(' ', '-') }` }>
            <ExpansionPanelSummary>{ feat.name }</ExpansionPanelSummary>
            {
              feat.desc.map(words => {
                return (
                  <ExpansionPanelDetails
                    key={ `feat-${ feat.name.replace(' ', '-') }-desc.${ words.length }` }>
                    { words }
                  </ExpansionPanelDetails>
                )
              })
            }
            { !disabled &&
              <ExpansionPanelActions>
                <Button onClick={ () => remove(i) }
                  variant="contained"
                  color="secondary">Forget</Button>
              </ExpansionPanelActions>
            }
          </ExpansionPanel>
        ))
      }
    </Card>
  );
};

export default Feats;

Feats.propTypes = {
  featIDs: PropTypes.arrayOf(PropTypes.number).isRequired,
  traits: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string
  })).isRequired,
  update: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
