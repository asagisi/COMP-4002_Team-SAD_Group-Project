import React from 'react';
import { useUser, SignInButton, Show } from '@clerk/react';
import './ProfilePage.css';

export const ProfilePage: React.FC = () => {
  const { user } = useUser();


  // more simple to just not render user related data i think.
  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <Show when="signed-out">
        <section className="profile-card">
          <p className="profile-empty">Sign in to view your profile.</p>
          <SignInButton mode="modal">
            <button className="profile-auth-button" type="button">Log in</button>
          </SignInButton>
        </section>
      </Show>

      <Show when="signed-in">
        <section className="profile-card">
          <h2>Account</h2>
          <p>{user?.fullName ?? user?.primaryEmailAddress?.emailAddress}</p>
        </section>
      </Show>
    </div>
  );
};
