import React, {useState, useEffect} from 'react';

import DungeonService from '../services/dungeonService';


function Welcome() {
  // [Variable in State, Setter of Variable] 
  // hooks are indicated by the word `use` (linter looks for use keyword)
  const [welcome, setWelcome] = useState('Just a moment...');

  // Effects run immediately after render (including the first render)
  // Don't be tempted to make useEffect async console will scream at you
  useEffect(()=>{
    // Async calls are to be made inside useEffect then immediately called below
   const getWelcome = async ()=>{
      let welcomeServer = await DungeonService.getWelcome();
       setWelcome(welcomeServer);
      };
      getWelcome();

  // Array at the end is requried to avoid looping
  // indicates that this is only triggered on mount
  // if we put [propVariable] inside it would trigger again on propVariable change
  // See https://www.robinwieruch.de/react-hooks-fetch-data/ for indepth material
  },[]);
     
    return (
          <div>
          { welcome }
          </div>
    );
}
export default Welcome;