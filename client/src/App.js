import React from 'react';
import Index from '../src/pages/index';
import Layout from '../src/components/Layout';
import io from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

const socket = io(process.env.REACT_APP_HOST);

const App = () => {
  return (
    <Layout>
      <Index socket={socket}></Index>
    </Layout>
  );
};

export default App;
