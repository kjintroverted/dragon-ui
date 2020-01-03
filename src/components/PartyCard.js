import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
} from './CustomStyled';


function PartyCard({ name, party }) {
  console.log(party, 'AHHHHHHH');
  return (
        <Card>
            <Link to={`/character?id=${party.join()}`}>
                <div>{name}</div>
            </Link>
        </Card>
  );
}

export default PartyCard;
