import {
  leerPokemones,
  guardarPokemones,
  leerUsuarios,
  guardarUsuarios,
} from "./persistencia.js";

// ==========================================
// ELEMENTO PRINCIPAL DE LA APLICACIÓN
// ==========================================

const app = document.querySelector("#app");

// ==========================================
// 1. LANDING
// ==========================================

// Estructura básica de la pantalla
const landing = `
  <section class="landing">
    <h1>Bienvenido a PokeApp</h1>
    <p>Explorá el mundo Pokémon.</p>
    <p>Elegí una opción del menú para comenzar.</p>
  </section>
`;

// Función para cargar los elementos dinámicos
function cargarLanding() {
  console.log("Landing cargado");
}

// Evento del logo
const logo = document.querySelector(".header-logo img");

logo.addEventListener("click", function () {
  app.innerHTML = landing;

  cargarLanding();
});

// ==========================================
// 2. POKÉDEX
// ==========================================

// Estructura básica de la pantalla
const pokedex = `
  <section class="pokedex-section">
    <h1>Pokédex</h1>

    <div id="pokedex-gallery" class="pokedex-gallery"></div>
  </section>
`;

// Función para cargar los elementos dinámicos
function cargarPokedex() {
  const pokemones = leerPokemones();

  const pokedexGallery = document.querySelector("#pokedex-gallery");

  for (let pokemon of pokemones) {
    pokedexGallery.innerHTML += `
      <article class="pokemon-card">

        <div class="pokemon-image">
          <img 
            src="${pokemon.imagen}" 
            alt="${pokemon.nombre}"
          />
        </div>

        <div class="pokemon-info">

          <span class="pokemon-id">
            N.º ${pokemon.id}
          </span>

          <h2>${pokemon.nombre}</h2>

          <div class="pokemon-types">
            <span class="type type-${pokemon.tipo[0].toLowerCase()}">
              ${pokemon.tipo[0]}
            </span>
          </div>

          <p class="pokemon-rareza">
            ${pokemon.rareza}
          </p>

          <button class="btn-detalle" data-id="${pokemon.id}">
            Ver detalles
          </button>

        </div>

      </article>
    `;
  }
}

// Evento del botón Pokédex
const botonPokedex = document.querySelector("#link-pokedex");

botonPokedex.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = pokedex;

  cargarPokedex();
});

// ==========================================
// 3. INICIAR SESIÓN
// ==========================================

// Estructura básica de la pantalla
const login = `
  <section class="login-section">
          <h1>Iniciar sesión</h1>

          <form id="form-login">
            <label for="username"> Usuario </label>

            <input type="text" id="username" required />

            <label for="password"> Contraseña </label>

            <input type="password" id="password" required />
            <button type="submit">Ingresar</button>
          </form>
        </section>
`;

// Función para cargar los elementos dinámicos
function cargarLogin() {
  console.log("Formulario de inicio de sesión cargado");
}

// Evento del botón Iniciar sesión
const botonLogin = document.querySelector("#link-login");

botonLogin.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = login;

  cargarLogin();

  const formularioLogin = document.querySelector("#form-login");

  formularioLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    let encontrado = false;
    const usuarios = leerUsuarios();
    for (let usuario of usuarios) {
      if (usuario.username === username && usuario.password === password) {
        encontrado = true;
        if (usuario.admin === true) {
          app.innerHTML = perfilAdmin;
          cargarPerfilAdmin();
        } else {
          app.innerHTML = perfilEstandar;
          cargarPerfilEstandar();
        }
        document.querySelector(".user-profile-username").textContent =
          usuario.username;
        document.querySelector(".user-profile-email").textContent =
          usuario.email;
        document.querySelector(".user-profile-avatar").src = usuario.avatar;
        document.querySelector(".user-profile-avatar").alt =
          `Avatar de ${usuario.username}`;
        break;
      } else {
        encontrado = false;
      }
    }
    if (!encontrado) {
      document
        .querySelector("#form-login")
        .insertAdjacentHTML(
          "beforeend",
          `<p class="error-message">Usuario o contraseña incorrectos</p>`,
        );
    }
  });
});

