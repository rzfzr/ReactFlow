import React, { CSSProperties, useCallback } from 'react';
import { Handle, HandleType, Position } from 'reactflow';
import './GenericCustomNode.css';

export default function GenericCustomNode(props) {
  console.log(props);

  return (
    <div className="component-body"
      draggable={props.isDraggable}
    >
      <div className="component-title">
        <p>{props.data.label}</p>
      </div>
      <div className="component-content">
        <div className="component-port"
          style={{ height: 150 }}>

          {props.data.ins.map((item, index) => {
            const id = `out-${index}`;
            const offset = 50 + index * 50;
            return (
              <>
                <p style={{ position: 'absolute', top: `${offset}px`, right: '20px', margin: 0, lineHeight: '20px' }}>
                  {id}
                </p>
                <Handle
                  id={id}
                  type={props.data.types}
                  position={Position.Left}
                  isConnectable={true}
                  style={{ position: 'absolute', top: `${offset}px` }}
                />
              </>
            );
          })}
          {props.data.outs.map((item, index) => {
            const id = `out-${index}`;
            const offset = 50 + index * 50;
            return (
              <>
                <p style={{ position: 'absolute', top: `${offset}px`, right: '20px', margin: 0, lineHeight: '20px' }}>
                  {id}
                </p>
                <Handle
                  id={id}
                  type={props.data.types}
                  position={Position.Right}
                  isConnectable={true}
                  style={{ position: 'absolute', top: `${offset}px` }}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
