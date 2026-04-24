import { Show, SignInButton, UserButton } from '@clerk/react';
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
        <div className="auth-controls">
            <Show when="signed-out">
                <SignInButton mode="modal">
                    <button className="auth-button" type="button">Log in</button>
                </SignInButton>
            </Show>
            <Show when="signed-in">
                <UserButton />
            </Show>
        </div>
    </header>
)
