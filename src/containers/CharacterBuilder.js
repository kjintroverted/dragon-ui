import React, { useState, useEffect } from 'react'
import dungeonService from '../services/dungeonService'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField } from '@material-ui/core'
import styled from 'styled-components'
import { Column, Row, Spacer } from '../components/CustomStyled'
import StatGrid from '../components/StatGrid'

const CharacterBuilder = () => {

  const [races, setRaces] = useState([])
  const [classes, setClasses] = useState([])
  const [bgList, setBGList] = useState([])
  const [character, updateCharacter] = useState({})

  function handleInfo(field) {
    return (e) => {
      let info = { ...character.info, [field]: e.target.value }
      updateCharacter({ ...character, info })
    }
  }

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
    (async function loadBackgrounds() {
      let data = await dungeonService.getBackgrounds()
      setBGList(data.sort((a, b) => a.name.localeCompare(b.name)))
    })();
  }, [])

  return (
    <Builder>
      <Column>
        <TextField
          variant="outlined"
          label="Name"
          onChange={ handleInfo('name') }
        />
        {/* RACE SELECT  */ }
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Row>
              <b>{ character.race ? character.race.name : 'No Race Selected...' }</b>
              <Spacer />
              <p>{ character.race ? character.race.ability.reduce((acc, bonus) => acc + `${ bonus.name }+${ bonus.mod } `, 'Boost: ') : '' }</p>
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
                value=""
                onChange={ handleBackGround('race', 'raceID', races) }
              >
                <option>{ character.race ? 'Change Race' : 'Select Race' }</option>
                {
                  races.map(r => <option key={ `race-${ r.id }` } value={ r.id }>{ r.name }</option>)
                }
              </FormSelect>
            </Column>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* CLASS SELECT */ }
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Row>
              <b>{ character.class ? character.class.name : 'No Class Selected...' }</b>
              <Spacer />
              <p>{ character.class ? character.class.proSave.reduce((acc, bonus) => acc + `${ bonus } `, 'Saves: ') : '' }</p>
            </Row>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Column>
              {
                character.class &&
                <>
                  <Body><b>Hit Dice.</b> { character.class.hitDice }</Body>
                  <Body><b>Armor Proficiencies.</b> <Capital>{ character.class.proArmor ? character.class.proArmor.join(", ") : "None." }</Capital></Body>
                  <Body><b>Weapon Proficiencies.</b> <Capital>{ character.class.proWeapon ? character.class.proWeapon.join(", ") : "None." }</Capital></Body>
                  <Body><b>Tool Proficiencies.</b> <Capital>{ character.class.proTool ? character.class.proTool : "None." }</Capital></Body>
                  <hr />
                  {
                    character.class.description.map(section => (
                      <>
                        <Body><b>{ section.title }</b></Body>
                        {
                          section.body.map(text => <Body>{ text }</Body>)
                        }
                        <br />
                      </>
                    ))
                  }
                </>
              }
              <FormSelect
                value=""
                onChange={ handleBackGround('class', 'classID', classes) }
              >
                <option>{ character.class ? 'Change Class' : 'Select Class' }</option>
                {
                  classes.map(r => <option key={ `class-${ r.id }` } value={ r.id }>{ r.name }</option>)
                }
              </FormSelect>
            </Column>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* BACKGROUND SELECT */ }
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Row>
              <b>{ character.background ? character.background.name : 'No Background Selected...' }</b>
            </Row>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Column>
              {
                character.background &&
                <>
                  {
                    !!character.background.specialOpts &&
                    <>
                      <Body><b>Additional Insights (choose one for notes):</b></Body>
                      <ul>
                        { character.background.specialOpts.map((option, i) => <li key={ i }>{ option }</li>) }
                      </ul>
                    </>
                  }
                </>
              }
              <FormSelect
                value=""
                onChange={ handleBackGround('background', 'backgroundID', bgList) }
              >
                <option>{ character.background ? 'Change Background' : 'Select Background' }</option>
                {
                  bgList.map(bg => <option key={ `bg-${ bg.id }` } value={ bg.id }>{ bg.name }</option>)
                }
              </FormSelect>
            </Column>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Row>
              <b>Stats</b>
              <Spacer />
            </Row>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <StatGrid race={ character.race } />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Column>
    </Builder >
  )
}

export default CharacterBuilder;

const FormSelect = styled.select`
  margin: 5px;
  background-image: linear-gradient(to bottom, white, whitesmoke);
  border: solid thin whitesmoke;
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

const Capital = styled.span`
  text-transform: capitalize;
`