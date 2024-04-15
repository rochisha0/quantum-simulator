import React from 'react';

const Qubit = ({ gate, onDragOver, onDrop }) => {
  return (
    <div
      className="qubit"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {gate ? gate : 'Empty'}
    </div>
  );
}

export default Qubit;
