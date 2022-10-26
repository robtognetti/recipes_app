import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';

import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Login from '../pages/Login';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import RecipeInProgress from '../pages/RecipeInProgress';
// import Recipes from '../pages/Recipes';

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/meals/:recipeId" component={ <div>Meal</div> } />
        <Route path="/meals/:recipeId/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:recipeId" component={ <div>Drink</div> } />
        <Route path="/drinks/:recipeId/in-progress" component={ RecipeInProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}
