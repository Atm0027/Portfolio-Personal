# Portfolio Profesional Angular

Aplicación SPA en Angular que transforma el portfolio profesional (antes en Bootstrap) en una app de una sola página con enrutamiento, componentes reutilizables, almacenamiento web y formularios reactivos.

## Requisitos del proyecto

- **Componentes y páginas**: `Home`, `Portfolio`, `Contact`, `Header`, `Footer`, `ProjectCard`.
- **Enrutamiento**: configurado en `app-routing.module.ts` con `<router-outlet>` en `app.component.html`.
- **Formularios**: página `Contact` implementada con Angular Reactive Forms y validaciones.
- **Almacenamiento web**:
  - `localStorage` para preferencias de tema (`ThemeService`).
  - `sessionStorage` para caché de proyectos y borrador del formulario (`PortfolioService`, `ContactComponent`, `StorageService`).
- **TypeScript avanzado**: interfaces, enums, servicios tipados y manejo de errores con `try/catch`.

Para más detalle técnico consulta `DOCUMENTACION.md`.

## Cómo ejecutar el proyecto

1. Instala las dependencias:

```bash
npm install
```

2. Arranca el servidor de desarrollo:

```bash
ng serve
```

3. Abre el navegador en `http://localhost:4200/`.

## Build de producción

```bash
ng build
```

Los artefactos se generarán en la carpeta `dist/`.
