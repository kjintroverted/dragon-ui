import React, { useState, useEffect } from 'react'
import dungeonService from '../services/dungeonService'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import styled from 'styled-components'
import { Column, Row, RowCenter, Spacer } from '../components/CustomStyled'

const CharacterBuilder = () => {

  const [races, setRaces] = useState([])
  const [classes, setClasses] = useState([])
  const [character, updateCharacter] = useState({})

  function handleBackGround(field, infoField, opts) {
    return (e) => {
      let value = opts.find(r => r.id === e.target.value)
      let info = { ...character.info, [infoField]: value.id }
      updateCharacter({ ...character, [field]: value, info })
    }
  }

  useEffect(() => {
    (async function loadRaces() {
      let data = await dungeonService.getRaces()
      setRaces(data)
    })();
    (async function loadClasses() {
      let data = await dungeonService.getClasses()
      setClasses(data)
    })();
  }, [])

  return (
    <Builder>
      <Column>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Row>
              <b>{ character.race ? character.race.name : 'No Race Selected...' }</b>
              <Spacer />
              <p>{ character.race ? character.race.ability.map(bonus => `${ bonus.name }+${ bonus.mod } `) : '' }</p>
            </Row>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Column>
              {
                character.race &&
                <>
                  <Body><b>Speed.</b> { character.race.speed } feet per turn.</Body>
                  <Body><b>Size.</b> { character.race.sizeDesc }</Body>
                  <Body><b>Age.</b> { character.race.age }</Body>
                  <Body><b>Alignment.</b> { character.race.align }</Body>
                </>
              }
              <FormSelect
                value="Select Race"
                onChange={ handleBackGround('race', 'raceID', races) }
              >
                <option>Select Race</option>
                {
                  races.map(r => <option key={ `race-${ r.id }` } value={ r.id }>{ r.name }</option>)
                }
              </FormSelect>
            </Column>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary>{ character.class ? character.class.name : 'No Class Selected...' }</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormSelect onChange={ handleBackGround('class', 'classID', classes) }>
              <option>Select Class</option>
              {
                classes.map(r => <option key={ `class-${ r.id }` } value={ r.id }>{ r.name }</option>)
              }
            </FormSelect>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Column>
    </Builder >
  )
}

export default CharacterBuilder;

const FormSelect = styled.select`
  margin: 5px;
  border: none;
  background: none;
  border-bottom: black solid;
  font-size: 1em;
  height: 2em;
`

const Builder = styled.div`
  width: 90vw;
  align-self: center;
`

const Body = styled.p`
  margin: 0em 0em .5em 0em;
`