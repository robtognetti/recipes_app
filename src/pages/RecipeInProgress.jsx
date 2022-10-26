import React from 'react';
import { useLocation } from 'react-router-dom';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

export default function RecipeInProgress() {
  const { pathname } = useLocation();

  if (pathname.includes('meals')) {
    return <MealInProgress />;
  }
  return <DrinkInProgress />;
}
