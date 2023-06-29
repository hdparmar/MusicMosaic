// src/components/Results.js

import React from 'react';

const Results = ({ results }) => {
  return (
    <div>
      {results.map(result => (
        <div key={result.id}>
          {/* Display the result here. This will depend on the structure of the result object. */}
        </div>
      ))}
    </div>
  );
};

export default Results;
