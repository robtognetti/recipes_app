import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

import FavDoneRecipes from '../pages/FavDoneRecipes';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import RecipeDetails from '../pages/RecipeDetails';
import Recipes from '../pages/Recipes';

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          path="/meals/:recipeId"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route exact path="/meals" component={ Recipes } />
        <Route
          path="/drinks/:recipeId"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ FavDoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavDoneRecipes } />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
