import React, { useState, useEffect } from 'react'
import dungeonService from '../services/dungeonService'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, Button } from '@material-ui/core'
import styled from 'styled-components'
import { Column, Row, Spacer } from '../components/CustomStyled'
import StatGrid from '../components/StatGrid'
import SelectDialogue from '../components/SelectDialogue'
import { advancement } from '../services/helper'

const CharacterBuilder = () => {

  const [races, setRaces] = useState([])
  const [classes, setClasses] = useState([])
  const [bgList, setBGList] = useState([])
  const [character, updateCharacter] = useState({
    level: 1,
    info: {}
  })
  const [weapons, setWeapons] = useState([])
  const [weaponSelect, setWeaponOpen] = useState(false);


  function handleInfo(field, numeric) {
    return (e) => {
      let value = numeric ? +e.target.value : e.target.value;
      let info = { ...character.info, [field]: value }
      updateCharacter({ ...character, info })
    }
  }

  function toggleItem(field) {
    return (id) => {
      let arr = character.info[field] || [];
      let i = arr.indexOf(id);
      if (i >= 0) {
        arr = [...arr.slice(0, i), ...arr.slice(i + 1)]
      } else {
        arr = [...arr, id]
      }
      let info = { ...character.info, [field]: arr }
      updateCharacter({ ...character, info })
    }
  }

  function updateLevel({ target }) {
    let level = +target.value;
    if (level < 1) level = 1;
    if (level > 20) level = 20;
    updateCharacter({ ...character, level, info: { ...character.info, xp: advancement[level - 1].xp } })
  }

  function handleBackGround(field, infoField, opts) {
    return (e) => {
      let value = opts.find(r => r.id === e.target.value)
      let info = { ...character.info, [infoField]: value.id }
      updateCharacter({ ...character, [field]: value, info })
    }
  }

  function stopPropagation(e) {
    e.stopPropagation()
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
    (async function loadWeapons() {
      let data = await dungeonService.getWeapons()
      setWeapons(data)
    })();
  }, [])

  useEffect(() => {
    if (character.class) {
      let hd = +character.class.hitDice.split("d")[1];
      let hp = hd * character.level;
      if (character.info.maxHP !== hp) {
        console.log("hp update");
        updateCharacter({ ...character, info: { ...character.info, maxHP: hp, hp } })
      }
    }
  }, [character])


  return (
    <Builder>
      <Column>
        {/* NAME LEVEL HP */ }
        <Row>
          <TextField
            style={ { flex: 1 } }
            variant="outlined"
            label="Name"
            onChange={ handleInfo('name') }
          />
          <TextField
            style={ { maxWidth: 100 } }
            type="number"
            variant="outlined"
            label="Level"
            value={ character.level }
            onChange={ updateLevel }
          />
          <TextField
            style={ { maxWidth: 100 } }
            disabled={ true }
            type="number"
            variant="outlined"
            label="HP"
            value={ character.info ? character.info.maxHP || 0 : 0 }
            onChange={ handleInfo('maxHP', true) }
          />
        </Row>
        {/* RACE SELECT  */ }
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={ <i className="material-icons">keyboard_arrow_down</i> }>
            <Row>
              <FormSelect
                onClick={ stopPropagation }
                onFocus={ stopPropagation }
                onChange={ handleBackGround('race', 'raceID', races) }
              >
                <option>{ character.race ? 'Change Race' : 'Select Race' }</option>
                {
                  races.map(r => <option key={ `race-${ r.id }` } value={ r.id }>{ r.name }</option>)
                }
              </FormSelect>
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
            </Column>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* CLASS SELECT */ }
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={ <i className="material-icons">keyboard_arrow_down</i> }>
            <Row>
              <FormSelect
                onClick={ stopPropagation }
                onFocus={ stopPropagation }
                onChange={ handleBackGround('class', 'classID', classes) }
              >
                <option>{ character.class ? 'Change Class' : 'Select Class' }</option>
                {
                  classes.map(r => <option key={ `class-${ r.id }` } value={ r.id }>{ r.name }</option>)
                }
              </FormSelect>
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
                    character.class.description.map((section, i) => (
                      <>
                        <Body key={ `section-${ i }` }><b>{ section.title }</b></Body>
                        {
                          section.body.map((text, j) => <Body key={ `desc-${ i }-${ j }` }>{ text }</Body>)
                        }
                        <br />
                      </>
                    ))
                  }
                </>
              }
            </Column>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* BACKGROUND SELECT */ }
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={ <i className="material-icons">keyboard_arrow_down</i> }>
            <Row>
              <FormSelect
                onClick={ stopPropagation }
                onFocus={ stopPropagation }
                onChange={ handleBackGround('background', 'backgroundID', bgList) }
              >
                <option>{ character.background ? 'Change Background' : 'Select Background' }</option>
                {
                  bgList.map(bg => <option key={ `bg-${ bg.id }` } value={ bg.id }>{ bg.name }</option>)
                }
              </FormSelect>
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
            </Column>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* STAT BUY */ }
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={ <i className="material-icons">keyboard_arrow_down</i> }>
            <Row>
              <b>Stats</b>
              <Spacer />
            </Row>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <StatGrid
              race={ character.race }
              levelPoints={ advancement[character.level - 1].points }
              update={ stats => updateCharacter({ ...character, info: { ...character.info, stats } }) } />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* ITEM SELECT */ }
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={ <i className="material-icons">keyboard_arrow_down</i> }>
            <b>Item Select</b>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Column>
              { character.class &&
                <Column>
                  <b>Class Equipment:</b>
                  <ul>
                    { character.class.startEquip.map((txt, i) => <ol key={ `class-equip-${ i }` }>{ txt }</ol>) }
                  </ul>
                </Column>
              }
              { character.background &&
                <Column>
                  <b>Background Equipment:</b>
                  <ul>
                    { character.background.equipment.map((txt, i) => <ol key={ `bg-equip-${ i }` }>{ txt }</ol>) }
                  </ul>
                </Column>
              }
              <Row>
                {/* WEAPON LIST */ }
                <Column>
                  <h3>Weapons</h3>
                  <ul>
                    {
                      !character.info.weaponIDs || !character.info.weaponIDs.length ? "No weapons equipped..."
                        : character.info.weaponIDs.map(id => <li key={ "item-" + id }>{ weapons.find(w => w.id === id).name }</li>)
                    }
                  </ul>
                  <Button onClick={ () => setWeaponOpen(true) }>Add Weapon</Button>
                  <SelectDialogue
                    title="Select Weapons"
                    open={ weaponSelect }
                    onClose={ () => setWeaponOpen(false) }
                    arr={ weapons }
                    selected={ character.info.weaponIDs || [] }
                    onSelect={ toggleItem("weaponIDs") }
                  />
                </Column>
                {/* ARMOR LIST */ }
              </Row>
            </Column>
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
  max-width: 800px;
  align-self: center;
`

const Body = styled.p`
  margin: 0em 0em .5em 0em;
`

const Capital = styled.span`
  text-transform: capitalize;
`