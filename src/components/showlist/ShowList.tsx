import React from 'react'; 

export const ShowList: React.FC = () => {   // react functional component
    const shows = [
        { id: 1, title: 'Better Call Saul', genre: 'Drama' },
        { id: 2, title: 'Stranger Things', genre: 'Sci-Fi' },
        { id: 3, title: 'Family Guy', genre: 'Comedy' },
        { id: 4, title: 'Game of Thrones', genre: 'Drama' },
        { id: 5, title: 'The Simpsons', genre: 'Comedy' },
        { id: 6, title: 'The Walking Dead', genre: 'Horror' },
        { id: 7, title: 'Fallout', genre: 'Sci-fi'},
        { id: 8, title: "Dexter", genre: "Crime Thriller"},
        { id: 9, title: "Spongebob Squarepants", genre: "Comedy"},
        { id: 10, title: "My Hero Academia", genre: "Action"},
        
    ];

    return (
        <section className="show-list">
            <h2>List of shows</h2>
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