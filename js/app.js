import { leerPokemones, guardarPokemones, leerUsuarios, guardarUsuarios } from "./persistencia.js";

const app = document.querySelector("#app");
const logo = document.querySelector(".header-logo img");
const linkPokedex = document.querySelector("#link-pokedex");
const linkLogin = document.querySelector("#link-login");
const linkRegistro = document.querySelector("#link-registro");
const linkBatalla = document.querySelector("#link-juego");
const formularioBusqueda = document.querySelector("#form-busqueda");
let usuarioActual = null;
let pokemonSeleccionado = null;

function mostrarInicio() {
  app.innerHTML = `<section class="landing"><h1>¡Bienvenido a PokeApp!</h1><p>Explorá, conocé y descubrí Pokémon.</p><p>Entrá a la Pokédex para consultar sus características o iniciá una batalla.</p><div class="landing-actions"><button id="inicio-pokedex" data-accion="inicio-pokedex">Explorar Pokédex</button><button id="inicio-batalla" data-accion="inicio-batalla">Ir a batalla</button></div></section>`;
}

function mostrarPokedex(filtro = "") {
  const pokemones = leerPokemones().filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()));
  app.innerHTML = `<section class="pokedex-section"><h1>Pokédex</h1><p>Pokémon registrados: ${leerPokemones().length}</p><div class="pokedex-gallery">${pokemones.map(p => `<article class="pokemon-card"><div class="pokemon-image"><img src="${p.imagen}" alt="${p.nombre}"></div><div class="pokemon-info"><span class="pokemon-id">N.º ${p.id}</span><h2>${p.nombre}</h2><div class="pokemon-types">${p.tipo.map(t => `<span class="type">${t}</span>`).join("")}</div><p class="pokemon-rareza">${p.rareza}</p><button class="btn-detalle" data-accion="detalle" data-id="${p.id}">Ver detalles</button></div></article>`).join("") || "<p>No se encontraron Pokémon.</p>"}</div></section>`;
}

function mostrarDetalle(id) {
  const pokemon = leerPokemones().find(p => p.id === Number(id));
  if (!pokemon) { mostrarPokedex(); return; }
  pokemonSeleccionado = pokemon;
  app.innerHTML = `<section class="detalle-section"><button class="btn-secundario" data-accion="volver-pokedex">← Volver a la Pokédex</button><h1>${pokemon.nombre}</h1><div class="detalle-contenido"><img class="detalle-imagen" src="${pokemon.imagen}" alt="${pokemon.nombre}"><div><p><strong>Número:</strong> ${pokemon.id}</p><p><strong>Tipo:</strong> ${pokemon.tipo.join(" / ")}</p><p><strong>Descripción:</strong> ${pokemon.descripcion}</p><p><strong>Altura:</strong> ${pokemon.altura} m</p><p><strong>Peso:</strong> ${pokemon.peso} kg</p><p><strong>Generación:</strong> ${pokemon.generacion}</p><p><strong>Rareza:</strong> ${pokemon.rareza}</p><p><strong>Habilidad:</strong> ${pokemon.habilidad}</p><p><strong>HP:</strong> ${pokemon.hp} | <strong>Ataque:</strong> ${pokemon.ataque} | <strong>Defensa:</strong> ${pokemon.defensa} | <strong>Velocidad:</strong> ${pokemon.velocidad}</p><p><strong>Evolución:</strong> ${pokemon.tieneEvolucion ? `${pokemon.evolucion || "Sí"} ${pokemon.nivelEvolucion ? `(nivel ${pokemon.nivelEvolucion})` : ""}` : "No tiene"}</p><p><strong>Shiny disponible:</strong> ${pokemon.shiny ? "Sí" : "No"}</p>${pokemon.sonido ? `<audio controls src="${pokemon.sonido}">Tu navegador no permite reproducir audio.</audio>` : ""}</div></div></section>`;
}

function mostrarLogin() {
  app.innerHTML = `<section class="form-section"><h1>Iniciar sesión</h1><form id="form-login"><label for="username">Usuario</label><input id="username" type="text" required><label for="password">Contraseña</label><input id="password" type="password" required><button type="submit">Ingresar</button><p id="mensaje-login" class="mensaje"></p></form><p>Usuario administrador de prueba: <strong>1234</strong> / contraseña: <strong>1234</strong></p></section>`;
  document.querySelector("#form-login").addEventListener("submit", event => {
    event.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value;
    const usuario = leerUsuarios().find(u => u.username === username && u.password === password);
    if (!usuario) { document.querySelector("#mensaje-login").textContent = "Usuario o contraseña incorrectos."; return; }
    usuarioActual = usuario;
    mostrarPerfil();
  });
}

