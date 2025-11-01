import { Handle, Position } from "@xyflow/react";
import './TextUpdaterNode.tsx.css'

function TextUpdaterNode() {
    // simple handler used by inputs
    const handleChange = (evt) => {
        console.log(evt.target.value);
    };

    return (

    <div className="node-container">



        <div className="node-header">
            <span className="node-title">Vector3</span>
        </div>

        <div className='node-handle-container'>
            <span className='output'>Vector3</span>
            <Handle type="target" className='node-port-handle' position={Position.Right} />
        </div>


        <div className="node-contents">
            <div className="node-content">
                <span className="content-name">X</span>
                <input className="content-valve" onChange={handleChange} placeholder="0" />
            </div>

            <div className="node-content">
                <span className="content-name">Y</span>
                <input className="content-valve" onChange={handleChange} placeholder="0" />
            </div>
            <div className="node-content">
                <span className="content-name">Z</span>
                <input className="content-valve" onChange={handleChange} placeholder="0" />
            </div>
        </div>

    </div>
    );
}

export default TextUpdaterNode;
