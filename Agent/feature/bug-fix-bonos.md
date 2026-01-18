# Bug Fix: Error de Importación en Ruta de Bonos

## 🚨 Descripción del Error

El servidor de Astro falla al intentar cargar la página `/bonos`.
**Mensaje:** `Could not import ../../data/bonuses`.
**Ubicación del fallo:** `src/pages/bonos/index.astro:4:25`

## 🎯 Objetivo

Localizar el archivo de datos de bonos y corregir la ruta de importación para que la página renderice correctamente.

## 📋 Tareas para el Agente de Código

1. **Localización de Archivos:**
   - Buscar en todo el proyecto el archivo llamado `bonuses.ts` o `bonuses.js`.
   - Verificar si el archivo está en `src/data/bonuses.ts` o si se movió accidentalmente a otra carpeta (como `src/components/data/` o similar).

2. **Corrección de Import en `src/pages/bonos/index.astro`:**
   - Una vez localizado el archivo, ajustar la línea 4:
     ```typescript
     import { bonuses } from "RUTA_CORRECTA_AQUI";
     ```
   - Si el archivo `bonuses` está en `src/data/bonuses.ts`, la ruta desde `src/pages/bonos/index.astro` debería ser efectivamente `../../data/bonuses`. Si falla, intentar usar el alias de Astro: `import { bonuses } from "@/data/bonuses";` (si tienes configurado el alias `@`).

3. **Verificación de Tipado/Export:**
   - Asegurarse de que dentro de `bonuses.ts` exista un `export const bonuses = [...]` y que no sea un `export default`.

4. **Prueba de Renderizado:**
   - Confirmar que el componente `<BonusList client:load bonuses={bonuses} />` recibe la prop correctamente tras arreglar el import.

## ✅ Resolución

- **Archivo Localizado:** `src/components/data/bonuses.ts`.
- **Acción:** Se corrigió la ruta de importación en `src/pages/bonos/index.astro`.
- **Cambio:** De `../../data/bonuses` a `../../components/data/bonuses`.
