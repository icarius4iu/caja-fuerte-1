# Feature: Modal de Autenticación Completo con Validación de Rol "User"

## 🎯 Objetivo

Sustituir el botón "Empieza Gratis" por un sistema de autenticación integral en un Modal. Este debe replicar todas las funciones de `test-auth.html` (Login, Registro, Recuperación de contraseña) asegurando que solo los usuarios con `role: 'user'` en Firestore puedan acceder.

## 🛠️ Requerimientos Funcionales (Basados en test-auth)

El modal debe manejar tres estados de vista internos:

1. **Vista de Login:**
   - Email y Contraseña.
   - Botón de "Olvidé mi contraseña" (cambia a Vista 3).
   - Enlace de "Crear cuenta" (cambia a Vista 2).
   - **Lógica Post-Login:** Consultar Firestore. Si el rol NO es `user`, cerrar sesión y mostrar alerta: "Acceso denegado: Esta entrada es solo para estudiantes".

2. **Vista de Registro:**
   - Formulario de creación de cuenta.
   - **Acción Obligatoria:** Al crear el usuario exitosamente en Firebase Auth, se debe crear automáticamente el documento en Firestore: `users/{uid}` con `{ email: user.email, role: 'user' }`.

3. **Vista de Recuperación:**
   - Campo para enviar correo de restablecimiento (`sendPasswordResetEmail`).

## 🎨 Especificaciones de Diseño (Caja Fuerte Style)

- **Fondo del Modal:** `#13151A` con un ligero blur detrás.
- **Inputs:** Bordes sutiles color cian al hacer foco (`focus:border-[#0CF2F2]`).
- **Botón Principal:** Gradiente cian/turquesa similar al botón "Vengo por mi fija" de la landing.
- **Cierre:** Botón "X" en la esquina superior derecha que resetee el estado del modal.

## 📋 Tareas para el Agente de Código

### Tarea 1: Componente de Estado Svelte

- Crear `src/components/auth/AuthModal.svelte` con una variable reactiva `mode` ('login' | 'register' | 'forgot').
- Importar las funciones necesarias de `firebase/auth` y `firebase/firestore`.

### Tarea 2: Implementación de la Lógica de Roles

- Implementar la función de validación de seguridad:
  ```javascript
  const checkUserRole = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().role === "user";
  };
  ```
