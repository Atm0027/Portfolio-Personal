# Informe Técnico: Arquitectura y Lógica del Proyecto Portfolio

## 1. Visión General
Este proyecto es una aplicación web de tipo **Single Page Application (SPA)** desarrollada con **Angular**. Su objetivo es presentar un portfolio profesional dinámico, rápido y fácil de mantener, reemplazando una versión anterior estática.

La aplicación carga una sola vez (`index.html`) y utiliza JavaScript para renderizar diferentes vistas y componentes sin recargar la página completa, ofreciendo una experiencia de usuario fluida.

## 2. Estructura del Proyecto
El código fuente se organiza de manera modular dentro de `src/app`, siguiendo las mejores prácticas de Angular:

### Directorios Principales
- **`pages/` (Vistas Principales)**: Contiene las secciones grandes de la web.
    - `home`: La página de inicio con la presentación.
    - `portfolio`: El listado de proyectos.
    - `contact`: El formulario de contacto.
    *Lógica*: Cada página es un "Módulo" independiente que se carga solo cuando el usuario lo visita (**Lazy Loading**), mejorando la velocidad inicial.

- **`components/` (Componentes Reutilizables)**: Piezas de interfaz que se usan en varios sitios.
    - `header`: Barra de navegación.
    - `footer`: Pie de página.
    - `project-card`: Un componente "tarjeta" que recibe datos de un proyecto y los muestra de forma consistente.
    *Lógica*: Estos componentes son "tontos" (dumb components); principalmente reciben datos (`@Input`) y emiten eventos (`@Output`), delegando la lógica compleja a los servicios o páginas padres.

- **`services/` (Lógica de Negocio y Estado)**: Aquí reside la inteligencia de la aplicación.
    - `PortfolioService`: Gestiona la obtención de los datos de los proyectos. Usa un sistema de caché para no recargar datos innecesariamente.
    - `ThemeService`: Controla el tema (Claro/Oscuro) y guarda la preferencia del usuario.
    - `StorageService`: Utilidad para guardar datos en el navegador (`localStorage`/`sessionStorage`) de forma segura y tipada.

- **`models/` (Tipado)**: Definiciones de TypeScript (Interfaces) que describen cómo son los datos (`Project`, `UserPreferences`). Esto evita errores de programación al garantizar que siempre sepamos qué campos tiene un objeto.

- **`shared/`**: Utilidades comunes compartidas por toda la app.

## 3. Lógica Clave

### Enrutamiento (Routing)
El archivo `app-routing.module.ts` define el "mapa" de la web.
- Si vas a `/home`, carga el módulo `HomeModule`.
- Si vas a `/portfolio`, carga `PortfolioModule`.
- Esto permite que la web crezca sin hacerse lenta, ya que solo descargas el código de la página que estás viendo.

### Gestión de Datos (Services)
En lugar de que cada componente busque sus propios datos, los **Servicios** centralizan esta tarea.
- **Patrón Singleton**: Angular crea una única instancia de cada servicio. Si cambias el tema en el `Header`, el `ThemeService` guarda ese estado, y cualquier otro componente puede leerlo inmediatamente.
- **Reactividad (Signals/RxJS)**: La aplicación reacciona a cambios. Por ejemplo, al cambiar el tema, todos los componentes se enteran y actualizan sus estilos automáticamente sin necesidad de recargar.

## 4. Tecnologías Utilizadas

| Tecnología | Rol | ¿Por qué? |
|------------|-----|-----------|
| **Angular** | Framework Principal | Proporciona la estructura robusta, inyección de dependencias y rendimiento optimizado para aplicaciones grandes. |
| **TypeScript** | Lenguaje | Añade "tipos" a JavaScript. Nos avisa de errores mientras escribimos el código (ej: intentar acceder a una propiedad que no existe en un proyecto). |
| **Bootstrap 5** | Diseño UI | Sistema de rejilla (Grid) y estilos base para que la web sea **Responsive** (se adapte a móviles y PC) rápidamente. |
| **RxJS** | Manejo Asíncrono | Permite gestionar eventos complejos, como esperar a que lleguen datos o manejar la interacción del usuario de forma fluida. |

## Conclusión
La arquitectura está diseñada para ser **escalable** y **mantenible**. La separación entre **presentación** (componentes) y **lógica** (servicios) facilita hacer cambios futuros (como añadir un backend real) sin tener que reescribir toda la interfaz.
