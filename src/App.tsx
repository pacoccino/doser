import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";

import Layout from './components/Layout';
import Home from './components/Home';
import theme from './theme';
import {DoserContextProvider} from "./contexts/doser";

function App() {
  return (
    <ChakraProvider theme={theme}>
        <DoserContextProvider>
          <Layout>
            <Home/>
          </Layout>
        </DoserContextProvider>
    </ChakraProvider>
  );
}

export default App;
