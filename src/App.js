import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';

import './App.css';


function App() {
  const [toDo, setToDo] = useState('');
  const [toDo_items, set_toDo_items] = useState(
    JSON.parse(localStorage.getItem('toDo-items')) || []
  );

  useEffect(() => {
    localStorage.setItem('toDo-items', JSON.stringify(toDo_items))
  }, [toDo_items]);

  const newToDo = (e) => {
    if(toDo.trim() !== '') {
      const newToDo = {
        id:uuidv4(),
        text: toDo,
        color: randomColor({
          luminosity: 'light',
          format: 'hsla'
        }),
        defaultPosition: {
          x: 500 - Math.random() * 10,
          y: -500 + Math.random() * 10
        }
      }
      set_toDo_items((toDo_items) => [...toDo_items, newToDo]);
      setToDo('');
     
    }else {
      alert('Введите что-нибудь');
      setToDo('');
      
    }
  }
  const deleteToDo = (id) => {

    set_toDo_items(toDo_items.filter((item) => item.id !== id ));
  }
  const updatePos = (data, index) => {
    let newArr = [...toDo_items];
    console.log(newArr)
    newArr[index].defaultPosition = { x: data.x, y: data.y}
    set_toDo_items(newArr);
  }
  
  const keyPress = (e) => {
    const code = e.keyCode || e.which
    if(code === 13) {
      newToDo()
    }
  }

  return (
   <div className='app'>
     <div className='wrapper'>
      <input
        value={toDo}
       placeholder="Enter ToDo" 
       type='text'
       onChange={(e) => setToDo(e.target.value) }
       onKeyPress = {(e) => keyPress(e)}
        />
      
       <button className='addToDo' onClick={newToDo}>ENTER</button>
     </div>
     {
       toDo_items.map((item, index) => {
         
         return (
           <Draggable 
            key={item.id}
            defaultPosition={item.defaultPosition}
            onStop={(e, data) => {
              
              updatePos(data, index)
            }}
           >
             <div className='todo__item' style={{backgroundColor: item.color}}>
               {`${item.text}`}
               <div 
               onClick={() => {
                deleteToDo(item.id)
               }}
               className='delete'>
                 X
               </div>
             </div>
           </Draggable>
         )
       })
     }
   </div>
  );
}

export default App;
