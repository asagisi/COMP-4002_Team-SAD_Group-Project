import React from 'react';

export const ShowList: React.FC = () => {   
    const shows = [
        { id: 1, title: 'Better Call Saul', genre: 'Drama' },
        { id: 2, title: 'Stranger Things', genre: 'Sci-Fi' },
        { id: 3, title: 'Family Guy', genre: 'Comedy' },
        { id: 4, title: 'Game of Thrones', genre: 'Drama' },
        { id: 5, title: 'The Simpsons', genre: 'Comedy' },
        { id: 6, title: 'The Walking Dead', genre: 'Horror' },
        
    ];

    return (
        <section className="show-list">
            <h2>List of shows</h2>
            <ul>
                {shows.map(show => (
                    <li key={show.id}>
                        <strong>{show.title}</strong> - {show.genre}
                    </li>
                ))}
            </ul>
        </section>
    );
}