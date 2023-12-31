
import React, { useState } from 'react';
import App from '../App'
import "../App.css";
import { v4 as uuidv4 } from 'uuid';


function ForceUpdate()
{

  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

let initialArtists = [
  { id: uuidv4(), name: 'Resource Group 1' },
  { id: uuidv4(), name: 'Resource Group 2'},
  { id: uuidv4(), name: 'Resource Group 3'},
];

function Canvas() {

const [value, setValue] = useState(0); // integer state
const [resourceGroups, setResourceGroup] = useState(initialArtists);

function onClose(e)
{
  console.log("Close Clicked" )
  var newResources = resourceGroups.filter(a => a.id !== e.currentTarget.id)
  setResourceGroup(newResources)
}

//Variables to add items onto Canvas
const addItem = () => {
  var newResources = resourceGroups
  newResources.push({ id: uuidv4(), name: 'Resource Group' })
  setResourceGroup(newResources)
}


return (
    <div  className="canvas">
      <button className = "rg_button" onClick={addItem}>New Resource Group</button>;
      {resourceGroups.map((_, idx) => <App key={idx} onClose={onClose} ident={resourceGroups[idx].id}/>)}
    </div>
  );
}

export default Canvas;
