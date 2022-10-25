import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const requestApi = async () => {
      let endpointStart;
      let destructuringKey;
      if (pathname.includes('meals')) {
        endpointStart = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i';
        destructuringKey = 'meals';
      } else {
        endpointStart = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i';
        destructuringKey = 'drinks';
      }
      const result = await fetch(`${endpointStart}=${recipeId}`).then(
        (response) => response.json(),
      );
      setRecipeDetails(result[destructuringKey][0]);
    };
    requestApi();
  }, [pathname, recipeId]);

  return (
    <div>
      Detalhes
    </div>
  );
}
