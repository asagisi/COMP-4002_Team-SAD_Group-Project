import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const navLinks = [
    { id: 1, label: 'Home', href: '/' },
    { id: 2, label: 'Show list', href: '/showlist' },
    { id: 3, label: 'My Shows', href: '/myshows' },
    { id: 4, label: 'Watchlist', href: '/watchlist' },
    { id: 5, label: 'Profile', href: '/profile' },
  ];

  return (
    <section className="nav-bar">
      <nav aria-label="Main navigation">
        <ul>
          {navLinks.map(link => (
            <li key={link.id}>
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};