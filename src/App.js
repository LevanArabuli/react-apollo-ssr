import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import Pokemons from './containers/Pokemons';

const state = window.__APOLLO_STATE__;
delete window.__APOLLO_STATE__;

const cache = new InMemoryCache().restore(state);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'https://graphql-pokemon.now.sh',
      credentials: 'same-origin'
    })
  ]),
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
