import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

export default function DrinkCarousel() {
  const [carouselList, setCarouselList] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const MAX_NUMBER = 6;
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      const limitedArray = drinks.slice(0, MAX_NUMBER);
      const newArr = [];
      for (let i = 0; i < MAX_NUMBER; i += 2) {
        newArr.push([
          {
            drinkImage: limitedArray[i].strDrinkThumb,
            drinkName: limitedArray[i].strDrink,
            id: i,
          },
          {
            drinkImage: limitedArray[i + 1].strDrinkThumb,
            drinkName: limitedArray[i + 1].strDrink,
            id: i + 1,
          },
        ]);
      }
      setCarouselList(newArr);
    };
    fetchApi();
  }, []);

  return (
    <Carousel>
      {carouselList
        && carouselList.map((item, i) => (
          <Carousel.Item key={ i }>
            <img
              className="d-inline w-50"
              src={ item[0].drinkImage }
              alt={ item[0].drinkName }
              data-testid={ `${item[0].id}-recommendation-card` }
            />
            <img
              className="d-inline w-50"
              src={ item[1].drinkImage }
              alt={ item[1].drinkName }
              data-testid={ `${item[1].id}-recommendation-card` }
            />
            <Carousel.Caption>
              <h4>
                <span data-testid={ `${item[0].id}-recommendation-title` }>
                  {item[0].drinkName}
                </span>
                {' / '}
                <span data-testid={ `${item[1].id}-recommendation-title` }>
                  {item[1].drinkName}
                </span>
              </h4>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}
