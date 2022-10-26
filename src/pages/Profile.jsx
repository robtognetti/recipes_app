import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import ProfileImage from '../images/profileIcon.svg';

export default function Profile() {
  const email = JSON.parse(localStorage.getItem('user'))?.email ?? 'Sem Email';

  const history = useHistory();

  return (
    <section>
      <div>
        <div>
          <img src={ ProfileImage } alt="User Profile" />
          <h1>Profile</h1>
        </div>
        <div>
          <h1 data-testid="profile-email">{email}</h1>
        </div>
      </div>

      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          // onClick={() => history.push('/done-recipes')}
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          // onClick={() => history.push('/done-recipes')}
        >
          Logout
        </button>
      </div>

      <Footer />
    </section>
  );
}
