import React, { useEffect, useState } from 'react';
import Buttons from '../components/Buttons';
import Card from '../components/Card';

const MAX_RENDER = 11;

export default function Drinks() {
  const [drinksList, setDrinksList] = useState([]);
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
  }, []);

  return (
    <div>
      <Buttons categories={ buttonsList } />
      {drinksList.map((drink, i) => {
        if (i <= MAX_RENDER) {
          return (
            <section key={ drink.idDrink } data-testid={ `${i}-recipe-card` }>
              <Card thumb={ drink.strDrinkThumb } str={ drink.strDrink } index={ i } />
            </section>
          );
        }
        return (null);
      })}
    </div>
  );
}
