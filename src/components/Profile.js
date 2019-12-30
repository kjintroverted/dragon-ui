import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Badge, TextField, Chip, IconButton,
} from '@material-ui/core';
import {
  Card, Column, Row, BasicBox, Spacer, HeaderBar,
} from './CustomStyled';
import { calculateModifier } from '../services/helper';

const Profile = ({
  character, hitDice, update, disabled, editing,
}) => {
  const [values, setValues] = useState({});

  function onValueChange(field) {
    return e => setValues({ ...values, [field]: e.target.value });
  }

  function onChange(field, numeric) {
    return (e) => {
      const val = numeric ? +e.target.value : e.target.value;
      update({ ...character, [field]: val });
    };
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
      <Row style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Column>
          { !editing
            ? <h2 style={{ margin: 0 }}>{ character.name }</h2>
            : <TextField
              label="Name"
              value={character.name}
              onChange={onChange('name')}
            />
          }
          <p style={{ margin: 0 }}>{ character.race } { character.class }</p>
        </Column>
        <Spacer />
        <Badge badgeContent={`+${character.proBonus}`} color="secondary">
          <BasicBox>
            { !editing
              ? <TextField
                variant="outlined"
                disabled
                type="number"
                label="Level"
                value={character.level}
              />
              : <TextField
                variant="outlined"
                type="number"
                label="XP"
                value={character.xp}
                onChange={onChange('xp', true)}
              />
            }
          </BasicBox>
        </Badge>
        <BasicBox>
          { !editing
            ? <TextField
              variant="outlined"
              disabled={disabled}
              type="number"
              label={`HP/${character.maxHP}`}
              value={character.hp}
              helperText={`${hitDice}`}
              onChange={onChange('hp', true)}
            />
            : <TextField
              variant="outlined"
              disabled={disabled}
              type="number"
              label="Max HP"
              value={character.maxHP}
              helperText={`${hitDice}`}
              onChange={onChange('maxHP', true)}
            />
          }
        </BasicBox>
        <BasicBox>
          <TextField
            variant="outlined"
            disabled={!editing}
            type="number"
            label="AC"
            value={character.armor}
            onChange={onChange('armor', true)}
          />
        </BasicBox>
        <BasicBox>
          <TextField
            variant="outlined"
            disabled={!editing}
            type="number"
            label="Speed"
            value={character.speed}
            onChange={onChange('speed', true)}
          />
        </BasicBox>
        <Badge badgeContent={calculateModifier(character.dex)} color="secondary">
          <BasicBox>
            <TextField
              variant="outlined"
              disabled={disabled}
              type="number"
              label="Init"
              value={character.initiative || ''}
              onChange={onChange('initiative', true)}
            />
          </BasicBox>
        </Badge>
      </Row>
      {/* LANGUAGES */ }
      { editing && !disabled
        // ADD NEW LANGUAGES
        ? <>
          <HeaderBar style={{ marginTop: '1em' }}>
            Known Languages
          </HeaderBar>
          <Row>
            { character.languages
              && character.languages.map((lang, i) => (
                <Chip
                  key={`pro-${lang}`}
                  label={lang}
                  onDelete={editing && !disabled ? remove('languages', i) : null}
                  color="primary"
                />
              )) }

            <TextField
              label="New Language"
              value={values.newLang || ''}
              onChange={onValueChange('newLang')}
            />
            <IconButton color="primary" onClick={add('languages', 'newLang')}>
              <i className="material-icons">done</i>
            </IconButton>
          </Row>
          </>
        // DISPLAY LANGUAGES/TOOLS AND SAVING THROWS
        : <Row style={{ justifyContent: 'space-between' }}>
          <Column>
            <Info><b>Known Languages:</b> { character.languages && character.languages.length ? character.languages.join() : <i>none</i> }</Info>
            <Info><b>Tools Proficiencies:</b> { character.proTools && character.proTools.length ? character.proTools.join() : <i>none</i> }</Info>
            <Info><b>Passive Perception:</b> {10 + parseInt(calculateModifier(character.wis))} </Info>

          </Column>
          </Row>
      }
      {/* TOOLS */ }
      { editing && !disabled
        // ADD NEW TOOLS
        && <>
          <HeaderBar style={{ marginTop: '1em' }}>
            Tool Proficiencies
          </HeaderBar>
          <Row>
            { character.proTools
              && character.proTools.map((tool, i) => (
                <Chip
                  key={`pro-${tool}`}
                  label={tool}
                  onDelete={editing && !disabled ? remove('proTools', i) : null}
                  color="primary"
                />
              )) }

            <TextField
              label="New Tool"
              value={values.newTool || ''}
              onChange={onValueChange('newTool')}
            />
            <IconButton color="primary" onClick={add('proTools', 'newTool')}>
              <i className="material-icons">done</i>
            </IconButton>
          </Row>
           </>
      }
    </Card>
  );
};

export default Profile;

Profile.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    race: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
  hitDice: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
};

const Info = styled.p`
  margin: 3px 0px;
  font-size: .8em;
`;
