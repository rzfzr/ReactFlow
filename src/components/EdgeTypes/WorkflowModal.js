import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import cx from 'classnames';

import styles from './NodeTypes.module.css';
import useNodeClickHandler from '../hooks/useNodeClick';
import Modal from '../customEdges/Modal';

const WorkflowModal = ({ id, data }) => {
  const onClick = useNodeClickHandler(id);

  return (
    <div
      onClick={onClick}
      className={cx(styles.node)}
      title="click to open modal"
    >
      {data.label}
        <Modal
            onClose={() => {
                console.log('close');
            }}
        >
            <div>
                <h1>Modal</h1>
                <p>Modal content</p>
            </div>
        </Modal>
    </div>
  );
};

export default memo(WorkflowModal);
