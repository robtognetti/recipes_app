import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

export default function MealCarousel() {
  const [carouselList, setCarouselList] = useState([]);
  useEffect(() => {
    const MAX_NUMBER = 6;
    const fetchApi = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpoint).then((response) => response.json());
      const limitedArray = meals.slice(0, MAX_NUMBER);
      const newArr = [];
      for (let i = 0; i < MAX_NUMBER; i += 2) {
        newArr.push([
          {
            mealImage: limitedArray[i].strMealThumb,
            mealName: limitedArray[i].strMeal,
            id: i,
          },
          {
            mealImage: limitedArray[i + 1].strMealThumb,
            mealName: limitedArray[i + 1].strMeal,
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
                src={ item[0].mealImage }
                alt={ item[0].mealName }
                data-testid={ `${item[0].id}-recommendation-card` }
              />
              <img
                className="d-inline w-50"
                src={ item[1].mealImage }
                alt={ item[1].mealName }
                data-testid={ `${item[1].id}-recommendation-card` }
              />
              <Carousel.Caption>
                <h4>
                  <span data-testid={ `${item[0].id}-recommendation-title` }>
                    {item[0].mealName}
                  </span>
                  {' / '}
                  <span data-testid={ `${item[1].id}-recommendation-title` }>
                    {item[1].mealName}
                  </span>
                </h4>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
    </Carousel>
  );
}
