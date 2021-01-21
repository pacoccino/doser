import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";

import Layout from './components/Layout';
import Home from './components/Home';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Home/>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
