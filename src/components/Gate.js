import React from 'react';

const Gate = ({ type, onDragStart }) => {
  return (
    <div className="gate" draggable onDragStart={(e) => onDragStart(e, type)}>
      {type}
    </div>
  );
}

export default Gate;
