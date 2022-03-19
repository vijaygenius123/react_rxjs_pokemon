import {useEffect, useState, useMemo} from "react";
import {deck$, pokemon$, selected$} from "./store";
import {useObservableState} from "observable-hooks";
import './App.css';

const Deck = () => {
    const deck = useObservableState(deck$, [])

    return (
        <div>
            <h4>Deck</h4>
            {deck.map(p => (
                <div key={p.id} className="flex">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                    />
                    <div>
                        <div>{p.name}</div>
                    </div>
                </div>
            ))}
    </div>
    )
}

const Search = () => {
    const [search, setSearch] = useState('')
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        const sub = pokemon$.subscribe(setPokemon)
        return () => sub.unsubscribe()
    }, [])

    const filteredPokemon = useMemo(() => {
        return pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }, [pokemon, search])

    return (
        <div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
            <div>
                {filteredPokemon.map(p => <div key={p.id}>
                    <input type="checkbox"
                           checked={p.selected}
                           id={p.id}
                           onChange={() => {
                               if (selected$.value.includes(p.id)) {
                                   selected$.next(selected$.value.filter(id => id !== p.id))
                               } else {
                                   selected$.next([...selected$.value, p.id])
                               }
                           }}
                    />
                    <label htmlFor={p.id}><strong>{p.name}</strong> - {p.power}</label>
                </div>)}
            </div>
        </div>
    )
}

function App() {
    const [pokemons, setPokemons] = useState([])
    useEffect(() => {
        const sub = pokemon$.subscribe(setPokemons)

        return () => sub.unsubscribe();
    }, [])
    return (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <Search/>
            <Deck/>
        </div>
    );
}

export default App;
