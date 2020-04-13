import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { Row, Column } from './CustomStyled';

const SelectDialogue = ({ title, arr, selected, onSelect, open, onClose }) => {

  const [query, setQuery] = useState("")

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>{ title }</DialogTitle>
      <DialogContent>
        <Row>
          <TextField placeholder="search" onChange={ e => setQuery(e.target.value) } />
        </Row>
        <Column>
          {
            query.length > 2
            && arr.filter(item => item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
              .map(item => (
                <FormControlLabel
                  key={ "item-option-" + item.id }
                  control={
                    <Checkbox
                      checked={ (selected.indexOf(item.id) !== -1) || false }
                      onChange={ () => onSelect(item.id) }
                      color={ item.isHomebrew ? "secondary" : "primary" }
                    />
                  }
                  label={ item.name }
                />
              ))
          }
        </Column>
      </DialogContent>
    </Dialog>
  )
}

export default SelectDialogue;