function mostrarRegistro() {
  app.innerHTML = `<section class="form-section"><h1>Crear cuenta</h1><form id="form-registro"><label for="reg-nombre">Nombre</label><input id="reg-nombre" required><label for="reg-email">Email</label><input id="reg-email" type="email" required><label for="reg-username">Nombre de usuario</label><input id="reg-username" required><label for="reg-password">Contraseña</label><input id="reg-password" type="password" minlength="4" required><button type="submit">Registrarme</button><p id="mensaje-registro" class="mensaje"></p></form></section>`;
  document.querySelector("#form-registro").addEventListener("submit", event => {
    event.preventDefault();
    const usuarios = leerUsuarios();
    const username = document.querySelector("#reg-username").value.trim();
    const email = document.querySelector("#reg-email").value.trim();
    if (usuarios.some(u => u.username === username || u.email === email)) { document.querySelector("#mensaje-registro").textContent = "Ese usuario o email ya está registrado."; return; }
    const nuevoUsuario = { id: usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1, nombre: document.querySelector("#reg-nombre").value.trim(), email, username, password: document.querySelector("#reg-password").value, avatar: "./assets/avatar/default.png", admin: false };
    guardarUsuarios(nuevoUsuario);
    usuarioActual = nuevoUsuario;
    mostrarPerfil();
  });
}

function mostrarPerfil() {
  const admin = usuarioActual.admin;
  app.innerHTML = `<section class="form-section"><h1>Mi perfil</h1><div class="perfil"><img src="${usuarioActual.avatar}" alt="Avatar" class="user-profile-avatar"><div><p><strong>Nombre:</strong> ${usuarioActual.nombre}</p><p><strong>Usuario:</strong> ${usuarioActual.username}</p><p><strong>Email:</strong> ${usuarioActual.email}</p><p><strong>Permisos:</strong> ${admin ? "Administrador" : "Usuario"}</p></div></div>${admin ? `<button id="ir-carga">Cargar un Pokémon</button>` : ""}<button id="cerrar-sesion" class="btn-secundario">Cerrar sesión</button></section>`;
  document.querySelector("#cerrar-sesion").addEventListener("click", () => { usuarioActual = null; mostrarInicio(); });
  if (admin) document.querySelector("#ir-carga").addEventListener("click", mostrarFormularioPokemon);
}

function mostrarFormularioPokemon() {
  if (!usuarioActual || !usuarioActual.admin) { mostrarInicio(); return; }
  app.innerHTML = `<section class="form-section"><h1>Cargar Pokémon</h1><form id="form-pokemon" class="pokemon-form"><label>Número <input id="p-id" type="number" min="1" required></label><label>Nombre <input id="p-nombre" required></label><label>Tipo(s), separados por coma <input id="p-tipo" placeholder="Planta, Veneno" required></label><label>Descripción <textarea id="p-descripcion" required></textarea></label><label>Altura (m) <input id="p-altura" type="number" min="0" step="0.1" required></label><label>Peso (kg) <input id="p-peso" type="number" min="0" step="0.1" required></label><label>Generación <input id="p-generacion" type="number" min="1" required></label><label>HP <input id="p-hp" type="number" min="1" required></label><label>Ataque <input id="p-ataque" type="number" min="0" required></label><label>Velocidad <input id="p-velocidad" type="number" min="0" required></label><label>Defensa <input id="p-defensa" type="number" min="0" required></label><label>Habilidad <input id="p-habilidad" required></label><label>¿Tiene evolución? <select id="p-tiene-evolucion"><option value="false">No</option><option value="true">Sí</option></select></label><label>Evolución <input id="p-evolucion"></label><label>Nivel de evolución <input id="p-nivel" type="number" min="1"></label><label>Rareza <select id="p-rareza"><option>Común</option><option>Poco común</option><option>Raro</option><option>Legendario</option><option>Mítico</option></select></label><label>Ruta de imagen <input id="p-imagen" placeholder="./assets/img/nombre.png" required></label><label>Ruta de sonido <input id="p-sonido" placeholder="./assets/sound/nombre.mp3"></label><label class="check-label"><input id="p-shiny" type="checkbox"> ¿Tiene versión shiny?</label><label>Ruta de imagen shiny <input id="p-imagen-shiny"></label><button type="submit">Guardar Pokémon</button><button type="button" class="btn-secundario" id="cancelar-carga">Cancelar</button><p id="mensaje-pokemon" class="mensaje"></p></form></section>`;
  document.querySelector("#cancelar-carga").addEventListener("click", mostrarPerfil);
  document.querySelector("#form-pokemon").addEventListener("submit", event => {
    event.preventDefault();
    const pokemones = leerPokemones();
    const id = Number(document.querySelector("#p-id").value);
    const nombre = document.querySelector("#p-nombre").value.trim();
    if (pokemones.some(p => p.id === id || p.nombre.toLowerCase() === nombre.toLowerCase())) { document.querySelector("#mensaje-pokemon").textContent = "Ya existe un Pokémon con ese número o nombre."; return; }
    const tieneEvolucion = document.querySelector("#p-tiene-evolucion").value === "true";
    const nuevo = { id, nombre, tipo: document.querySelector("#p-tipo").value.split(",").map(t => t.trim()).filter(Boolean), descripcion: document.querySelector("#p-descripcion").value.trim(), altura: Number(document.querySelector("#p-altura").value), peso: Number(document.querySelector("#p-peso").value), generacion: Number(document.querySelector("#p-generacion").value), hp: Number(document.querySelector("#p-hp").value), ataque: Number(document.querySelector("#p-ataque").value), velocidad: Number(document.querySelector("#p-velocidad").value), defensa: Number(document.querySelector("#p-defensa").value), habilidad: document.querySelector("#p-habilidad").value.trim(), tieneEvolucion, evolucion: tieneEvolucion ? document.querySelector("#p-evolucion").value.trim() : null, nivelEvolucion: tieneEvolucion && document.querySelector("#p-nivel").value ? Number(document.querySelector("#p-nivel").value) : null, rareza: document.querySelector("#p-rareza").value, imagen: document.querySelector("#p-imagen").value.trim(), sonido: document.querySelector("#p-sonido").value.trim(), shiny: document.querySelector("#p-shiny").checked, imagenShiny: document.querySelector("#p-imagen-shiny").value.trim() };
    if (!nuevo.tipo.length) { document.querySelector("#mensaje-pokemon").textContent = "Ingresá al menos un tipo."; return; }
    guardarPokemones(nuevo);
    mostrarPokedex();
  });
}

