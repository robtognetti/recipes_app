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
                className="d-block w-100"
                src={ item[0].mealImage }
                alt={ item[0].mealName }
                data-testid={ `${item[0].id}-recommendation-card` }
              />
              <img
                className="d-block w-100"
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

  // <Carousel>
  //   <Carousel.Item>
  //     <img
  //       className="d-block w-100"
  //       src="holder.js/800x400?text=First slide&bg=373940"
  //       alt="First slide"
  //     />
  //     <Carousel.Caption>
  //       <h3>First slide label</h3>
  //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  //     </Carousel.Caption>
  //   </Carousel.Item>
  //   <Carousel.Item>
  //     <img
  //       className="d-block w-100"
  //       src="holder.js/800x400?text=Second slide&bg=282c34"
  //       alt="Second slide"
  //     />

  //     <Carousel.Caption>
  //       <h3>Second slide label</h3>
  //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  //     </Carousel.Caption>
  //   </Carousel.Item>
  //   <Carousel.Item>
  //     <img
  //       className="d-block w-100"
  //       src="holder.js/800x400?text=Third slide&bg=20232a"
  //       alt="Third slide"
  //     />

  //     <Carousel.Caption>
  //       <h3>Third slide label</h3>
  //       <p>
  //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
  //       </p>
  //     </Carousel.Caption>
  //   </Carousel.Item>
  // </Carousel>
  // </div>
  );
}
