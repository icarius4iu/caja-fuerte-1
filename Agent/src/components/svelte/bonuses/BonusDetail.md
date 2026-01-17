# BonusDetail (Svelte)

## Propósito

Muestra la vista detallada de un bono específico. Incluye una barra lateral con estadísticas clave (ganancia, inversión, métodos) y una sección principal con descripción, botón de reclamo y video guía.

## Props

| Prop    | Tipo    | Descripción                                        |
| ------- | ------- | -------------------------------------------------- |
| `bonus` | `Bonus` | Objeto con toda la información del bono a mostrar. |

## Estado

Este componente es principalmente presentacional, pero utiliza animaciones CSS (`animate-fade-in`).

- Depende de la interfaz `Bonus` importada de `../../../data/bonuses`.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Documentación inicial creada.

## Dependencias

- Iconos FontAwesome.
- Tipado `Bonus` desde data local.
