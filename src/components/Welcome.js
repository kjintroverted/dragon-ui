import React, {useState, useEffect} from 'react';

import DungeonService from '../services/dungeonService';


function Welcome() {
  const [welcome, setWelcome] = useState('Just a moment...');

  useEffect(()=>{
   const getWelcome = async ()=>{
      let taco = await DungeonService.getWelcome();
       console.log(taco)
       setWelcome(taco);
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