import React from 'react';
import {
  Card,
} from './CustomStyled';

function PartyCard({ name, party }) {
  return (
        <Card>
            <div>{name}</div>
        </Card>
  );
}

export default PartyCard;
