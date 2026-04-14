import React from 'react';
import './ProfilePage.css';

export const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <section className="profile-card">
        <h2>Account</h2>
        <p className="profile-empty">Log in to view your profile... hurry up log in! oh what? can't? the team didn't integrate authentication yet?</p>
      </section>

      <section className="profile-card">
        <h2>Show list (maybe total shows hidden?)</h2>
        <p className="profile-empty">needs work.</p>
      </section>

      <section className="profile-card">
        <h2>Watchlist overview (maybe total shows in list?)</h2>
        <p className="profile-empty">needs work.</p>
      </section>

      <section className="profile-card">
        <h2>My Shows (again maybe total shows?)</h2>
        <p className="profile-empty">needs work.</p>
      </section>
    </div>
  );
};
