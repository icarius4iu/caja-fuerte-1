# CalendarWidget (React)

## Propósito

Widget de calendario avanzado para visualizar promociones. Permite vista semanal o diaria, navegación entre fechas y filtrado por tipo de promoción. Utiliza un algoritmo de empaquetado (packing) para organizar visualmente los eventos superpuestos.

## Props

| Prop            | Tipo      | Descripción                                      |
| --------------- | --------- | ------------------------------------------------ |
| `initialPromos` | `Promo[]` | Lista de promociones a mostrar en el calendario. |

## Estado

- **currentDate:** Fecha actual visible (lunes de la semana en vista semanal).
- **viewMode:** `'week'` | `'day'`.
- **activeFilter:** Categoría seleccionada para filtrar (o null).
- **processedEvents:** Memoización que calcula la posición (columna, fila) de cada evento en la rejilla CSS basándose en la fecha y duración.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Documentación inicial creada.

## Dependencias

- `react`
- `date-fns` (implícita lógica de fechas nativa, no usa librería externa explícita en el código visto pero emula lógica de fechas).
