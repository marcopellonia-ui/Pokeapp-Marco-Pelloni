import { pokemonesDefecto } from "./db/pokemones.js";
import { usuariosDefecto } from "./db/usuarios.js";

// Si todavía no hay datos guardados, se cargan los datos iniciales.
function inicializarDatos(clave, datosIniciales) {
  if (localStorage.getItem(clave) === null) {
    localStorage.setItem(clave, JSON.stringify(datosIniciales));
  }
}

inicializarDatos("pokemones", pokemonesDefecto);
inicializarDatos("usuarios", usuariosDefecto);

function leerDatos(clave) {
  try {
    const datos = JSON.parse(localStorage.getItem(clave));
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error(`No se pudieron leer los datos de ${clave}:`, error);
    return [];
  }
}

export function leerPokemones() { return leerDatos("pokemones"); }
export function leerUsuarios() { return leerDatos("usuarios"); }
export function guardarPokemones(pokemon) {
  const pokemones = leerPokemones();
  pokemones.push(pokemon);
  localStorage.setItem("pokemones", JSON.stringify(pokemones));
}
export function guardarUsuarios(usuario) {
  const usuarios = leerUsuarios();
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
