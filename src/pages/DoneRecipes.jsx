import React, { useState } from 'react';
import ButtonsWrapper from '../components/ButtonsWrapper';
import HorizontalCard from '../components/HorizontalCard';

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

  const [recipes, setRecipes] = useState(doneRecipes);

  return (
    <section>
      <ButtonsWrapper
        recipes={ doneRecipes }
        setRecipes={ setRecipes }
        initialRecipes={ doneRecipes }
      />
      <main>
        {recipes.map((recipe, index) => (
          <HorizontalCard index={ index } key={ recipe.id } recipe={ recipe } />
        ))}
      </main>
    </section>
  );
}
