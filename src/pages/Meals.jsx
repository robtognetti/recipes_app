import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const MAX_RENDER = 11;

export default function Meals() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [mealList, setMealList] = useState([]);

  useEffect(() => {
    const getMealsList = async () => {
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setMealList(meals);
    };
    getMealsList();
  }, []);

  return (
    <div>
      {mealList.map((meal, i) => {
        if (i <= MAX_RENDER) {
          return (
            <section key={ meal.idMeal } data-testid={ `${i}-recipe-card` }>
              <Card thumb={ meal.strMealThumb } str={ meal.strMeal } index={ i } />
            </section>
          );
        }
        return (null);
      })}
    </div>
  );
}