// ==========================================
// 4. REGISTRO
// ==========================================

// Estructura básica de la pantalla
const registro = `
  <section class="registro-section">

    <h1>Registrarse</h1>

    <form id="form-registro">

      <label for="nombre">
        Nombre
      </label>

      <input 
        type="text" 
        id="nombre"
      />

      <label for="email">
        Email
      </label>

      <input 
        type="email" 
        id="email"
      />

      <label for="nuevo-username">
        Usuario
      </label>

      <input 
        type="text" 
        id="nuevo-username"
      />

      <label for="nueva-password">
        Contraseña
      </label>

      <input 
        type="password" 
        id="nueva-password"
      />

      <button type="submit">
        Registrarse
      </button>

    </form>

  </section>
`;

// Función para cargar los elementos dinámicos
function cargarRegistro() {
  console.log("Formulario de registro cargado");
}

// Evento del botón Registrarse
const botonRegistro = document.querySelector("#link-registro");

botonRegistro.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = registro;

  cargarRegistro();
});

// ==========================================
// 5. BATALLA
// ==========================================

// Estructura básica de la pantalla
const batalla = `
  <section class="batalla-section">

    <h1>Batalla Pokémon</h1>

    <p>
      Elegí tu Pokémon para comenzar.
    </p>

    <button id="btn-comenzar-batalla">
      Comenzar batalla
    </button>

  </section>
`;

// Función para cargar los elementos dinámicos
function cargarBatalla() {
  console.log("Pantalla de batalla cargada");
}

// Evento del botón Batalla
const botonBatalla = document.querySelector("#link-juego");

botonBatalla.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = batalla;

  cargarBatalla();
});
// ==========================================
// 6. PERFIL USUARIO ESTANDAR
// ==========================================
function cargarPerfilEstandar() {
  console.log("Perfil de usuario estándar cargado");
}

const perfilEstandar = `
<section class="user-profile" id="user-profile">
          <h2>Perfil de usuario</h2>
          <div class="user-profile-info">
            <div>
              <img
                src="./assets/avatar/default.png"
                alt="Avatar de usuario"
                class="user-profile-avatar"
              />
            </div>
            <div>
              <p>
                Nombre de usuario:
                <span class="user-profile-username">Usuario</span>
              </p>
              <p>
                Email:
                <span class="user-profile-email">usuario@example.com</span>
              </p>
            </div>
          </div>
        </section>`;

// ==========================================
// 7. PERFIL USUARIO ADMIN
// ==========================================
function cargarPerfilAdmin() {
  console.log("Perfil de usuario admin cargado");

  const formularioNuevoPokemon = document.querySelector("#form-nuevo-pokemon");

  formularioNuevoPokemon.addEventListener("submit", function (event) {
    event.preventDefault();

    const numero = document.querySelector("#pokemon-number");
    const nombre = document.querySelector("#pokemon-name");
    const tipo = document.querySelector("#pokemon-type");
    const altura = document.querySelector("#pokemon-height");
    const peso = document.querySelector("#pokemon-weight");
    const generacion = document.querySelector("#pokemon-generation");
    const hp = document.querySelector("#pokemon-hp");
    const ataque = document.querySelector("#pokemon-attack");
    const velocidad = document.querySelector("#pokemon-speed");
    const defensa = document.querySelector("#pokemon-defense");
    const habilidad = document.querySelector("#pokemon-ability");
    const tieneEvolucion = document.querySelector(
      'input[name="pokemon-has-evolution"]:checked',
    );
    const evolucion = document.querySelector("#pokemon-evolution");
    const nivelEvolucion = document.querySelector("#pokemon-evolution-level");
    const rareza = document.querySelector("#pokemon-rarity");
    const imagen = document.querySelector("#pokemon-image");
    const sonido = document.querySelector("#pokemon-sound");
    const shiny = document.querySelector("#pokemon-shiny");
    const imagenShiny = document.querySelector("#pokemon-shiny-image");

    const nuevoPokemon = {
      id: numero.valueAsNumber,
      nombre: nombre.value,
      tipo: [tipo.value],
      altura: altura.valueAsNumber,
      peso: peso.valueAsNumber,
      generacion: generacion.valueAsNumber,
      hp: hp.valueAsNumber,
      ataque: ataque.valueAsNumber,
      velocidad: velocidad.valueAsNumber,
      defensa: defensa.valueAsNumber,
      habilidad: habilidad.value,
      tieneEvolucion: tieneEvolucion.value === "true",
      evolucion: evolucion.value,
      nivelEvolucion: nivelEvolucion.valueAsNumber,
      rareza: rareza.value,
      imagen: imagen.value,
      sonido: sonido.value,
      shiny: shiny.checked,
      imagenShiny: imagenShiny.value,
    };

    console.log("Nuevo Pokémon agregado:", nuevoPokemon);
    guardarPokemones(nuevoPokemon);

    formularioNuevoPokemon.reset();
    numero.focus();
  });
}

