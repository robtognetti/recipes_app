import React from 'react';
import ShareIcon from '../images/shareIcon.svg';

// [{
//     id: id-da-receita,
//     type: meal-ou-drink,
//     nationality: nacionalidade-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita,
//     doneDate: quando-a-receita-foi-concluida,
//     tags: array-de-tags-da-receita-ou-array-vazio
// }]

export default function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];

  return (
    <section>
      <div>
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-meal-btn">
          Meals
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
      </div>

      <main>
        {doneRecipes.map((recipe, index) => (
          <div key={recipe.id}>
            <img
              src={recipe.image}
              alt={recipe.name}
              data-testid={`${index}-horizontal-image`}
            />
            <div>
              <h3 data-testid={`${index}-horizontal-name`}>{recipe.name}</h3>
              <span data-testid={`${index}-horizontal-top-text`}>
                {recipe.category}
              </span>
            </div>
            <p>
              Done:{' '}
              <span data-testid={`${index}-horizontal-done-date`}>
                {recipe.doneDate}
              </span>
            </p>
            <img
              src={ShareIcon}
              alt="Share"
              data-testid={`${index}-horizontal-share-btn`}
            />

            {recipe.tags.map((tag) => (
              <span data-testid={`${index}-${tag}-horizontal-tag`}>{tag}</span>
            ))}
          </div>
        ))}
      </main>
    </section>
  );
}
