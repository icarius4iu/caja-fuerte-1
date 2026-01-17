# MainLayout

## Propósito

Este es el layout principal utilizado para las páginas internas de la aplicación (fuera de la landing). Proporciona una estructura HTML5 base, metadatos SEO básicos, carga de fuentes e iconos, y manejo de modo oscuro.

## Props

| Prop    | Tipo     | Descripción                                                         |
| ------- | -------- | ------------------------------------------------------------------- |
| `title` | `string` | El título de la página que se mostrará en la pestaña del navegador. |

## Estado

- **Preferencia de Tema:** Similar a `LandingLayout`, gestiona la clase `dark` en el elemento `html` basándose en `localStorage` o preferencias del sistema.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Documentación inicial creada.

## Dependencias

- `src/styles/global.css`: Hoja de estilos global.
- Google Fonts (Inter, Outfit).
- Font Awesome (CDN).
