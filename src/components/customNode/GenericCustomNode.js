import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { Handle, HandleType, Position } from 'reactflow';
import './GenericCustomNode.css';

export default function GenericCustomNode(props) {
  const [handles, setHandles] = useState([]);

  useEffect(() => {
    console.log('Computing handles for', props)
    const handles = []
    let leftQuantity = 0;
    let rightQuantity = 0;

    props.data.ins.forEach(item => handles.push({
      edge: item,
      handleInfo: {
        index: leftQuantity++,
        id: `in-${leftQuantity}`,
        position: Position.Left
      }
    }));
    props.data.outs.forEach(item => handles.push({
      edge: item,
      handleInfo: {
        index: rightQuantity++,
        id: `out-${rightQuantity}`,
        position: Position.Right
      }
    }));

    props.data.methods.forEach(item => {
      handles.push({
        edge: item,
        handleInfo: {
          index: leftQuantity++,
          id: `in-${leftQuantity}`,
          position: Position.Left
        }
      })
      handles.push({
        edge: item,
        handleInfo: {
          index: rightQuantity++,
          id: `out-${rightQuantity}`,
          position: Position.Right
        }
      })
    });

    handles.forEach(handle => {
      handle.render = () => {
        const offset = 50 + handle.handleInfo.index * 50;
        return (
          <>
            <p style={{ position: 'absolute', top: `${offset}px`, right: '20px', margin: 0, lineHeight: '20px' }}>
              {handle.edge}
            </p>
            <Handle
              id={handle.handleInfo.id}
              type={props.data.types}
              position={handle.handleInfo.position}
              isConnectable={true}
              style={{ position: 'absolute', top: `${offset}px` }}
            />
          </>
        );
      }
    });

    setHandles(handles);

  }, []);

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

          {handles.map((handle) => handle.render())}
        </div>
      </div>
    </div>
  );
}
