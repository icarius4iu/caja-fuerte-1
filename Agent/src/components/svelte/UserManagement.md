# UserManagement (Svelte)

## Propósito

Módulo de gestión de usuarios. Muestra una tabla con usuarios, permite filtrar por búsqueda y editar información básica a través de un modal.

## Props

Este componente no acepta props.

## Estado

- **users:** Lista de usuarios (mock data).
- **searchQuery:** Texto para filtrar usuarios por nombre o email.
- **filteredUsers:** Lista reactiva derivada de `users` y `searchQuery`.
- **editingUser:** Almacena el usuario seleccionado para edición (o null si el modal está cerrado).
- **Métodos:** `openEditModal`, `closeModal`, `saveUser`.

## Cambios Recientes

- **Fecha:** 2026-01-17
- **Descripción:** Documentación inicial creada.

## Dependencias

- Iconos FontAwesome.
