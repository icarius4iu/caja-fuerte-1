# LandingLayout

## Propósito

Este layout define la estructura principal para la Landing Page de la aplicación. Configura las fuentes globales (Inter y Outfit), iconos (Font Awesome), y una configuración personalizada de Tailwind CSS inyectada vía CDN para prototipado rápido o estilos específicos. También maneja la inicialización del tema (oscuro/claro) basado en las preferencias del usuario.

## Props

Este componente no define props explícitas, pero utiliza el `<slot />` por defecto de Astro para renderizar el contenido hijo.

## Estado

- **Preferencia de Tema:** Lee y escribe en `localStorage.theme` y verifica `window.matchMedia` para determinar si aplicar la clase `dark` al elemento `html`.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Documentación inicial creada.

## Dependencias

- **Fuentes:** Google Fonts (Inter, Outfit).
- **Iconos:** Font Awesome (CDN).
- **Estilos:** Tailwind CSS (CDN script con configuración personalizada).
