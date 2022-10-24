import React from 'react';
import PropTypes from 'prop-types';

export default function Buttons({ categories }) {
  const MAX_RENDER = 4;
  return (
    <section>
      { categories.map((category, i) => {
        if (i <= MAX_RENDER) {
          return (
            <button
              type="button"
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          );
        }
        return (null);
      }) }
    </section>
  );
}

Buttons.propTypes = {
  categories: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};
