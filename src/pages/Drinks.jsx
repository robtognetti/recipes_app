import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const MAX_RENDER = 11;

export default function Drinks() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [drinksList, setDrinksList] = useState([]);

  useEffect(() => {
    const getDrinksList = async () => {
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setDrinksList(drinks);
    };
    getDrinksList();
  }, []);

  return (
    <div>
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
