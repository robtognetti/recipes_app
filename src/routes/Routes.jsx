import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import RecipeDetails from '../pages/RecipeDetails';
import RecipeInProgress from '../pages/RecipeInProgress';
import Profile from '../pages/Profile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals/:recipeId" component={ RecipeDetails } />
        <Route exact path="/drinks/:recipeId" component={ RecipeDetails } />
        <Route path="/meals/:recipeId/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:recipeId/in-progress" component={ RecipeInProgress } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
