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

function generateNodes(nodeData, position) {
  const node = {};
  node.id = getId();
  node.type = 'genericCustomNode'
  node.position = position;

  node.isConnectable = nodeData.isConnectable;
  node.style = { backgroundColor: nodeData.color };

  node.data = {
    name: `${nodeData.name}`,//why?
    nameOfIn: `${nodeData.name}`,//why?
    label: `${nodeData.name}`,
    ins: nodeData.ins || [],
    outs: nodeData.outs || [],//methods should be added to ins AND outs
    methods: `${nodeData.methods}`,
  };
  return node;
}

function generateEdges(edgeData, position) {
  let edge = {};
  edge.id = getId();
  edge.position = position;

  edge.isConnectable = edgeData.isConnectable;
  edge.type = edgeData.type;

  edge.data = {//todo fix these
    nameOfIn: edgeData.name,
    label: `${edgeData.name}`,
    ins: `${edgeData.ins}`,
    outs: `${edgeData.outs}`,
    methods: `${edgeData.methods}`,
  };


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

      const newNode = generateNodes(nodeData, position);

      const newEdge = generateEdges(edgeData);


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