const perfilAdmin = ` <section class="user-profile" id="user-profile">
          <h2>Perfil de usuario</h2>
          <div class="user-profile-info">
            <div>
              <img
                src="./assets/avatar/default.png"
                alt="Avatar de usuario"
                class="user-profile-avatar"
              />
            </div>
            <div>
              <p>
                Nombre de usuario:
                <span class="user-profile-username">Usuario</span>
              </p>
              <p>
                Email:
                <span class="user-profile-email">usuario@example.com</span>
              </p>
            </div>
          </div>
        </section>
        <section class="new-pokemon" id="new-pokemon">
          <h2>Nuevo Pokémon</h2>
          <form id="form-nuevo-pokemon">
            <label for="pokemon-number"> Numero en el Pokedex: </label>
            <input type="number" id="pokemon-number" required />

            <label for="pokemon-name">Nombre:</label>
            <input type="text" id="pokemon-name" required />

            <label for="pokemon-type">Tipo:</label>
            <input type="text" id="pokemon-type" required />

            <label for="pokemon-height">Altura (m):</label>
            <input type="number" id="pokemon-height" step="0.1" required />

            <label for="pokemon-weight">Peso (kg):</label>
            <input type="number" id="pokemon-weight" step="0.1" required />

            <label for="pokemon-generation">Generación:</label>
            <input type="number" id="pokemon-generation" required />

            <label for="pokemon-hp">HP:</label>
            <input type="number" id="pokemon-hp" required />
            <label for="pokemon-attack">Ataque:</label>
            <input type="number" id="pokemon-attack" required />
            <label for="pokemon-speed">Velocidad:</label>
            <input type="number" id="pokemon-speed" required />
            <label for="pokemon-defense">Defensa:</label>
            <input type="number" id="pokemon-defense" required />

            <label for="pokemon-ability">Habilidad:</label>
            <select id="pokemon-ability" required>
             <option value="" disabled selected>Seleccioná una habilidad</option>
              <option value="" disabled selected>Selecciona una habilidad</option>
              <option value="Adaptability">Adaptable</option>
              <option value="Battle Armor">Armadura batalla</option>
              <option value="Blaze">Mar llamas</option>
              <option value="Chlorophyll">Clorofila</option>
              <option value="Clear Body">Cuerpo puro</option>
              <option value="Color Change">Cambio color</option>
              <option value="Compound Eyes">Ojo compuesto</option>
              <option value="Cute Charm">Gran encanto</option>
              <option value="Early Bird"> madrugar</option>
              <option value="Effect Spore">Efecto espora</option>
              <option value="Flame Body">Cuerpo llama</option>
              <option value="Flash Fire">Absorbe fuego</option>
              <option value="Guts">Agallas</option>
              <option value="Huge Power">Potencia</option>
              <option value="Hustle">Entusiasmo</option>
              <option value="Hyper Cutter"> Corte fuerte</option>
              <option value="Illuminate"> iluminacion</option>
              <option value="Immunity">Inmunidad</option>
              <option value="Inner Focus">Foco interno</option>
              <option value="Intimidate">Intimidación</option>
              <option value="Keen Eye">Vista lince</option>
              <option value="Levitate">Levitación</option>
              <option value="Lightning Rod">Pararrayos</option>
              <option value="Limber">Flexibilidad</option>
              <option value="Liquid Ooze">Lodo líquido</option>
              <option value="Magic Guard">Muro mágico</option>
              <option value="Natural Cure">Cura natural</option>
              <option value="Oblivious">Despiste</option>
              <option value="Overgrow">Espesura</option>
              <option value="Own Tempo">Ritmo propio</option>
              <option value="Pickup">Recogida</option>
              <option value="Poison Point">Punto tóxico</option>
              <option value="Pressure">Presión</option>
              <option value="Run Away">Fuga</option>
              <option value="Serene Grace"> dicha</option>
              <option value="Shed Skin">Mudar</option>
              <option value="Shield Dust">Polvo escudo</option>
              <option value="Soundproof">Insonorizar</option>
              <option value="Static">Electricidad estática</option>
              <option value="Stench">Hedor</option>
              <option value="Sturdy">Robustez</option>
              <option value="Swarm">Enjambre</option>
              <option value="Swift Swim">N जल veloz</option>
              <option value="Synchronize"> sincronía</option>
              <option value="Thick Fat">Sebo</option>
              <option value="Torrent">Torrente</option>
              <option value="Trace">Rastro</option>
              <option value="Volt Absorb">Absorbe electricidad</option>
              <option value="Water Absorb">Absorbe agua</option>
              <option value="Wonder Guard">Superguarda</option>
            </select>

            <fieldset>
              <legend>¿Tiene evolución?</legend>
              <label for="  pokemon-has-evolution-yes">
                <input type="radio" id="pokemon-has-evolution-yes" name="pokemon-has-evolution" value="true" required />
                Sí
              </label>
              <label for="pokemon-has-evolution-no">
                <input type="radio" id="pokemon-has-evolution-no" name="pokemon-has-evolution" value="false" required />
                No
              </label>
            </fieldset>

            <label for="pokemon-evolution">Evolución:</label>
            <input type="text" id="pokemon-evolution" />

            <label for="pokemon-evolution-level">Nivel de evolución:</label>
            <input type="number" id="pokemon-evolution-level" />

            <label for="pokemon-rarity">Rareza:</label>
            <select id="pokemon-rarity" required>
              <option value="" disabled selected>Seleccioná una rareza</option>
              <option value="Común">Común</option>
              <option value="Raro">Raro</option>
              <option value="Legendario">Legendario</option>
              <option value="Mítico">Mítico</option>
              <option value="Singular">Singular</option>
            </select>

            <label for="pokemon-image">Imagen (URL):</label>
            <input type="text" id="pokemon-image" required />

            <label for="pokemon-sound">Sonido (URL):</label>
            <input type="text" id="pokemon-sound" required />

            <label for="pokemon-shiny">¿Es shiny?</label>
            <input type="checkbox" id="pokemon-shiny" />

            <label for="pokemon-shiny-image">Imagen shiny (URL):</label>
            <input type="text" id="pokemon-shiny-image" />

            <button type="submit">Agregar Pokémon</button>
          </form>
        </section>`;

// ==========================================
// 8. LANDING INICIAL
// ==========================================

app.innerHTML = landing;

cargarLanding();

botonBatalla.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = batalla;

  cargarBatalla();
});

// ==========================================
// 7. PERFIL USUARIO ADMIN
// ==========================================

// ==========================================
// 8. LANDING INICIAL
// ==========================================

app.innerHTML = landing;

cargarLanding();
