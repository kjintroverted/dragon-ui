import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';

function PartyChip({ name, party }) {
  const [display, setDisplay] = useState(true);
  function removeParty(e) {
    e.preventDefault();
    const parties = JSON.parse(localStorage.getItem('parties'));
    delete parties[name];
    localStorage.setItem('parties', JSON.stringify(parties));
    setDisplay(false);
  }
  // localStorage doesn't trigger a rerender
  if (display) {
    return (
          <Chip
            label={name}
            style={{ margin: '0.5rem' }}
            variant="contained"
            component="a"
            color="secondary"
            href={`/character?id=${party.join()}`}
            clickable
            onDelete={removeParty}
          />
    );
  }
  return null;
}

PartyChip.propTypes = {
  name: PropTypes.string.isRequired,
  party: PropTypes.array.isRequired,
};

export default PartyChip;
