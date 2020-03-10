import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spacer, Row } from './CustomStyled';
import { TextField } from '@material-ui/core';
import { calculateModifier } from '../services/helper';

const StatGrid = ({ race, levelPoints, update }) => {

  const pointAllowance = 27 + levelPoints; // STANDARD FANTASY

  const [stats, updateStats] = useState({
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    cha: 8
  })

  useEffect(() => update({
    'str': stats.str + getBonus('str', race),
    'dex': stats.dex + getBonus('dex', race),
    'con': stats.con + getBonus('con', race),
    'int': stats.int + getBonus('int', race),
    'wis': stats.wis + getBonus('wis', race),
    'cha': stats.cha + getBonus('cha', race)
  }), [stats, update, race])

  function onChange(field) {
    return (e) => {
      updateStats({ ...stats, [field]: +e.target.value })
    }
  }

  function calculatePoints() {
    return Object.entries(stats).reduce((acc, [_, value]) => {
      if (value <= 8) return acc;
      if (value <= 13) return acc + value - 8;
      else return acc + value - 8 + (value - 13);
    }, 0)
  }

  let points = pointAllowance - calculatePoints();
  const Ticker = styled.b`
    color: ${points > 10 ? 'green' : points > 0 ? 'orange' : 'red' };  
  `

  return (
    <Container>
      <Row>
        <Spacer />
        <Ticker>{ points } points left</Ticker>
      </Row>
      <Grid>

        {/* RAW */ }
        <RawStat
          type="number"
          variant="outlined"
          label="Strength"
          value={ stats.str }
          onChange={ onChange('str') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Dexterity"
          value={ stats.dex }
          onChange={ onChange('dex') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Constitution"
          value={ stats.con }
          onChange={ onChange('con') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Intelligence"
          value={ stats.int }
          onChange={ onChange('int') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Wisdom"
          value={ stats.wis }
          onChange={ onChange('wis') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Charisma"
          value={ stats.cha }
          onChange={ onChange('cha') }
        />

        {/* BONUS */ }
        <p>+{ getBonus('str', race) }</p>
        <p>+{ getBonus('dex', race) }</p>
        <p>+{ getBonus('con', race) }</p>
        <p>+{ getBonus('int', race) }</p>
        <p>+{ getBonus('wis', race) }</p>
        <p>+{ getBonus('cha', race) }</p>

        {/* FINAL */ }
        <h2>{ stats.str + getBonus('str', race) }</h2>
        <h2>{ stats.dex + getBonus('dex', race) }</h2>
        <h2>{ stats.con + getBonus('con', race) }</h2>
        <h2>{ stats.int + getBonus('int', race) }</h2>
        <h2>{ stats.wis + getBonus('wis', race) }</h2>
        <h2>{ stats.cha + getBonus('cha', race) }</h2>

        {/* MOD */ }
        <p>({ calculateModifier(stats.str + getBonus('str', race)) })</p>
        <p>({ calculateModifier(stats.dex + getBonus('dex', race)) })</p>
        <p>({ calculateModifier(stats.con + getBonus('con', race)) })</p>
        <p>({ calculateModifier(stats.int + getBonus('int', race)) })</p>
        <p>({ calculateModifier(stats.wis + getBonus('wis', race)) })</p>
        <p>({ calculateModifier(stats.cha + getBonus('cha', race)) })</p>
      </Grid>
    </Container>
  )
}

export default StatGrid;

function getBonus(s, race) {
  if (!race || !race.ability) return 0;
  let bonus = race.ability.find(a => a.name === s.toUpperCase())
  return bonus ? bonus.mod : 0;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  & {
    margin: 0px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-rows: 2fr repeat(3, 1fr);
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  justify-items: center;
`

const RawStat = styled(TextField)`
  & input {
    font-size: 1.3em;
    text-align: center;
  }
`