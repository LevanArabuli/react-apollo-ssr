import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Pokemons from './containers/Pokemons';

const state = window.__APOLLO_STATE__;
delete window.__APOLLO_STATE__;

const cache = new InMemoryCache().restore(state);

const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh',
  cache
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Pokemons />
      </ApolloProvider>
    );
  }
}

export default App;
