import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DrinkDetails from '../components/DrinkDetails';
import MealDetails from '../components/MealDetails';
import AppContext from '../context/AppContext';

export default function RecipeDetails() {
  const { pathname } = useLocation();

  if (pathname.includes('meals')) {
    return <MealDetails />;
  }
  return <DrinkDetails />;
}
