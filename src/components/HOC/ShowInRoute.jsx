import React from 'react';
import { useLocation } from 'react-router-dom';

const showInRoute = (Component, routes) => {
  function WithRouter() {
    const { pathname } = useLocation();
    if (routes.includes(pathname.replace('/', ''))) {
      return <Component />;
    }
  }
  return WithRouter;
};

export default showInRoute;
