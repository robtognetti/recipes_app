const getKey = (obj) => obj.meals ?? obj.drinks;

export default function setItems({
  items,
  pathname,
  history,
  setMealList,
  setDrinksList,
}) {
  try {
    const arrayItems = getKey(items);

    if (arrayItems.length === 1) {
      const id = arrayItems[0].idDrink ?? arrayItems[0].idMeal;
      history.push(`${pathname}/${id}`);
    }

    const maxRecipesOnScreen = 12;
    const recipes = arrayItems.filter((_, index) => index < maxRecipesOnScreen);

    if (pathname === '/meals') {
      setMealList(recipes);
    } else {
      setDrinksList(recipes);
    }
  } catch (error) {
    // TODO: Tratar o erro;
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
}
