import React from 'react';
import GlobalStyle from '../../styles/global';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

export default Layout;
