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
  Node,
  Edge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BSDFNode from '../Test/BSDFNode';
import Vector3Node from '../Input/Vector3Node';
import Vector1Node from '../Input/Vector1Node';
import OutputNode from '../Output/OutputNode';
import NumberOutputNode from '../Output/NumberOutputNode';

const connectionLineStyle = { stroke: 'black' };
const edgeOptions = {
  animated: true,
  style: { stroke: 'black' },
};

const nodeTypes = { 
  BSDFNode, 
  Vector3Node, 
  Vector1Node,
  OutputNode,
  NumberOutputNode 
};

export default function NodeGraph() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'bsdf', type: 'BSDFNode', position: { x: 300, y: 0 }, data: { value: '#ffff11' } },
    { id: 'vector3', type: 'Vector3Node', position: { x: 0, y: 0 }, data: {} },
    { id: 'output', type: 'OutputNode', position: { x: 600, y: 0 }, data: {} },
  ]);
  const [edges, setEdges] = useState<Edge[]>([
    { id: 'vector3-bsdf', source: 'vector3', targetHandle: 'i-normal', target: 'bsdf' },
    { id: 'bsdf-output', source: 'bsdf', target: 'output', targetHandle: 'i-output' },
  ]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((ns) => applyNodeChanges(changes, ns)),
    [],
  );
  
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((es) => applyEdgeChanges(changes, es)),
    [],
  );
  
  const onConnect = useCallback(
    (params: any) => setEdges((es) => addEdge(params, es)),
    [],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: type === 'BSDFNode' ? { value: '#ffff11' } : {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const rfStyle = { backgroundColor: '#FAFAFA' };

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          snapToGrid
          deleteKeyCode={['Delete', 'Backspace']}
          style={rfStyle}
          autoPanOnNodeFocus={true}
          defaultEdgeOptions={edgeOptions}
          connectionLineStyle={connectionLineStyle}
        >
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
          <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />
          <Background id="2" gap={100} color="#ccc" variant={BackgroundVariant.Lines} />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

