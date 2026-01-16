import React from 'react';

export const NavBar: React.FC = () => {
  const navLinks = [
    { id: 1, label: 'Home', href: '/' },
    { id: 2, label: 'My Shows', href: '/shows' },
    { id: 3, label: 'Watchlist', href: '/watchlist' },
    { id: 4, label: 'Profile', href: '/profile' },
  ];

  return (
    <section className="nav-bar">
      <nav aria-label="Main navigation">
        <ul>
          {navLinks.map(link => (
            <li key={link.id}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};