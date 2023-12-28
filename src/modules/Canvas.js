
import App from '../App'
import "../App.css";

function Canvas() {

const resourceGroups = new Array(4).fill(null);

return (
    <div  className="canvas" >
        {resourceGroups.map((_, idx) => <App/>)}
    </div>
  );
}

export default Canvas;
