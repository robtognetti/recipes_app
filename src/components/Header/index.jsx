import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchIcon from '../../images/searchIcon.svg';
import Usericon from '../../images/profileIcon.svg';
import HeaderTittle from './HeaderTitle';
import SearchBar from './SearchBar';
import showInRoute from '../HOC/ShowInRoute';

function Header() {
  const { pathname } = useLocation();
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  return (
    <header className="header">
      <div>
        <div className="logo-container">
          <h2>Logo</h2>
        </div>

        <div className="buttons-container">
          {(pathname === '/meals' | pathname === "/drinks")  && (
            <button type="button" onClick={ () => setShowInput(!showInput) }>
              <img src={ SearchIcon } alt="Search" data-testid="search-top-btn" />
            </button>
          )}
          <button type="button" onClick={ () => history.push('/profile') }>
            <img src={ Usericon } alt="User" data-testid="profile-top-btn" />
          </button>
        </div>
      </div>
      <div className="title-container">
        <HeaderTittle route={ pathname } />
      </div>
      {showInput && <SearchBar />}
    </header>
  );
}

export default showInRoute(Header, [
  'meals',
  'drinks',
  'profile',
  'done-recipes',
  'favorite-recipes',
]);
