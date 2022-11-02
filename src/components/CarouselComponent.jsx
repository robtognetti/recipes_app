import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import CarouselHOC from './HOC/CarouselHOC';

function CarouselComponent({ carouselList }) {
  return (
    <Carousel>
      {carouselList
        && carouselList.map((item, i) => (
          <Carousel.Item key={ i }>
            <img
              className="d-inline w-50"
              src={ item[0].image }
              alt={ item[0].name }
              data-testid={ `${item[0].id}-recommendation-card` }
            />
            <img
              className="d-inline w-50"
              src={ item[1].image }
              alt={ item[1].name }
              data-testid={ `${item[1].id}-recommendation-card` }
            />
            <Carousel.Caption>
              <h4>
                <span data-testid={ `${item[0].id}-recommendation-title` }>
                  {item[0].name}
                </span>
                {' / '}
                <span data-testid={ `${item[1].id}-recommendation-title` }>
                  {item[1].name}
                </span>
              </h4>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

CarouselComponent.propTypes = {
  carouselList: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default CarouselHOC(CarouselComponent);
