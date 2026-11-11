// Archivo de práctica: ejemplos de recorrido de un array de Pokémon.
import { pokemonesDefecto } from "./db/pokemones.js";

console.log("Todos los Pokémon:", pokemonesDefecto);
console.log("Primer Pokémon:", pokemonesDefecto[0]);
console.log("Nombre del primer Pokémon:", pokemonesDefecto[0].nombre);

// Buscar un Pokémon por nombre (sin distinguir mayúsculas/minúsculas).
const nombreBuscado = "Pikachu";
const pokemonEncontrado = pokemonesDefecto.find(pokemon => pokemon.nombre.toLowerCase() === nombreBuscado.toLowerCase());
console.log(pokemonEncontrado ? "Encontrado:" : "No encontrado:", pokemonEncontrado || nombreBuscado);
