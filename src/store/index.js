import {BehaviorSubject} from "rxjs";


const pokemon$ = new BehaviorSubject([])

fetch('/pokemon.json')
    .then(res => res.json())
    .then(data => pokemon$.next(data))


export {pokemon$}
