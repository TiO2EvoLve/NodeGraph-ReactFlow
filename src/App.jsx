import { useState, useCallback } from 'react';
import {ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, MiniMap, Controls, Background} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from "./Node/Test/TextUpdaterNode.tsx";
import Vector3Node from "./Node/Input/Vector3Node.tsx";


const initialNodes = [
    {
        id: 'n1',
        type: 'textUpdater',
        position: { x: 300, y: 0 },
    },
    {
        id: 'n2',
        type: 'Vector3Node',
        position: { x: 0, y: 0 },
    }]
const nodeTypes = { textUpdater: TextUpdaterNode,
Vector3Node: Vector3Node};
const initialEdges = [{ id: 'n2-n1', source: 'n2',targetHandle : 'i-base-color', target: 'n1' }];
export default function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

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