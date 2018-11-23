import React from 'react';

import ApolloClient from 'apollo-client';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

import manifest from '../build/asset-manifest.json';
import Pokemons from '../src/containers/Pokemons';

const path = require('path');
const fs = require('fs');

const extractAssets = (assets, chunks) =>
  Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

export default (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://graphql-pokemon.now.sh',
      fetch
    }),
    cache: new InMemoryCache()
  });

  const App = (
    <ApolloProvider client={client}>
      <Pokemons />
    </ApolloProvider>
  );

  renderToStringWithData(App).then(content => {
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      if (err) {
        console.error('err', err);
        res.status(404).end();
      }

      const modules = [];

      const extraChunks = extractAssets(manifest, modules).map(
        c => `<script type="text/javascript" src="/${c}"></script>`
      );

      const apolloState = `<script type="text/javascript">${`window.__APOLLO_STATE__=${JSON.stringify(
        client.extract()
      )};`}</script>`;

      res.status(200);
      res.send(
        htmlData
          .replace(
            '<div id="root"></div>',
            `<div id="root">${content}</div>${apolloState}`
          )
          .replace('</body>', extraChunks.join('') + '</body>')
      );
      res.end();
    });
  });
};