let turnoBatalla = 0;
function mostrarBatalla() {
  turnoBatalla = 0;
  app.innerHTML = `<section class="batalla-section"><h1>Batalla Pokémon</h1><p>Un entrenador rival aparece frente a vos. ¿Estás listo?</p><button id="comenzar-batalla">Comenzar batalla</button></section>`;
  document.querySelector("#comenzar-batalla").addEventListener("click", mostrarTurnoBatalla);
}
function mostrarTurnoBatalla() {
  const turnos = [
    { texto: "Turno 1: El rival se prepara para atacar. ¿Qué querés hacer?", opciones: [["Atacar", "Tu Pokémon lanza un ataque y consigue ventaja."], ["Usar poción", "Recuperás energía y te preparás para el siguiente turno."]] },
    { texto: "Turno 2: El rival vuelve a acercarse. ¿Cómo respondés?", opciones: [["Ataque rápido", "Tu Pokémon se mueve primero y esquiva el golpe."], ["Defender", "Te protegés y esperás una oportunidad mejor."]] },
    { texto: "Turno 3: Es el momento decisivo. ¿Qué elegís?", opciones: [["Ataque especial", "¡Un gran movimiento! El rival ya no puede continuar."], ["Intentar negociar", "El rival acepta terminar el combate amistosamente."]] }
  ];
  if (turnoBatalla >= turnos.length) { app.innerHTML = `<section class="batalla-section"><h1>¡Fin de la batalla!</h1><p>Terminaste la aventura. ¡Buen trabajo, entrenador!</p><button id="reiniciar-batalla">Volver a jugar</button></section>`; document.querySelector("#reiniciar-batalla").addEventListener("click", mostrarBatalla); return; }
  const turno = turnos[turnoBatalla];
  app.innerHTML = `<section class="batalla-section"><h1>Batalla Pokémon</h1><h2>Turno ${turnoBatalla + 1}</h2><p>${turno.texto}</p><div class="batalla-opciones">${turno.opciones.map((op, i) => `<button data-opcion="${i}">${op[0]}</button>`).join("")}</div><p id="resultado-turno" class="mensaje"></p><button id="siguiente-turno" hidden>Continuar</button></section>`;
  document.querySelectorAll("[data-opcion]").forEach(boton => boton.addEventListener("click", () => {
    document.querySelectorAll("[data-opcion]").forEach(b => b.disabled = true);
    document.querySelector("#resultado-turno").textContent = turno.opciones[Number(boton.dataset.opcion)][1];
    const siguiente = document.querySelector("#siguiente-turno"); siguiente.hidden = false; siguiente.addEventListener("click", () => { turnoBatalla++; mostrarTurnoBatalla(); });
  }));
}

// Los eventos del menú se registran una sola vez al iniciar la aplicación.
logo.addEventListener("click", mostrarInicio);
linkPokedex.addEventListener("click", event => { event.preventDefault(); mostrarPokedex(); });
linkLogin.addEventListener("click", event => { event.preventDefault(); mostrarLogin(); });
linkRegistro.addEventListener("click", event => { event.preventDefault(); mostrarRegistro(); });
linkBatalla.addEventListener("click", event => { event.preventDefault(); mostrarBatalla(); });
formularioBusqueda.addEventListener("submit", event => { event.preventDefault(); mostrarPokedex(document.querySelector("#busqueda").value.trim()); });
app.addEventListener("click", event => {
  const boton = event.target.closest("[data-accion]");
  if (!boton) return;
  if (boton.dataset.accion === "detalle") mostrarDetalle(boton.dataset.id);
  if (boton.dataset.accion === "volver-pokedex" || boton.dataset.accion === "inicio-pokedex") mostrarPokedex();
  if (boton.dataset.accion === "inicio-batalla") mostrarBatalla();
});

mostrarInicio();
