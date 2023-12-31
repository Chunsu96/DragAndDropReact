
import App from '../App'
import "../App.css";

function Canvas() {

const resourceGroups = new Array(4).fill(null);

function onClose()
{
  console.log("Close Clicked")
}

return (
    <div  className="canvas" >
        {resourceGroups.map((_, idx) => <App key={idx} onClose={onClose}/>)}
    </div>
  );
}

export default Canvas;
