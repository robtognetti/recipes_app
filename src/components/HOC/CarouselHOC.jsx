import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipesListForCarousel } from '../../utils/getRecipes';

const CarouselHOC = (Component) => {
  function Carousel() {
    const [carouselList, setCarouselList] = useState([]);

    const { pathname } = useLocation();

    // Ao contrário porque para a página de meals precisa-se de exibir os drinks
    // E na página de drinks os meals.
    const type = pathname.includes('/drinks') ? 'meals' : 'drinks';

    useEffect(() => {
      getRecipesListForCarousel(setCarouselList, type);
    }, [type]);

    return <Component carouselList={ carouselList } />;
  }
  return Carousel;
};

export default CarouselHOC;
