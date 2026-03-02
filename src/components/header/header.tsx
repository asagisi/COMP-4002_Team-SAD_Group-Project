import { NavBar } from "../navbar/NavBar";
import { FavouriteShowSelector } from "../favouriteshow/FavouriteShow";
import { type Show } from "../../types/Show";
import './header.css'

interface HeaderProps {
    currentFavourite: Show | null;
    setCurrentFavourite: (show: Show | null) => void;
}

export const Header = ({ currentFavourite, setCurrentFavourite }: HeaderProps) => (
    <header className="header-container"> 
        <h1>TV show hub</h1>
        <NavBar />
        <div className="favourite-wrapper">
            <FavouriteShowSelector 
                currentFavourite={currentFavourite}
                setCurrentFavourite={setCurrentFavourite}
            />
        </div>
    </header>
)