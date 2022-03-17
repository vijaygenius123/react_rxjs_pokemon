import {useEffect, useState, useMemo} from "react";
import './App.css';
import {pokemonWithPower$, selected$} from "./store";


const Search = () => {
    const [search, setSearch] = useState('')
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        const sub = pokemonWithPower$.subscribe(setPokemon)
        return sub.unsubscribe()
    }, [])

    const filteredPokemon = useMemo(() => {
        return pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }, [pokemon, search])

    selected$.subscribe(console.log)
    return (
        <div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
            <div>
                {filteredPokemon.map(p => <div key={p.id}>
                    <input type="checkbox"
                           checked={selected$.value.includes(p.id)}
                           onChange={() => {
                               if (selected$.value.includes(p.id)) {
                                   selected$.next(selected$.value.filter(id => id !== p.id))
                               } else {
                                   selected$.next([...selected$.value, p.id])
                               }
                           }}
                    />
                    <strong>{p.name}</strong> - {p.power}
                </div>)}
            </div>
        </div>
    )
}

function App() {
    const [pokemons, setPokemons] = useState([])
    useEffect(() => {
        const sub = pokemonWithPower$.subscribe(setPokemons)

        return () => sub.unsubscribe();
    }, [])
    return (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <Search/>
            <ul>
                {pokemons.map(pokemon => <li key={pokemon.id}>{pokemon.name}</li>)}
            </ul>
        </div>
    );
}

export default App;
