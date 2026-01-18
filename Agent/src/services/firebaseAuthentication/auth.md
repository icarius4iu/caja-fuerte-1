# Authentication Service (`auth.ts`)

## Propósito

Provee una capa de abstracción sobre el SDK de Firebase Authentication. Exporta funciones para registrarse, iniciar sesión (email/password y Google), cerrar sesión y escuchar cambios en el estado de autenticación.

## Funciones Exportadas

- **`signup(email, password)`**: Crea un nuevo usuario con correo y contraseña.
- **`login(email, password)`**: Inicia sesión con credenciales existentes.
- **`loginWithGoogle()`**: Inicia sesión utilizando Google Auth Provider (popup).
- **`logout()`**: Cierra la sesión activa.
- **`passwordReset(email)`**: Envía correo de recuperación de contraseña.
- **`updateUserPassword(newPassword)`**: Actualiza la contraseña del usuario actual.
- **`onAuthStateChange(callback)`**: Suscribe un callback a los cambios de estado del usuario (login/logout).

## Estado

Utiliza el objeto `auth` inicializado de Firebase para gestionar el estado de sesión globalmente.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Refactorización completa para eliminar mocks y usar SDK de Firebase directamente.

## Dependencias

- `firebase/auth`: Servicio de autenticación.
- `./firebase`: Instancia de la app inicializada.
