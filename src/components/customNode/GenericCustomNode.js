import React, { CSSProperties, useCallback } from 'react';
import { Handle, HandleType, Position } from 'reactflow';
import './GenericCustomNode.css';

export default function GenericCustomNode(props) {
  const handleStyle = {
    // position: 'relative',
    // width: '10px',
    // height: '10px',
    // background: 'rgb(189, 196, 204)',
    // borderRadius: '0',
    // zIndex: '10',
  };
  return (
    <div className="component-body"
      draggable={props.isDraggable}
    >
      <div className="component-title">
        <p>{props.data.label}</p>
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
    </div>
  );
}
