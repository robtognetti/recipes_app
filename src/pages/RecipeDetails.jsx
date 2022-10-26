import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinkDetails from '../components/DrinkDetails';
import MealDetails from '../components/MealDetails';

export default function RecipeDetails() {
  const { pathname } = useLocation();

  if (pathname.includes('meals')) {
    return <MealDetails />;
  }
  return <DrinkDetails />;
}
