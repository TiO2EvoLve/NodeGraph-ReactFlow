import {useState, useCallback} from 'react';
import {ReactFlow,ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge, MiniMap, Controls, Background} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BSDFNode from "./Node/Test/BSDFNode.tsx";
import Vector3Node from "./Node/Input/Vector3Node.tsx";
import OutputNode from "./Node/Output/OutputNode.tsx";

const connectionLineStyle = {stroke: 'black'};
const edgeOptions = {
    animated: true,
    style: {
        stroke: 'black',
    },
};
const initialNodes = [
    {
        id: 'bsdf',
        type: 'BSDFNode',
        position: {x: 300, y: 0},
        data: {value: '#ffff11'}
    },
    {
        id: 'vector3',
        type: 'Vector3Node',
        position: {x: 0, y: 0},
    },
    {
        id: 'output',
        type: 'OutputNode',
        position: {x: 600, y: 0},
    },
]
const nodeTypes = {BSDFNode, Vector3Node, OutputNode};
const initialEdges = [
    {id: 'vector3-bsdf', source: 'vector3', targetHandle: 'i-normal', target: 'bsdf'},
    {id: 'bsdf-output', source: 'bsdf', target: 'output', targetHandle: 'i-output'},
];
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
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    deleteKeyCode={['Delete', 'Backspace']}
                    style={rfStyle}//背景样式
                    //snapToGrid={true}//吸附网格
                    //snapGrid={snapGrid}//网格大小
                    autoPanOnNodeFocus={true}//当节点聚焦时，视口将平移
                    defaultEdgeOptions={edgeOptions}
                    connectionLineStyle={connectionLineStyle}
                >
                    <MiniMap nodeStrokeWidth={3} zoomable pannable/>
                    <Background
                        id="1"
                        gap={10}
                        color="#f1f1f1"
                        variant='lines'
                    />
                    <Background
                        id="2"
                        gap={100}
                        color="#ccc"
                        variant='lines'
                    />
                    <Controls/>
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}