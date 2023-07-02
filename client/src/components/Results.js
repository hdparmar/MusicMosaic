// src/components/Results.js

import React from 'react';

function Results({ results }) {
  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <h3>{result.name}</h3>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;