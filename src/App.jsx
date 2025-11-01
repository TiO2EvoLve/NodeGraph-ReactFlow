import { useState, useCallback } from 'react';
import {ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, MiniMap, Controls, Background} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from "./Node/Test/TextUpdaterNode.tsx";


const initialNodes = [
    {
        id: 'node-1',
        type: 'textUpdater',
        position: { x: 0, y: 0 },
        data: { value: 123 },
    }]
const nodeTypes = { textUpdater: TextUpdaterNode };
export default function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState([]);

    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );
    const rfStyle = {
        backgroundColor: '#FAFAFA'
    };
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                style={rfStyle}
            >
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Background color="black" lineWidth={0.1} variant='dots' />
                <Controls />
            </ReactFlow>
        </div>
    );
}