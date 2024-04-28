import React, { useState } from 'react';
import './styles.css';
import Gate from './components/Gate';
import Circuit from './components/Circuit';
import Output from './components/Output';
import ClearButton from './components/ClearButton';

function App() {
  const [circuit, setCircuit] = useState(Array(10).fill('')); 
  const [outputState, setOutputState] = useState('');
  const [circuit2, setCircuit2] = useState(Array(10).fill('')); 
  const [outputState2, setOutputState2] = useState('');
  const [circuit3, setCircuit3] = useState(Array(10).fill('')); 
  const [outputState3, setOutputState3] = useState('');

  const handleDragStart = (e, gate) => {
    e.dataTransfer.setData('text/plain', gate);
  };

  const handleDrop = (e, index, circuit, setCircuit, simulateCircuit) => {
    e.preventDefault();
    const gate = e.dataTransfer.getData('text/plain');
    const updatedCircuit = [...circuit];
    updatedCircuit[index] = gate;
    setCircuit(updatedCircuit);
    simulateCircuit(updatedCircuit);
  };

  const simulateCircuit = (circuit, setOutput) => {
    let stateVector = [1, 0]; // Initial state vector |0⟩

    circuit.forEach((gate) => {
      if (gate === 'H') {
        stateVector = applyHadamardGate(stateVector);
      } else if (gate === 'X') {
        stateVector = applyPauliXGate(stateVector);
      } else if (gate === 'Z') {
        stateVector = applyPauliZGate(stateVector);
      }
    });

    setOutput(formatStateVector(stateVector));
  };

  const applyHadamardGate = (stateVector) => {
    const hGateMatrix = [
      [Math.sqrt(1 / 2), Math.sqrt(1 / 2)],
      [Math.sqrt(1 / 2), -Math.sqrt(1 / 2)]
    ];
    return matrixVectorMultiply(hGateMatrix, stateVector);
  };

  const applyPauliXGate = (stateVector) => {
    const xGateMatrix = [
      [0, 1],
      [1, 0]
    ];
    return matrixVectorMultiply(xGateMatrix, stateVector);
  };

  const applyPauliZGate = (stateVector) => {
    const zGateMatrix = [
      [1, 0],
      [0, -1]
    ];
    return matrixVectorMultiply(zGateMatrix, stateVector);
  };

  const matrixVectorMultiply = (matrix, vector) => {
    return [
      matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
      matrix[1][0] * vector[0] + matrix[1][1] * vector[1]
    ];
  };

  const formatStateVector = (stateVector) => {
    return stateVector.map((amp, idx) => `|${idx}>: ${amp.toFixed(3)}`).join('\n');
  };

  const clearCircuit = () => {
    setCircuit(Array(10).fill(''));
    setOutputState('');
    setCircuit2(Array(10).fill(''));
    setOutputState2('');
    setCircuit3(Array(10).fill(''));
    setOutputState3('');
  };

  return (
    <div className="app">
      <Circuit
        circuit={circuit}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e, index) => handleDrop(e, index, circuit, setCircuit, (c) => simulateCircuit(c, setOutputState))}
      />
      <Circuit
        circuit={circuit2}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e, index) => handleDrop(e, index, circuit2, setCircuit2, (c) => simulateCircuit(c, setOutputState2))}
      />
      <Circuit
        circuit={circuit3}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e, index) => handleDrop(e, index, circuit3, setCircuit3, (c) => simulateCircuit(c, setOutputState3))}
      />
      <div className="gate-container">
        <Gate type="H" onDragStart={handleDragStart} />
        <Gate type="X" onDragStart={handleDragStart} />
        <Gate type="Z" onDragStart={handleDragStart} />
      </div>
      <Output outputState={outputState} />
      <Output outputState={outputState2} />
      <Output outputState={outputState3} />
      <ClearButton onClick={clearCircuit} />
    </div>
  );
}

export default App;
