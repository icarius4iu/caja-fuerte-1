# Blueprint de Aplicación Web Astro

## Resumen del Proyecto

Este proyecto es una aplicación web multifuncional construida con Astro.js, diseñada para servir como página de aterrizaje (landing page), visualizador de línea de tiempo/cronograma, panel de administración, sección de cursos educativos y calculadora de rutas. La arquitectura aprovecha la "Arquitectura de Islas" de Astro para crear una experiencia de usuario modular y de alto rendimiento.

## Esquema del Proyecto

### Características Implementadas:

- **Enrutamiento Basado en Archivos:** La aplicación utiliza el enrutamiento de Astro para crear las siguientes páginas:
  - `/` (Página de Aterrizaje)
  - `/admin` (Panel de Administración)
  - `/timeline` (Línea de Tiempo/Cronograma)
  - `/courses` (Cursos Educativos)
  - `/calculator` (Calculadora de Rutas)
- **Panel de Administración:** Un panel de administración completamente funcional con una UI moderna, construido con componentes modulares.
  - **Componentes:** `AdminHeader`, `AdminSidebar`, `AdminFooter`, `WelcomeBanner` e `InfoCard`.
  - **Estilos:** Se utiliza Tailwind CSS para un enfoque de estilo responsivo y "utility-first".

### Diseño y Estilo:

- **Layout:** Se utiliza un diseño principal (`MainLayout.astro`) para proporcionar una estructura consistente a todas las páginas.
- **Estilos:**
  - Una hoja de estilo global (`global.css`) se usa para estilos básicos.
  - Tailwind CSS está integrado para el panel de administración y estilos generales.

## Tarea Actual

### Plan:

1.  **Crear Página del Panel de Administración:** Crear `src/pages/admin.astro`.
2.  **Crear Componentes Modulares:** Crear archivos `.astro` individuales para cada componente del panel de administración (`AdminHeader`, `AdminSidebar`, `AdminFooter`, `WelcomeBanner`, `InfoCard`).
3.  **Añadir Contenido a los Componentes:** Poblar los componentes con el HTML y la lógica necesarios.
4.  **Instalar y Configurar Tailwind CSS:** Configurar Tailwind CSS para estilizar el panel de administración.
5.  **Integrar Componentes:** Importar y usar los componentes creados dentro de la página `admin.astro`.
6.  **Añadir Gestión de Bonificaciones:** Crear `BonusesForm.svelte` e integrarlo en `AdminDashboard.svelte` como una nueva pestaña.
7.  **Actualizar Blueprint:** Reflejar los cambios en el archivo `blueprint.md`.
