import React from 'react';

const ClearButton = ({ onClick }) => {
  return (
    <button className="clear-btn" onClick={onClick}>Clear Circuit</button>
  );
}

export default ClearButton;
