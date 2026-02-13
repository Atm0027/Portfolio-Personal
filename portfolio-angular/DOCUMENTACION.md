# Documentación del Proyecto

## 1. Descripción General
Este proyecto es una Aplicación de Página Única (SPA) desarrollada con Angular, diseñada para presentar un portafolio profesional. Transforma un diseño estático en una aplicación dinámica y optimizada para el rendimiento utilizando prácticas modernas de desarrollo web.

## 2. Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **Angular** | Marco principal para estructura, inyección de dependencias y rendimiento. |
| **TypeScript** | Añade tipado estático a JavaScript para una mejor mantenibilidad y confiabilidad ante errores. |
| **Bootstrap 5** | Marco de UI para sistemas de cuadrícula responsivos y estilizado base. |
| **RxJS** | Maneja operaciones asíncronas y flujos de eventos. |

## 3. Estructura del Proyecto
El código fuente está organizado modularmente dentro de `src/app`:

- **`pages/`**: Vistas principales de la aplicación (Módulos cargados perezosamente).
    - `home`: Página de aterrizaje con presentación personal.
    - `portfolio`: Listado de proyectos.
    - `contact`: Formulario de contacto.
- **`components/`**: Elementos de UI reutilizables.
    - `header`: Barra de navegación.
    - `footer`: Pie de página de la aplicación.
    - `project-card`: Componente reutilizable para mostrar detalles del proyecto.
- **`services/`**: Lógica de negocio y gestión de estado.
- **`models/`**: Interfaces y enumeraciones de TypeScript para seguridad de tipos.
- **`shared/`**: Utilidades comunes.

## 4. Componentes y Enrutamiento
La aplicación utiliza Angular Router para la navegación, cargando componentes sin refrescar la página.

### Enrutamiento (`app-routing.module.ts`)
| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/home` | `HomeComponent` | Introducción personal, habilidades y biografía. |
| `/portfolio` | `PortfolioComponent` | Galería de proyectos. |
| `/contact` | `ContactComponent` | Formulario de contacto con validación. |
| `**` | - | Redirige a `/home`. |

### Componentes Clave
- **HeaderComponent**: Gestiona la navegación y el cambio de tema (Claro/Oscuro).
- **ProjectCardComponent**: Un componente "tonto" que recibe datos vía `@Input()` y emite eventos vía `@Output()`.
- **ContactComponent**: Utiliza **Formularios Reactivos** para una validación robusta y retroalimentación al usuario.

## 5. Personalización de Bootstrap
El proyecto personaliza Bootstrap 5 utilizando variables CSS globales en `styles.css` para asegurar una identidad de marca única y consistente.

### Variables Globales
- **Colores**: Definidos para fondo, superficie, texto primario y acentos (`--accent-start`, `--accent-end`).
- **Tipografía**: Utiliza 'Poppins' como la familia de fuentes primaria.

### Modo Oscuro
Una clase `.dark-theme` se aplica al `body` por el `ThemeService`. Esto sobrescribe las variables CSS para cambiar las paletas de colores dinámicamente (ej. fondos oscuros, texto claro) sin cambiar la lógica del componente.

### Elementos Personalizados
- **Botones**: `.btn-primary` se sobrescribe con un degradado personalizado y efectos de sombra.
- **Animaciones**: Transiciones globales para un cambio suave de modo de color y efectos hover.

## 6. Servicios y Gestión de Datos
Los servicios centralizan la lógica y el estado, siguiendo el patrón Singleton.

### `PortfolioService`
- Gestiona la recuperación de datos del proyecto.
- Implementa **caché** vía `sessionStorage` para prevenir la recuperación redundante de datos durante una sesión.

### `ThemeService`
- Controla el tema Claro/Oscuro.
- Persiste la preferencia del usuario en **localStorage** para que la configuración sobreviva a los reinicios del navegador.
- Reacciona a las preferencias del sistema (`prefers-color-scheme`).

### `StorageService`
- Un envoltorio genérico para `localStorage` y `sessionStorage`.
- Características clave:
    - **Seguridad de Tipos**: Utiliza Genéricos `<T>` para asegurar tipos de datos correctos.
    - **Manejo de Errores**: Maneja de forma segura errores de cuota o problemas de acceso.
    - **Seguridad**: Diseñado para estado de UI no sensible y caché.

### Formularios
El `ContactComponent` asegura la integridad de los datos utilizando:
- **Validadores**: Campos requeridos, formato de correo electrónico.
- **Preservación de Estado**: Guarda el contenido del borrador en `sessionStorage` automáticamente, restaurándolo si el usuario navega fuera y regresa accidentalmente.
