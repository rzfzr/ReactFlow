import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import './components/dropzoneComponent/DropzoneComponent'
import Sidebar from './components/sideBar/sidebar';
import './index.css';
import DropzoneComponent from './components/dropzoneComponent/DropzoneComponent';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

// Função para gerar nós personalizados
function generateNodes(nodeData) {
    let node = {};
    node.name = nodeData.name;
    node.color = nodeData.color;
    node.extras = nodeData.extras;
    
    switch(nodeData.extras.type) {
        case 'controller':
            node.ins = ['default_in']; // entradas para o tipo controller
            node.outs = ['setup()', 'loop()'];
            break;
        case 'port':
            node.ins = ['in'];
            node.outs = ['out'];
            break;
        case 'logic':
            node.ins = ['declare', 'in'];
            node.outs = ['body'];
            break;
        case 'built-in':
            node.methods = nodeData.methods;
            break;
        case 'built-in-constant':
            node.ins = ['in'];
            node.outs = ['out'];
            break;
        case 'component':
            node.methods = nodeData.methods;
            break;
        default:
            node.ins = ['default_in']; //entradas e saídas padrão para tipos não reconhecidos
            node.outs = ['default_out'];
    }

    return node;
}

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
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
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !nodeData) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = generateNodes(nodeData); // Use a função generateNodes para gerar nós personalizados
      newNode.id = getId();
      newNode.position = position;

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <div className="dndflow">
      
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <DropzoneComponent/>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background/>
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
