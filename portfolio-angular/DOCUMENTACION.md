# Portfolio Profesional Angular - Documentación

## Descripción del Proyecto

Este proyecto es la transformación del portfolio profesional de Alejandro Torres Muñoz, originalmente desarrollado en Bootstrap, a una aplicación web de una sola página (SPA) utilizando Angular con TypeScript.

## Estructura del Proyecto

```
portfolio-angular/
├── src/
│   ├── app/
│   │   ├── components/           # Componentes reutilizables
│   │   │   ├── header/           # Navegación y switch de tema
│   │   │   ├── footer/           # Pie de página con enlaces sociales
│   │   │   └── project-card/     # Tarjeta de proyecto reutilizable
│   │   ├── pages/                # Páginas de la aplicación
│   │   │   ├── home/             # Sección "Sobre Mí"
│   │   │   ├── portfolio/        # Lista de proyectos
│   │   │   └── contact/          # Formulario de contacto
│   │   ├── services/             # Servicios de la aplicación
│   │   │   ├── storage.service.ts    # Gestión de localStorage/sessionStorage
│   │   │   ├── theme.service.ts      # Tema claro/oscuro
│   │   │   └── project.service.ts    # Datos de proyectos
│   │   ├── models/               # Interfaces y enumerados TypeScript
│   │   │   ├── project.interface.ts
│   │   │   ├── contact-form.interface.ts
│   │   │   └── user-preferences.interface.ts
│   │   ├── app.ts                # Componente raíz
│   │   ├── app.routes.ts         # Configuración de rutas
│   │   └── app.config.ts         # Configuración de la aplicación
│   └── styles.css                # Estilos globales
```

## Componentes Implementados

### HeaderComponent
- Navegación con `routerLink` y `routerLinkActive`
- Toggle de menú para móviles
- Switch de tema claro/oscuro con persistencia

### HomeComponent
- Sección "Sobre Mí" con foto y biografía
- Video de presentación con controles
- Lista de habilidades con `@for`
- Información colapsable con `@if`

### PortfolioComponent
- Grid de tarjetas de proyectos
- Modal de detalles del proyecto
- Uso del componente reutilizable `ProjectCardComponent`

### ProjectCardComponent
- `@Input()` para recibir datos del proyecto
- `@Output()` para emitir eventos de "ver detalles"
- Badges de tecnologías

### ContactComponent
- Formulario con Angular Reactive Forms
- Validaciones: campos requeridos, formato email, longitud mínima
- Guardado de borrador en sessionStorage
- Mensajes de éxito/error

### FooterComponent
- Año dinámico con pipe `date`
- Enlaces a redes sociales

## Servicios de Almacenamiento Web

### StorageService
Servicio genérico para localStorage y sessionStorage:
- `set<T>()`: Guarda datos serializados
- `get<T>()`: Obtiene datos deserializados
- `remove()`: Elimina una clave
- `clear()`: Limpia todo el almacenamiento
- Manejo de errores con try-catch

### ThemeService
Gestión del tema claro/oscuro:
- Persistencia en localStorage
- Signal reactivo para cambios de tema
- Detección de preferencia del sistema

### ProjectService
Datos de proyectos:
- Caché en sessionStorage
- Métodos: `getProjects()`, `getProjectById()`, `getProjectsByTechnology()`

## TypeScript Avanzado

### Interfaces
- `Project`: id, name, description, demoUrl, codeUrl, technologies
- `ContactFormData`: name, email, message, termsAccepted
- `UserPreferences`: theme, language, lastVisit

### Enumerados
- `FormStatus`: IDLE, SUBMITTING, SUCCESS, ERROR
- `ThemeMode`: LIGHT, DARK, SYSTEM
- `StorageType`: LOCAL, SESSION

### Buenas Prácticas
- Sin uso de `any`
- Tipado estricto en todos los métodos
- Try-catch para manejo de excepciones

## Enrutamiento

Configurado en `app.routes.ts`:
- `/` → Redirección a `/home`
- `/home` → HomeComponent
- `/portfolio` → PortfolioComponent
- `/contact` → ContactComponent
- `**` → Redirección a `/home`

## Estilos

- Bootstrap 5 para diseño responsive
- Bootstrap Icons para iconografía
- Variables CSS para temas
- Animaciones CSS personalizadas
- Soporte completo para tema oscuro

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve

# Compilar para producción
ng build
# Compilar para producción
ng build
```

## Configuración de Assets y Scripts

- **Assets**: Las imágenes y videos se encuentran en `public/assets/` y se copian automáticamente a la carpeta de distribución.
- **Bootstrap JS**: Se ha configurado en `angular.json` para incluir `bootstrap.bundle.min.js`, necesario para componentes interactivos como el menú hamburguesa y modales.

## Requisitos Cumplidos

| Requisito | Estado |
|-----------|--------|
| Componentización Angular | ✅ |
| Enrutamiento SPA | ✅ |
| Formulario con validaciones | ✅ |
| localStorage para preferencias | ✅ |
| sessionStorage para caché/borrador | ✅ |
| Interfaces TypeScript | ✅ |
| Enumerados | ✅ |
| Manejo de excepciones | ✅ |
| Diseño responsive | ✅ |
| @Input/@Output | ✅ |
| *ngFor / @for | ✅ |
| *ngIf / @if | ✅ |
| Pipes (date) | ✅ |
