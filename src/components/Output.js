import React from 'react';

const Output = ({ outputState }) => {
  return (
    <div className="output">
      <h2>Output Statevector:</h2>
      <pre className="statevector">{outputState}</pre>
    </div>
  );
}

export default Output;
