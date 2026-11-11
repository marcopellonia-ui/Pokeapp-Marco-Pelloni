// Ejemplo complementario de captura de un formulario.
// Este archivo no se carga desde index.html: la aplicación principal
// administra sus propios formularios dentro de app.js.
import { leerUsuarios } from "./persistencia.js";

const formularioLogin = document.querySelector("#form-login");

if (formularioLogin) {
  formularioLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const usuarioEncontrado = leerUsuarios().find(usuario =>
      usuario.username === username && usuario.password === password
    );

    if (usuarioEncontrado) {
      alert("Bienvenido " + usuarioEncontrado.nombre);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
}
