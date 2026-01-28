import React from 'react';
import './ShowList.css'; 

export const ShowList: React.FC = () => {   // react functional component
    const shows = [
        { id: 1, title: 'Better Call Saul', genre: 'Drama' },
        { id: 2, title: 'Stranger Things', genre: 'Sci-Fi' },
        { id: 3, title: 'Family Guy', genre: 'Comedy' },
        { id: 4, title: 'Game of Thrones', genre: 'Drama' },
        { id: 5, title: 'The Simpsons', genre: 'Comedy' },
        { id: 6, title: 'The Walking Dead', genre: 'Post-apocalyptic'},
        { id: 7, title: 'Fallout', genre: 'Sci-fi'},
        { id: 8, title: "Dexter", genre: "Crime Thriller"},
        { id: 9, title: "Spongebob Squarepants", genre: "Comedy"},
        { id: 10, title: "My Hero Academia", genre: "Action"},
        { id: 11, title: "The Crown", genre: "Historical Drama"},
        { id: 12, title: "Breaking Bad", genre: "Crime Drama"},
        { id: 13, title: "Black Mirror", genre: "Sci-fi"},
        { id: 14, title: "The Office", genre: "Comedy"},
        { id: 15, title: "Narcos", genre: "Crime Drama"},
        { id: 16, title: "Rick and Morty", genre: "Comedy"},
        { id: 17, title: "Avatar The Last Airbender", genre: "Fantasy/adventure"},
        { id: 18, title: "The Mandalorian", genre: "Sci-Fi"},
        { id: 19, title: "Supernatural", genre: "Horror/supernatural"},
        { id: 20, title: "Brooklyn Nine-Nine", genre:"Comedy"},
        { id: 21, title: "The Witcher", genre: "Fantasy"},
        { id: 22, title: "Dragon Ball Z", genre: "Action"},
        { id: 23, title: "House of The Dragon", genre: "Fantasy"},
        { id: 24, title: "The Pitt", genre: "Drama"},
        { id: 25, title: "The Last of Us", genre: "Post-apocalyptic"},
    ];

    return (
        <section className="show-list">
            <div className="section-header">
                <h2>List of shows</h2>
            </div>
            <ul>
                {shows.map(show => ( // loops over array to create list items
                    <li key={show.id}>
                        <strong>{show.title}</strong> - {show.genre}
                    </li>
                ))}
            </ul>
        </section>
    );
}