
import React, { useEffect, useState } from 'react';
import data from '../../PaletteNodes'; // Substitua isso pelo caminho do seu arquivo JSON

export default () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes(data);
  }, []);

  const onDragStart = (event, nodeType, nodeName) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: nodeType, name: nodeName }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ overflowY: 'scroll', maxHeight: '100vh', }}>
      <div className="description">Arraste os componentes para a esquerda.</div>
      {nodes.map((node, index) => (
        <div
          key={index}
          className={`dndnode ${node.color}`}
          style={{ borderColor: node.color }}
          onDragStart={(event) => onDragStart(event, node.extras.type, node.name)}
          draggable
          title={node.extras.description} // Adicionado aqui
        >
          {node.name}
        </div>
      ))}
    </aside>
  );
};
