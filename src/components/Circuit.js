import React from 'react';
import Qubit from './Qubit';

const Circuit = ({ circuit, onDragOver, onDrop }) => {
  return (
    <div className="circuit">
      {circuit.map((gate, index) => (
        <Qubit
          key={index}
          gate={gate}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
        />
      ))}
    </div>
  );
}

export default Circuit;
