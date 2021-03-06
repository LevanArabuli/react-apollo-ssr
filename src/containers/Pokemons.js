import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Pokemon from '../components/Pokemon';

const GET_POKEMONS = gql`
  {
    pokemons(first: 20) {
      id
      name
      classification
      image
    }
  }
`;

const Pokemons = () => (
  <Query query={GET_POKEMONS}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div>loading...</div>;
      }

      if (error) {
        return <div>{error}</div>;
      }

      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {data.pokemons.map(p => (
            <Pokemon key={p.id} {...p} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default Pokemons;
