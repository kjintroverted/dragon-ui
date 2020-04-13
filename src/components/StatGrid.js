import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spacer, Row } from './CustomStyled';
import { TextField } from '@material-ui/core';
import { calculateModifier } from '../services/helper';

const StatGrid = ({ race, levelPoints, update }) => {

  const pointAllowance = 27 + levelPoints; // STANDARD FANTASY

  const [rawStats, updateRawStats] = useState({
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    cha: 8
  })
  const [stats, updateStats] = useState({})

  useEffect(() => updateStats({
    'str': rawStats.str + getBonus('str', race),
    'dex': rawStats.dex + getBonus('dex', race),
    'con': rawStats.con + getBonus('con', race),
    'int': rawStats.int + getBonus('int', race),
    'wis': rawStats.wis + getBonus('wis', race),
    'cha': rawStats.cha + getBonus('cha', race)
  }), [rawStats, race])

  function onChange(field) {
    return (e) => {
      updateRawStats({ ...rawStats, [field]: +e.target.value })
      update({ ...stats, [field]: +e.target.value + + getBonus(field, race) })
    }
  }

  function calculatePoints() {
    return Object.entries(rawStats).reduce((acc, [_, value]) => {
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
          value={ rawStats.str }
          onChange={ onChange('str') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Dexterity"
          value={ rawStats.dex }
          onChange={ onChange('dex') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Constitution"
          value={ rawStats.con }
          onChange={ onChange('con') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Intelligence"
          value={ rawStats.int }
          onChange={ onChange('int') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Wisdom"
          value={ rawStats.wis }
          onChange={ onChange('wis') }
        />
        <RawStat
          type="number"
          variant="outlined"
          label="Charisma"
          value={ rawStats.cha }
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
        <h2>{ stats.str }</h2>
        <h2>{ stats.dex }</h2>
        <h2>{ stats.con }</h2>
        <h2>{ stats.int }</h2>
        <h2>{ stats.wis }</h2>
        <h2>{ stats.cha }</h2>

        {/* MOD */ }
        <p>({ calculateModifier(stats.str) })</p>
        <p>({ calculateModifier(stats.dex) })</p>
        <p>({ calculateModifier(stats.con) })</p>
        <p>({ calculateModifier(stats.int) })</p>
        <p>({ calculateModifier(stats.wis) })</p>
        <p>({ calculateModifier(stats.cha) })</p>
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