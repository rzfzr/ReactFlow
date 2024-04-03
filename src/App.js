import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
import './components/dropzoneComponent/DropzoneComponent'
import Sidebar from './components/sideBar/sidebar';
import './index.css';
import useMyStore from './store';
import DropzoneComponent from './components/dropzoneComponent/DropzoneComponent';
import GenericCustomNode from './components/customNode/GenericCustomNode';
import CustomEdge from './components/customEdges/CustomEdges';
import useLayout from './hooks/useLayouts';

const nodeTypes = { genericCustomNode: GenericCustomNode };
let id = 0;
const getId = () => `dndnode_${id++}`;

function generateNodes(nodeData) {
  let node = {};
  node.data = {};

  node.data.name = nodeData.name;
  node.isConnectable = nodeData.isConnectable;
  node.data.nameOfIn = nodeData.name;
  node.type = nodeData.type;
  node.style = { backgroundColor: nodeData.color };


  switch (nodeData.type) {
    case 'controller':
      node.data.ins = ['default_in'];
      node.data.outs = ['setup()', 'loop()'];
      break;
    case 'port':
      node.data.ins = ['in'];
      node.data.outs = ['out'];
      break;
    case 'logic':
      node.data.ins = ['declare', 'in'];
      node.data.outs = ['body'];
      break;
    case 'built-in':
      node.data.methods = nodeData.methods;
      break;
    case 'built-in-constant':
      node.data.ins = ['in'];
      node.data.outs = ['out'];
      break;
    case 'component':
      node.data.methods = nodeData.methods;
      break;
    default:
      node.data.ins = ['default_in'];
      node.data.outs = ['default_out'];
  }

  return node;
}

function edgeNodes(edgeData) {
  let edge = {};
  edge.data = {};

  edge.data.name = edgeData.name;
  edge.isConnectable = edgeData.isConnectable;
  edge.data.nameOfIn = edgeData.name;
  edge.type = edgeData.type;

  switch (edgeData.type) {
    case 'controller':
      edge.data.ins = ['default_in'];
      edge.data.outs = ['setup()', 'loop()'];
      break;
    case 'port':
      edge.data.ins = ['in'];
      edge.data.outs = ['out'];
      break;
    case 'logic':
      edge.data.ins = ['declare', 'in'];
      edge.data.outs = ['body'];
      break;
    case 'built-in':
      edge.data.methods = edgeData.methods;
      break;
    case 'built-in-constant':
      edge.data.ins = ['in'];
      edge.data.outs = ['out'];
      break;
    case 'component':
      edge.data.methods = edgeData.methods;
      break;
    default:
      edge.data.ins = ['default_in'];
      edge.data.outs = ['default_out'];
  }

  return <CustomEdge key={edgeData.id} {...edge} />;
}

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const edgeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !nodeData) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = generateNodes(nodeData);
      console.log('got new node', newNode, 'with ', nodeData)
      
      newNode.id = getId();
      newNode.position = position;
      newNode.data = { 
        label: `${nodeData.name}`,
        ins: `${nodeData.ins}`,
        outs: `${nodeData.outs}`,
        methods: `${nodeData.methods}`,
      };
      // newNode.data = nodeData;
      // newNode.type = { type:  GenericCustomNode};
      const newEdge = edgeNodes(edgeData);
      edgeNodes.id = getId();
      edgeNodes.position = position;
      edgeNodes.data = { 
        label: `${edgeData.name}`,
        ins: `${edgeData.ins}`,
        outs: `${edgeData.outs}`,
        methods: `${edgeData.methods}`,
      };

      setEdges((eds) => eds.concat(newEdge));
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  useLayout();

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <DropzoneComponent />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls position='top-left' />
            <Background color='#191919' />
          </ReactFlow>
        </div>
        <Sidebar />
        <MiniMap position='bottom-left' nodeColor={node => node.color} />
      </ReactFlowProvider>
    </div>
  );
};


function ReactFlowWrapper() {
  return (
    <ReactFlowProvider>
        <DnDFlow />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;