import React from 'react';
//import { useData } from '../utilities/useData';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//import React, {useState} from 'react';
import Main from './components/Main';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;