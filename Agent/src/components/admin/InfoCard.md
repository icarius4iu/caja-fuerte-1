# InfoCard

## Propósito

Tarjeta informativa para mostrar métricas clave en el dashboard (ej. total de usuarios, ingresos, etc.).

## Props

| Prop    | Tipo              | Descripción                                                                        |
| ------- | ----------------- | ---------------------------------------------------------------------------------- |
| `title` | `any` (implícito) | Título de la tarjeta (ej. "Total Users").                                          |
| `value` | `any` (implícito) | Valor numérico o texto a destacar.                                                 |
| `icon`  | `string` (HTML)   | Cadena HTML conteniendo el SVG del icono. Se renderiza usando `Fragment set:html`. |

## Estado

Estático. Renderiza los datos pasados por props.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Documentación inicial creada.

## Dependencias

- `Astro.props`.
