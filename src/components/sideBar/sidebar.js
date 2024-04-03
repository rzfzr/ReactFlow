
import React, { useEffect, useState } from 'react';
import data from '../../PaletteNodes'; // Substitua isso pelo caminho do seu arquivo JSON

export default () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes(data);
  }, []);

  const onDragStart = (event, node) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ }}>
      <div className="description">Arraste os componentes para a esquerda.</div>
      {nodes.map((node, index) => (
        <div
          key={index}
          className={`dndnode ${node.color}`}
          style={{ borderColor: node.color }}
          onDragStart={(event) => onDragStart(event, node)}
          draggable
          title={node.extras.description}
        >
          {node.name}
        </div>
      ))}
    </aside>
  );
};
