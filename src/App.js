import { useEffect, useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDrag } from "./modules/UseDrag.js";
import StoreList from './modules/StoreList'
import "./App.css";
import EditableLabel from "./modules/EditableLabel";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Function App",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "func-MyFunc" },
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eac3", name: "UK South" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Web Application",
    items: [
      { id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae", name: "app-MyApp" },
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eac6", name: "UK South" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Key Vault",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "kv-MyVault" },
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eac6", name: "UK South" },
    ],
    tint: 3,
  },
];

function App() {
  const [stores, setStores] = useState(DATA);

  const draggableRef = useRef(null);

  const { position, handleMouseDown } = useDrag({
    ref: draggableRef
  });

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;
    
    console.log("Handling drag and drop")

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
          top: position.y,
          left: position.x
        }}>
          <div className="draggable-panel" onMouseDown={handleMouseDown}>
            <div className="header">
              <h1>Resource Group</h1>
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
                            <StoreList {...store} />
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

export default App;
