import React, { useEffect, useState, useContext } from 'react';
import Buttons from './Buttons';
import Card from './Card';
import Footer from './Footer';
import AppContext from '../context/AppContext';

const MAX_RENDER = 11;

export default function Meals() {
  const { mealList, setMealList } = useContext(AppContext);
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
  }, [setMealList]);

  return (
    <>
      <Buttons categories={ buttonsList } type="meals" />
      {
        mealList.map((meal, i) => {
          if (i <= MAX_RENDER) {
            return (
              <section key={ meal.idMeal } data-testid={ `${i}-recipe-card` }>
                <Card
                  thumb={ meal.strMealThumb }
                  str={ meal.strMeal }
                  index={ i }
                  idMeal={ meal.idMeal }
                />
              </section>
            );
          }
          return (null);
        })
      }
      <Footer />
    </>
  );
}
