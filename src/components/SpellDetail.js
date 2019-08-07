import React from 'react';
import PropTypes from 'prop-types';
import {
  Chip, Divider, IconButton, Button,
} from '@material-ui/core';
import {
  Column, Row, HeaderBar, Spacer,
} from './CustomStyled';

const SpellDetail = ({ spell, close }) => (
  <Column>
    <HeaderBar>
      <Spacer />
      <IconButton onClick={close}>
        <i className="material-icons">close</i>
      </IconButton>
    </HeaderBar>
    <Row>
      <Chip
        icon={<i className="material-icons">school</i>}
        label={spell.school}
        variant="outlined"
      />
      <Chip
        icon={<i className="material-icons">timer</i>}
        label={spell.casting_time}
        variant="outlined"
      />
      <Chip
        icon={<i className="material-icons">timelapse</i>}
        label={spell.duration}
        variant="outlined"
      />
      <Chip
        icon={<i className="material-icons">wifi_tethering</i>}
        label={spell.range}
        variant="outlined"
      />
    </Row>
    <p className="min-margin">{ spell.desc }</p>
    <Divider />
    <Row>
      <Spacer />
    </Row>
  </Column>
);

export default SpellDetail;

SpellDetail.propTypes = {
  spell: PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    school: PropTypes.string,
    duration: PropTypes.string,
    casting_time: PropTypes.string,
    range: PropTypes.string,
  }).isRequired,
  close: PropTypes.func.isRequired,
};
