import React, { useState } from 'react';
import './ShowList.css'; 
import { shows } from '../data/shows';


export const ShowList: React.FC = () => {   // react functional component
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
                    <li key={show.id}>
                        <strong>{show.title}</strong> - {show.genre} ({show.year})
                    </li>
                ))}
            </ul>
        </section>
    );
}