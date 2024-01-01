
import React, { useState } from 'react';
import ResourceGroup from './ResourceGroup'
import "../Css/ResourceGroup.css";
import { v4 as uuidv4 } from 'uuid';


let initialResourceGroups = [
  { id: uuidv4(), name: 'Resource Group 1', x:50, y:50 },
  { id: uuidv4(), name: 'Resource Group 2', x:100, y:75 },
  { id: uuidv4(), name: 'Resource Group 3', x:150, y:100},
];

function Canvas() {

const [value, setValue] = useState(0); // integer state
const [resourceGroups, setResourceGroup] = useState(initialResourceGroups);

function onClose(e)
{
  console.log("Close Clicked" )
  var newResources = resourceGroups.filter(a => a.id !== e.currentTarget.id)
  setResourceGroup(newResources)
}

//Variables to add items onto Canvas
const addItem = () => {
  var newResources = resourceGroups
  newResources.push({ id: uuidv4(), name: 'Resource Group', x:10, y:10 })
  setResourceGroup(newResources)
}


return (
    <div  className="canvas">
      <button className = "rg_button" onClick={addItem}>New Resource Group</button>;
      {resourceGroups.map((_, idx) => <ResourceGroup key={idx} onClose={onClose} onAdd={addItem} ident={resourceGroups[idx].id} rgName={resourceGroups[idx].name} x={resourceGroups[idx].x} y={resourceGroups[idx].y}/>)}
    </div>
  );
}

export default Canvas;
