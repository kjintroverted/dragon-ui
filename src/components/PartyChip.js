import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';

function PartyChip({ name, party }) {
  const [display, setDisplay] = useState(true);

  function removeParty(e) {
    e.preventDefault();
    const parties = JSON.parse(localStorage.getItem('parties'));
    // Grab index of the existing party
    let index = -1;
    index = parties.map((savedParty, i) => {
      if (savedParty[0] === name) {
        return i;
      }
    });
    // Should always come back but just in case
    if (index !== -1) {
      parties.splice(index, 1);
    }
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
            href={`/character?id=${party.slice(1, party.length).join()}`}
            clickable
            onClick={() => { localStorage.setItem('selected', name); }}
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
