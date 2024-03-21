import React, { CSSProperties, useCallback } from 'react';
import { Handle, HandleType, Position } from 'reactflow';
import './GenericCustomNode.css';

export default function GenericCustomNode(props) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const onDragStart = (event, node) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleStyle = {
    // position: 'relative',
    // width: '10px',
    // height: '10px',
    // background: 'rgb(189, 196, 204)',
    // borderRadius: '0',
    // zIndex: '10',
  };
  console.log(props.data.name);
  return (
    <div className="component-body"
      draggable={props.isDraggable}
    >
      <div className="component-title">
        <p>{props.data.name}</p>
      </div>
      <div className="component-content">
        <div className="component-port">
          <Handle
            type={props.data.types}
            position={Position.Left}
            id={props.id}
            isConnectable={true}
            style={handleStyle}
          />
          <p>{props.data.ins}</p>
          <p>{props.data.outs}</p>
          <Handle
            type={props.data.types}
            position={Position.Right}
            id={props.id}
            isConnectable={true}
            style={handleStyle}
          />
        </div>
      </div>
      <input id="text" name="text" onChange={onChange} className="nodrag" /> 
    </div>
  );
}
