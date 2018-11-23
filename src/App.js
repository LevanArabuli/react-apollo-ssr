import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Pokemons from './containers/Pokemons';

const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh'
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
