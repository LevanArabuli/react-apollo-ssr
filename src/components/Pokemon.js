import React from 'react';

const Pokemon = ({ name, classification, image }) => (
  <div style={{ margin: 'auto', width: 300 }}>
    <h2>{name}</h2>
    <p>{classification}</p>
    <img style={{ width: 200, height: 200 }} alt="avatar" src={image} />
  </div>
);

export default Pokemon;
