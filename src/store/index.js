import {BehaviorSubject, map, combineLatestWith} from "rxjs";


const pokemonRaw$ = new BehaviorSubject([])

const pokemonWithPower$ = pokemonRaw$.pipe(
    map(pokemon => pokemon.map(p => (
            {
                ...p,
                power: p.hp + p.attack + p.defense + p.special_attack + p.special_defense + p.speed
            })
        )
    )
)

const selected$ = new BehaviorSubject([])

const pokemon$ = pokemonWithPower$.pipe(
    combineLatestWith(selected$),
    map(([pokemon, selected]) =>
        pokemon.map(p => ({
                ...p,
                selected: selected.includes(p.id)
            })
        )
    ))

fetch('/pokemon.json')
    .then(res => res.json())
    .then(data => {
        return pokemonRaw$.next(data)
    })


export {pokemonRaw$, pokemonWithPower$, selected$, pokemon$}
