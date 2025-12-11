import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BSDFNode from "./Node/Test/BSDFNode.tsx";
import Vector3Node from "./Node/Input/Vector3Node.tsx";
import OutputNode from "./Node/Output/OutputNode.tsx";
import NumberOutputNode from "./Node/Output/NumberOutputNode.tsx";
import ContextMenu from './ContextMenu.jsx';

const connectionLineStyle = { stroke: 'black' };
const edgeOptions = {
  animated: true,
  style: { stroke: 'black' },
};

const initialNodes = [
  { id: 'bsdf', type: 'BSDFNode', position: { x: 300, y: 0 }, data: { value: '#ffff11' } },
  { id: 'vector3', type: 'Vector3Node', position: { x: 0, y: 0 } },
  { id: 'output', type: 'OutputNode', position: { x: 600, y: 0 } },
];
const nodeTypes = { BSDFNode, Vector3Node, OutputNode,NumberOutputNode };
const initialEdges = [
  { id: 'vector3-bsdf', source: 'vector3', targetHandle: 'i-normal', target: 'bsdf' },
  { id: 'bsdf-output', source: 'bsdf', target: 'output', targetHandle: 'i-output' },
];

// simple catalog grouped by category
const nodeCatalog = [
  { label: 'Input', items: [{ type: 'Vector3Node', label: 'Vector3' }] },
  { label: 'BSDF', items: [{ type: 'BSDFNode', label: 'BSDF' }] },
  { label: 'Output', items: [{ type: 'OutputNode', label: 'Output' },{type: 'NumberOutputNode', label: 'Number Output'}] },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);

  const [menuState, setMenuState] = useState({
    isOpen: false,
    clientPos: { x: 0, y: 0 },
    graphPos: { x: 0, y: 0 },
  });

  const containerRef = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((es) => addEdge(params, es)),
    [],
  );

  // store reactflow instance on init so we can call project(...)
  const onInit = useCallback((rfi) => {
    setRfInstance(rfi);
  }, []);

  // right-click handler on the pane (ReactFlow passes native event here)
  const handlePaneContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      // require rfInstance and containerRef
      if (!rfInstance || !containerRef.current) {
        // fallback: open menu at client coords but no graph position
        setMenuState({
          isOpen: true,
          clientPos: { x: event.clientX, y: event.clientY },
          graphPos: { x: 0, y: 0 },
        });
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const local = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      // project local pixel coords to graph coords (accounts for zoom/pan)
      const graphPos = rfInstance.project ? rfInstance.project(local) : local;

      setMenuState({
        isOpen: true,
        clientPos: { x: event.clientX, y: event.clientY },
        graphPos,
      });
    },
    [rfInstance],
  );

  const closeMenu = useCallback(() => {
    setMenuState((s) => ({ ...s, isOpen: false }));
  }, []);

  const handleSelectNodeType = useCallback(
    (type) => {
      // generate unique id
      const id = `${type}-${Date.now()}`;
      const newNode = {
        id,
        type,
        position: menuState.graphPos || { x: 0, y: 0 },
        data: {}, // you can prefill data based on type if needed
      };
      setNodes((ns) => [...ns, newNode]);
      closeMenu();
    },
    [menuState.graphPos, closeMenu],
  );

  const rfStyle = { backgroundColor: '#FAFAFA' };

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={containerRef}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          snapToGrid//吸附网格
          deleteKeyCode={['Delete', 'Backspace']}
          style={rfStyle}
          autoPanOnNodeFocus={true}
          defaultEdgeOptions={edgeOptions}
          connectionLineStyle={connectionLineStyle}
          onInit={onInit}
          onPaneContextMenu={handlePaneContextMenu}
        >
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
          <Background id="1" gap={10} color="#f1f1f1" variant="lines" />
          <Background id="2" gap={100} color="#ccc" variant="lines" />
          <Controls />
        </ReactFlow>

        <ContextMenu
          isOpen={menuState.isOpen}
          clientPos={menuState.clientPos}
          categories={nodeCatalog}
          onSelect={handleSelectNodeType}
          onClose={closeMenu}
        />
      </ReactFlowProvider>
    </div>
  );
}