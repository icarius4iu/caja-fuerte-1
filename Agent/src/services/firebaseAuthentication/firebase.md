# Firebase Configuration (`firebase.ts`)

## Propósito

Inicializa la aplicación de Firebase utilizando la configuración de entorno. Este archivo actúa como el punto de entrada (singleton) para conectar la aplicación con los servicios de Firebase.

## Configuración

Lee las siguientes variables de entorno para configurar el SDK:

- `PUBLIC_FIREBASE_API_KEY`
- `PUBLIC_FIREBASE_AUTH_DOMAIN`
- `PUBLIC_FIREBASE_PROJECT_ID`
- `PUBLIC_FIREBASE_STORAGE_BUCKET`
- `PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `PUBLIC_FIREBASE_APP_ID`

## Dependencias

- `firebase/app`: SDK Core de Firebase.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Documentación inicial creada. Configuración estándar para proyecto web.
