import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache()
});

const root = createRoot(document.getElementById('root')!);
root.render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
