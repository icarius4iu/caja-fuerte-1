# AdminDashboard (Svelte)

## Propósito

Componente principal del tablero de administración implementado en Svelte. Gestiona la navegación entre pestañas para mostrar diferentes módulos de gestión (Usuarios, Calendario, Bonos).

## Props

Este componente no acepta props.

## Estado

- **activeTab:** Controla qué pestaña está visible.
  - Valores posibles: `'users'`, `'calendar'`, `'bonuses'`.
  - Valor inicial: `'users'`.
- **Métodos:** `setTab(tab)` para cambiar la pestaña activa.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Documentación inicial creada.

## Dependencias

- `./UserManagement.svelte`
- `./CalendarForm.svelte`
- `./BonusesForm.svelte`
