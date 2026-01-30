import React, { useState } from 'react';
import './ShowList.css'; 

interface Show {
    id: number;
    title: string;
    genre: string;
    year?: number;
}

export const ShowList: React.FC = () => {   // react functional component

    const [shows] = useState<Show[]>([  
        { id: 1, title: 'Better Call Saul', genre: 'Drama', year: 2015 },
        { id: 2, title: 'Stranger Things', genre: 'Sci-Fi', year: 2016 },
        { id: 3, title: 'Family Guy', genre: 'Comedy', year: 1999 },
        { id: 4, title: 'Game of Thrones', genre: 'Drama', year: 2011 },
        { id: 5, title: 'The Simpsons', genre: 'Comedy', year: 1989 },
        { id: 6, title: 'The Walking Dead', genre: 'Post-apocalyptic', year: 2010},
        { id: 7, title: 'Fallout', genre: 'Sci-fi', year: 2024},
        { id: 8, title: "Dexter", genre: "Crime Thriller", year: 2006},
        { id: 9, title: "Spongebob Squarepants", genre: "Comedy", year: 1999},
        { id: 10, title: "My Hero Academia", genre: "Action", year: 2016},
        { id: 11, title: "The Crown", genre: "Historical Drama", year: 2016},
        { id: 12, title: "Breaking Bad", genre: "Crime Drama", year: 2008},
        { id: 13, title: "Black Mirror", genre: "Sci-fi", year: 2011},
        { id: 14, title: "The Office", genre: "Comedy", year: 2005},
        { id: 15, title: "Narcos", genre: "Crime Drama", year: 2015},
        { id: 16, title: "Rick and Morty", genre: "Comedy", year: 2013},
        { id: 17, title: "Avatar The Last Airbender", genre: "Fantasy/adventure", year: 2005},
        { id: 18, title: "The Mandalorian", genre: "Sci-Fi", year: 2019},
        { id: 19, title: "Supernatural", genre: "Horror/supernatural", year: 2005},
        { id: 20, title: "Brooklyn Nine-Nine", genre:"Comedy", year: 2013},
        { id: 21, title: "The Witcher", genre: "Fantasy", year: 2019},
        { id: 22, title: "Dragon Ball Z", genre: "Action", year : 1986},
        { id: 23, title: "House of The Dragon", genre: "Fantasy", year: 2022},
        { id: 24, title: "The Pitt", genre: " Medical Drama", year: 2025},
        { id: 25, title: "The Last of Us", genre: "Post-apocalyptic", year: 2023},
        { id: 26, title: "House M.D", genre: "Medical Drama", year: 2004},
        { id: 27, title: "Invincible", genre: "Action", year: 2021},
        { id: 28, title: "The Boys", genre: "Action", year: 2019},
        { id: 29, title: "Shameless", genre: "Comedy-drama", year: 2011},
        { id: 30, title: "Pluribus", genre: "Sci-Fi", year: 2025},
        { id: 31, title: "My Hero Academia", genre: "Action", year: 2016},
    ]);
    
    
    const [searchShow, setSearchShow] = useState('');

    const filteredShow = shows.filter(show =>
        show.title.toLowerCase().includes(searchShow.toLowerCase())
    );


    return (
        <section className="show-list">
            <div className="section-header">
                <h2>List of shows</h2>
            </div>
            <input
            type="text"
            placeholder="Search shows..."
            value={searchShow}
            onChange={e => setSearchShow(e.target.value)}
            />
            <ul>
                {filteredShow.map(show => (
                    <ul key={show.id}>
                        <strong>{show.title}</strong> - {show.genre} ({show.year})
                    </ul>
                ))}
            </ul>
        </section>
    );
}