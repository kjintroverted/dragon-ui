import React, {useState, useEffect} from 'react';

import DungeonService from '../services/dungeonService';


function Welcome() {
  const [welcome, setWelcome] = useState('Just a moment...');

  useEffect(()=>{
   const getWelcome = async ()=>{
      let welcomeServer = await DungeonService.getWelcome();
       setWelcome(welcomeServer);
      };
      getWelcome();
  },[])
     
    return (
          <div>
          { welcome }
          </div>
    );
}
export default Welcome;