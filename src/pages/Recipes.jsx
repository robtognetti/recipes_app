import React from 'react';
import { useHistory } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';

export default function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  switch (pathname) {
  case '/meals':
    return <Meals />;
  case '/drinks':
    return <Drinks />;
  default:
    break;
  }
}
