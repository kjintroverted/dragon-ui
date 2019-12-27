import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import styled from 'styled-components';
import { Row } from './CustomStyled';

const DeathSavingThrows = () => {
  const [checked, setChecked] = useState({
    success1: false,
    success2: false,
    success3: false,
    failure1: false,
    failure2: false,
    failure3: false,
  });

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  return (
    <SavingThrowsContainer>
      <h2 style={ { margin: 0 } }>Death Saving Throws</h2>
      <Row style={ { justifyContent: 'flex-end' } }>
        <h3 style={ { margin: 0 } }>Success</h3>
        <GreenCheckbox
          checked={ checked.success1.checked }
          onChange={ handleChange }
          name="success1"
          value="primary"
          inputProps={ { 'aria-label': 'primary checkbox' } }
        />
        <GreenCheckbox
          checked={ checked.success2.checked }
          onChange={ handleChange }
          name="success2"
          value="primary"
          inputProps={ { 'aria-label': 'primary checkbox' } }
        />
        <GreenCheckbox
          checked={ checked.success3.checked }
          onChange={ handleChange }
          name="success3"
          value="primary"
          inputProps={ { 'aria-label': 'primary checkbox' } }
        />
      </Row>
      <Row style={ { justifyContent: 'flex-end' } }>
        <h3 style={ { margin: 0 } }>Failure</h3>
        <RedCheckbox
          checked={ checked.failure1.checked }
          onChange={ handleChange }
          name="failure1"
          value="primary"
          inputProps={ { 'aria-label': 'primary checkbox' } }
        />
        <RedCheckbox
          checked={ checked.failure2.checked }
          onChange={ handleChange }
          name="failure2"
          value="primary"
          inputProps={ { 'aria-label': 'primary checkbox' } }
        />
        <RedCheckbox
          checked={ checked.failure3.checked }
          onChange={ handleChange }
          name="failure3"
          value="primary"
          inputProps={ { 'aria-label': 'primary checkbox' } }
        />
      </Row>
    </SavingThrowsContainer>
  );
};

export default DeathSavingThrows;

const SavingThrowsContainer = styled.div`
  margin: 3px 0px;
  font-size: .8em;
`;

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" { ...props } />);

const RedCheckbox = withStyles({
  root: {
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" { ...props } />);
