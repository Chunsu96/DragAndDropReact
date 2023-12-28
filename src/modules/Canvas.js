
import App from '../App'
import "../App.css";

function Canvas() {

const resourceGroups = new Array(4).fill(null);

return (
    <div  className="canvas" >
        {resourceGroups.map((_, idx) => <App key={idx}/>)}
    </div>
  );
}

export default Canvas;
