import React from 'react';
import Footer from '../components/Footer';
import ProfileImage from '../images/profileIcon.svg';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

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
        <button type="button" data-testid="profile-done-btn">
          Done Recipes
        </button>
        <button type="button" data-testid="profile-favorite-btn">
          Favorite Recipes
        </button>
        <button type="button" data-testid="profile-logout-btn">
          Logout
        </button>
      </div>

      <Footer />
    </section>
  );
}
