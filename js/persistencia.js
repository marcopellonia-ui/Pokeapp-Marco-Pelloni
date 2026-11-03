import { pokemonesDefecto } from "./db/pokemones.js";
import { usuariosDefecto } from "./db/usuarios.js";

let bdPokemonesExiste = localStorage.getItem("pokemones");
let bdUsuariosExiste = localStorage.getItem("usuarios");

if (bdPokemonesExiste === null) {
  let pokemonesJson = JSON.stringify(pokemonesDefecto);
  localStorage.setItem("pokemones", pokemonesJson);
  console.log("BD de pokemones no existe, se crea en localStorage");
} else {
  console.log("BD de pokemones existe en localStorage");
}

if (bdUsuariosExiste === null) {
  let usuariosJson = JSON.stringify(usuariosDefecto);
  localStorage.setItem("usuarios", usuariosJson);
  console.log("BD de usuarios no existe, se crea en localStorage");
} else {
  console.log("BD de usuarios existe en localStorage");
}

export function leerPokemones() {
  let pokemonesJson = localStorage.getItem("pokemones");
  const pokemonesRead = JSON.parse(pokemonesJson);
  return pokemonesRead;
}

export function leerUsuarios() {
  let usuariosJson = localStorage.getItem("usuarios");
  const usuariosRead = JSON.parse(usuariosJson);
  return usuariosRead;
}

export function guardarPokemones(pokemon) {
  let pokemones = leerPokemones();
  pokemones.push(pokemon);
  localStorage.setItem("pokemones", JSON.stringify(pokemones));
  console.log(`Pokémon ${pokemon.nombre} guardado en localStorage`);
}

export function guardarUsuarios(usuario) {
  let usuarios = leerUsuarios();
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  console.log(`Usuario ${usuario.nombre} guardado en localStorage`);
}
// EJERCICIO DE CLASE

// const colegio1 = {
//   nombre: "Del Carmen",
//   direccion: "Calle 123",
//   telefono: "555-1234",
// };
// const colegio2 = {
//   nombre: "San Jose",
//   direccion: "Avenida 456",
//   telefono: "555-5678",
// };

// // console.log(localStorage);

// let colegio1json = JSON.stringify(colegio1);

// localStorage.setItem("colegio-1", colegio1json);
// localStorage.setItem("colegio-2", colegio2);

// let colegioRead1 = localStorage.getItem("colegio-1");
// let colegioRead2 = localStorage.getItem("colegio-2");

// let colegio1Parsed1 = JSON.parse(colegioRead1);

// console.log(colegio1Parsed1);
// console.log(colegioRead2);
