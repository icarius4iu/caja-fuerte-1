# BonusList (Svelte)

## Propósito

Catálogo interactivo de bonos. Permite listar, filtrar (por tipo, solo Perú) y ordenar (popularidad, ganancia, recientes) una colección de bonos.

## Props

| Prop      | Tipo      | Descripción                                              |
| --------- | --------- | -------------------------------------------------------- |
| `bonuses` | `Bonus[]` | Lista inicial de bonos a mostrar. Valu por defecto `[]`. |

## Estado

- **Filtros:** `selectedType` (categoría), `showPeruvianOnly` (booleano).
- **Ordenamiento:** `selectedSort` (criterio de orden).
- **UI:** `isTypeOpen`, `isSortOpen` (controlan la visibilidad de los dropdowns).
- **filteredBonuses:** Lista reactiva computada aplicando filtros y orden.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Documentación inicial creada.

## Dependencias

- `svelte/transition` (fly).
- `svelte/animate` (flip).
- Tipado `Bonus` desde data local.
