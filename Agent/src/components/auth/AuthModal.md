# AuthModal (Svelte)

## Propósito

Componente modal integral para la autenticación de usuarios finales ("User"). Maneja los flujos de inicio de sesión, registro y recuperación de contraseña.

## Props

- **isOpen:** Boolean. Controla la visibilidad del modal. Defaults to `false`.

## Eventos Disparados

- **close:** Se emite cuando el usuario cierra el modal o hace clic en el backdrop.
- **login:** Se emite cuando la autenticación es exitosa. Retorna el objeto `user` de Firebase.

## Estado Interno

- **mode:** `'login'` | `'register'` | `'forgot'`. Determina qué formulario se muestra.
- **Campos:** `email`, `password`, `confirmPassword`, `fullName`.

## Lógica de Negocio

- **Login:**
  - Autentica con Firebase Auth.
  - Verifica que el rol en Firestore sea `user`.
  - Si no es `user`, cierra sesión y muestra error.
- **Registro:**
  - Crea usuario en Firebase Auth.
  - Actualiza el perfil (`updateProfile`) con el nombre completo.
  - Crea el documento de perfil en Firestore con `role: 'user'` usando `createUserProfile`.
- **Recuperación:**
  - Envía correo de reset con `sendPasswordResetEmail`.

## Diseño

- Fondo oscuro (`#13151A`) con desenfoque (`backdrop-blur`).
- Animaciones de entrada (`scale`, `fade`) y transición entre modos.
- Estilos de inputs focus con borde cian (`#0CF2F2`).

## Dependencias

- `firebase/auth`
- `../../services/firebaseAuthentication/auth`
- `../../services/firebaseFirestore/users`
