# Auth Test Page (`test-auth.astro`)

## Propósito

Página de utilidad para probar en vivo la integración de autenticación de Firebase. Proporciona una interfaz completa para:

- Inicio de sesión (Login)
- Registro de nuevos usuarios (Sign Up)
- Recuperación de contraseña (Forgot Password)
- Visualización de estado de usuario y cierre de sesión (Logout)

## Funcionalidad

- **Gestión de Vistas:** Permite alternar dinámicamente entre los formularios de Login, Registro y Recuperación de Contraseña sin recargar la página.
- **Vista Usuario Conectado:** Muestra avatar, email y UID del usuario autenticado y botón de cerrar sesión.
- **Formularios:**
  - **Login:** Email y Contraseña.
  - **Registro:** Email, Contraseña y Confirmación de Contraseña. Valida que las contraseñas coincidan antes de enviar.
  - **Recuperación:** Email. Muestra mensaje de éxito al enviar el correo.
- **Manejo de Errores:** Captura y traduce códigos de error de Firebase (ej. `auth/email-already-in-use`, `auth/weak-password`, `auth/user-not-found`) a mensajes amigables en español.
- **Feedback Visual:** Muestra mensajes de error (rojo) y éxito (verde) según corresponda.

## Script del Cliente

Utiliza un bloque `<script>` para:

1.  **Suscripción a Auth State:** Escucha `onAuthStateChange` para alternar entre la vista de "Invitado" (formularios) y "Usuario Conectado".
2.  **Toggle de Formularios:** Funciones auxiliares para mostrar/ocultar los formularios de Login, Registro y Recuperación dentro de la vista de invitado.
3.  **Event Listeners:**
    - `submit` en cada formulario para llamar a `login()`, `signup()`, o `passwordReset()`.
    - `click` en los enlaces "Regístrate", "Olvidaste tu contraseña", "Volver a Iniciar Sesión" par alternar vistas.
    - `click` en el botón de Logout.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Se implementó la funcionalidad completa de registro de usuarios y recuperación de contraseña. Se añadieron los formularios correspondientes y la lógica para alternar entre ellos. Se extendió el manejo de errores para cubrir casos de registro (ej. email en uso, contraseña débil).

## Dependencias

- `src/layouts/MainLayout.astro`
- `src/services/firebaseAuthentication/auth`: Funciones `login`, `logout`, `signup`, `passwordReset`, `onAuthStateChange`.
