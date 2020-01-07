import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';

function PartyChip({ name, members }) {
  const [display, setDisplay] = useState(true);

  function removeParty(e) {
    e.preventDefault();
    const parties = JSON.parse(localStorage.getItem('parties'));
    // Grab index of the existing party
    const index = parties.findIndex(savedParty => savedParty.name === name);
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
            href={`/character?id=${members.join()}`}
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
  members: PropTypes.array.isRequired,
};

export default PartyChip;
