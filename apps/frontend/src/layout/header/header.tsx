import { NavBar } from "../navbar/NavBar";
import { FavouriteShowSelector } from "../../components/favouriteshow/FavouriteShow";
import './header.css'

export const Header = () => (
    <header className="header-container"> 
        <h1>TV show hub</h1>
        <NavBar />
        <div className="favourite-wrapper">
            <FavouriteShowSelector />
        </div>
    </header>
)