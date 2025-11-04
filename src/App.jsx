import { useState, useCallback } from 'react';
import {ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, MiniMap, Controls, Background} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from "./Node/Test/TextUpdaterNode.tsx";
import Vector3Node from "./Node/Input/Vector3Node.tsx";
import OutputNode from "./Node/Output/OutputNode.tsx";

const snapGrid = [25, 25];
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
    },
    {
        id: 'n3',
        type: 'OutputNode',
        position: { x: 600, y: 0 },
    }
]
const nodeTypes = { textUpdater: TextUpdaterNode,
Vector3Node: Vector3Node,OutputNode : OutputNode};
const initialEdges = [{ id: 'n2-n1', source: 'n2',targetHandle : 'i-base-color', target: 'n1' },{
    id: 'n1-n3',source: 'n1',target: 'n3',targetHandle: 'i-output'}];
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
                style={rfStyle}//背景样式
                snapToGrid={true}//吸附网格
                snapGrid={snapGrid}//网格大小
            >
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Background color="black" lineWidth={0.1} variant='dots' />
                <Controls />
            </ReactFlow>
        </div>
    );
}