import {useEffect, useState} from "react";
import './App.css';
import {pokemon$} from "./store";

function App() {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        const sub = pokemon$.subscribe(setPokemons)
        return () => sub.unsubscribe();
    }, [])
    return (
        <div>
            <ul>
                {pokemons.map(pokemon => <li key={pokemon.id}>{pokemon.name}</li>)}
            </ul>
        </div>
    );
}

export default App;
