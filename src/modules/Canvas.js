
import React, { useState } from 'react';
import App from '../App'
import "../App.css";
import { v4 as uuidv4 } from 'uuid';


function ForceUpdate()
{

  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

function Canvas() {

const [value, setValue] = useState(0); // integer state

var resourceGroups = new Array(4).fill(null);
resourceGroups = resourceGroups.map(x=> uuidv4());


function onClose(e)
{

  console.log("Close Clicked" )
  resourceGroups = resourceGroups.filter(x => x != e.currentTarget.id)

  return () => setValue(value => value + 1); // update state to force render
}

//Variables to add items onto Canvas
const [{items}, setItems] = useState({ items: [] });
const addItem = () => {
  items.push(<div key={items.length}>This is a test</div>);
  setItems({ items: [...items] });
}


return (
    <div  className="canvas">
      <button className = "rg_button" onClick={addItem}>New Resource Group</button>;
      {items}
      {resourceGroups.map((_, idx) => <App key={idx} onClose={onClose} ident={resourceGroups[idx]}/>)}
    </div>
  );
}

export default Canvas;
