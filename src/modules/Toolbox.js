// Import 3rd party libraries
import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDrag } from "./UseDrag.js";

// Import css files
import "../Css/ResourceGroup.css";

// Import custom created modules
import Resource from './Resource.js'
import EditableLabel from "./EditableLabel.js";

const DATA = [
  {
    id: uuidv4(),
    name: "Function App",
    items: [],
    tint: 1,
  },
  {
    id: uuidv4(),
    name: "Web Application",
    items: [],
    tint: 2,
  },
  {
    id: uuidv4(),
    name: "Key Vault",
    items: [],
    tint: 3,
  },
];

function Toolbox({onClose, ident, rgName, x, y}) {
  const [stores, setStores] = useState(DATA);

  const draggableRef = useRef(null);
  const { position, handleMouseDown } = useDrag({
    ref: draggableRef
  });

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;
    
    results.stopPropagation();

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(newStores);
  };

  return (
    <div className="layout__wrapper">
      <div className="card" 
          ref={draggableRef}
          style={{
          top: ((position.y !== undefined) ? position.y : y),
          left: ((position.x !== undefined) ? position.x : x)
        }}>
          <div className="draggable-panel">
            <div className="header">
              <h2>Resource Toolbox</h2>
            </div>
          </div>
          <div className="draggable-content">
            <DragDropContext onDragEnd={handleDragAndDrop}>
              <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {stores.map((store, index) => (
                      <Draggable
                        draggableId={store.id}
                        index={index}
                        key={store.id}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <Resource {...store} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
    </div>
  );
}

export default Toolbox;
