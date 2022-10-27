import React, { useEffect, useState, useContext } from 'react';
import Buttons from './Buttons';
import Card from './Card';
import Footer from './Footer';
import AppContext from '../context/AppContext';

const MAX_RENDER = 11;

export default function Drinks() {
  const { drinksList, setDrinksList } = useContext(AppContext);
  const [buttonsList, setButtonsList] = useState([]);

  useEffect(() => {
    const getDrinksList = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setDrinksList(drinks);
    };
    const getCategories = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setButtonsList(drinks);
    };
    getDrinksList();
    getCategories();
  }, [setDrinksList]);

  return (
    <>
      <Buttons categories={ buttonsList } type="drinks" />
      {
        drinksList && drinksList.map((drink, i) => {
          if (i <= MAX_RENDER) {
            return (
              <section key={ drink.idDrink } data-testid={ `${i}-recipe-card` }>
                <Card
                  thumb={ drink.strDrinkThumb }
                  str={ drink.strDrink }
                  index={ i }
                  idMeal={ drink.idDrink }
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
