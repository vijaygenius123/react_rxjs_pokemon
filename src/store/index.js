import {BehaviorSubject, map} from "rxjs";


const pokemon$ = new BehaviorSubject([])

const pokemonWithPower$ = pokemon$.pipe(
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
        console.log(data)
        return pokemon$.next(data)
    })


export {pokemon$,pokemonWithPower$}
