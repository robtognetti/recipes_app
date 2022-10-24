import React, { useEffect, useState } from 'react';
import Buttons from '../components/Buttons';
import Card from '../components/Card';

const MAX_RENDER = 11;

export default function Meals() {
  const [mealList, setMealList] = useState([]);
  const [buttonsList, setButtonsList] = useState([]);

  useEffect(() => {
    const getMealsList = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setMealList(meals);
    };
    const getCategories = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setButtonsList(meals);
    };
    getMealsList();
    getCategories();
  }, []);

  return (
    <div>
      <Buttons categories={ buttonsList } />
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
