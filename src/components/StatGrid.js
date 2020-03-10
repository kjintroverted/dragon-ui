import React, { useState } from 'react';
import styled from 'styled-components';
import { Spacer, Row } from './CustomStyled';
import { TextField } from '@material-ui/core';
import { calculateModifier } from '../services/helper';

const StatGrid = ({ race }) => {

  const pointAllowance = 27; // STANDARD FANTASY

  const [stats, updateStats] = useState({
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    cha: 8
  })

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

  function getBonus(s) {
    if (!race || !race.ability) return 0;
    let bonus = race.ability.find(a => a.name === s.toUpperCase())
    return bonus ? bonus.mod : 0;
  }

  return (
    <Container>
      <Row>
        <Spacer />
        <p>{ pointAllowance - calculatePoints() } points left</p>
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
        <p>+{ getBonus('str') }</p>
        <p>+{ getBonus('dex') }</p>
        <p>+{ getBonus('con') }</p>
        <p>+{ getBonus('int') }</p>
        <p>+{ getBonus('wis') }</p>
        <p>+{ getBonus('cha') }</p>

        {/* FINAL */ }
        <p>{ stats.str + getBonus('str') }</p>
        <p>{ stats.dex + getBonus('dex') }</p>
        <p>{ stats.con + getBonus('con') }</p>
        <p>{ stats.int + getBonus('int') }</p>
        <p>{ stats.wis + getBonus('wis') }</p>
        <p>{ stats.cha + getBonus('cha') }</p>

        {/* MOD */ }
        <p>{ calculateModifier(stats.str + getBonus('str')) }</p>
        <p>{ calculateModifier(stats.dex + getBonus('dex')) }</p>
        <p>{ calculateModifier(stats.con + getBonus('con')) }</p>
        <p>{ calculateModifier(stats.int + getBonus('int')) }</p>
        <p>{ calculateModifier(stats.wis + getBonus('wis')) }</p>
        <p>{ calculateModifier(stats.cha + getBonus('cha')) }</p>
      </Grid>
    </Container>
  )
}

export default StatGrid;

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
  grid-template-rows: 1fr 2fr repeat(3, 1fr);
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