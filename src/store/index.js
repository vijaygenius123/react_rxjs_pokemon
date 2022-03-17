import {BehaviorSubject, map} from "rxjs";


const pokemonRaw$ = new BehaviorSubject([])
const selected$ = new BehaviorSubject([])

const pokemonWithPower$ = pokemonRaw$.pipe(
    map(pokemon => {
            return pokemon.map(p => {
                return {
                    ...p,
                    power: p.hp + p.attack + p.defense + p.special_attack + p.special_defense + p.speed
                }
            })
        }
    )
)

fetch('/pokemon.json')
    .then(res => res.json())
    .then(data => {
        return pokemonRaw$.next(data)
    })



export {pokemonRaw$, pokemonWithPower$, selected$}
