import React, { useState } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from 'reactflow';

import './Buttonedge.css';
import Modal from './Modal';

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  }) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  
    const [isModalOpen, setModalOpen] = useState(false);
  
    const onEdgeClick = (evt) => {
      evt.stopPropagation();
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  
    const removeEdge = () => {
      setEdges((edges) => edges.filter((edge) => edge.id !== id));
      closeModal();
    };
  
    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <button className="edgebutton" onClick={onEdgeClick}>
              ×
            </button>
          </div>
        </EdgeLabelRenderer>
  
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <p>Are you sure you want to remove this edge?</p>
            <button onClick={removeEdge}>Yes</button>
            <button onClick={closeModal}>No</button>
          </Modal>
        )}
      </>
    );
  }