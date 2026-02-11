# Portfolio Profesional Angular - Documentación

## Descripción del Proyecto

Este proyecto es la transformación del portfolio profesional de Alejandro Torres Muñoz, originalmente desarrollado en Bootstrap, a una aplicación web de una sola página (SPA) utilizando Angular con TypeScript.

## Estructura del Proyecto

```
portfolio-angular/
├── src/
│   ├── app/
│   │   ├── components/               # Componentes reutilizables
│   │   │   ├── header/               # Navegación y switch de tema
│   │   │   ├── footer/               # Pie de página con enlaces sociales
│   │   │   ├── contact/              # Formulario de contacto
│   │   │   └── project-card/         # Tarjeta de proyecto reutilizable
│   │   ├── pages/                    # Páginas de la aplicación
│   │   │   ├── home/                 # Sección "Sobre Mí"
│   │   │   └── portfolio/            # Lista de proyectos
│   │   ├── services/                 # Servicios de la aplicación
│   │   │   ├── storage.service.ts    # Gestión de localStorage/sessionStorage
│   │   │   ├── theme.service.ts      # Tema claro/oscuro
│   │   │   ├── portfolio.service.ts  # Datos de proyectos con caché
│   │   │   └── index.ts             # Barrel export
│   │   ├── interfaces/               # Interfaces TypeScript
│   │   │   └── project.interface.ts  # Interfaz Project
│   │   ├── models/                   # Modelos y enumerados
│   │   │   ├── contact-form.interface.ts     # Interfaz ContactFormData + Enum FormStatus
│   │   │   ├── user-preferences.interface.ts # Interfaz UserPreferences + Enum ThemeMode
│   │   │   └── index.ts             # Barrel export
│   │   ├── app.module.ts            # Módulo raíz (NgModule)
│   │   ├── app-routing.module.ts    # Módulo de enrutamiento
│   │   ├── app.ts                   # Componente raíz
│   │   └── app.html                 # Template raíz con <router-outlet>
│   ├── styles.css                   # Estilos globales
│   └── main.ts                      # Bootstrap de la aplicación
```

## Componentes Implementados (Tema 15)

### HeaderComponent
- Navegación con `routerLink` y `routerLinkActive`
- Toggle de menú para móviles
- Switch de tema claro/oscuro con persistencia en localStorage

### HomeComponent
- Sección "Sobre Mí" con foto de perfil y biografía
- Video de presentación con controles multimedia
- Lista de habilidades con directiva `*ngFor`
- Información colapsable con directiva `*ngIf`

### PortfolioComponent
- Grid responsivo de tarjetas de proyectos
- Uso del componente reutilizable `ProjectCardComponent` con `*ngFor`
- Modal de detalles con `*ngIf`
- Pipe `uppercase` para formateo de datos
- Función `trackBy` para optimización de rendimiento

### ProjectCardComponent
- `@Input()` para recibir datos del proyecto padre
- `@Output()` con `EventEmitter` para emitir evento "ver detalles" al padre
- Badges de tecnologías con `*ngFor`
- Control de límite de tecnologías mostradas con `*ngIf`

### ContactComponent
- Formulario con Angular Reactive Forms (`FormBuilder`, `FormGroup`, `Validators`)
- Validaciones: campos requeridos, formato de email, longitud mínima
- Guardado automático de borrador en sessionStorage (se restaura al volver)
- Mensajes de éxito/error con `*ngIf`
- Spinner de envío con `*ngIf`

### FooterComponent
- Año dinámico con pipe `date:'yyyy'`
- Enlaces a redes sociales con `*ngFor`

## Enrutamiento (app-routing.module.ts)

Configurado mediante `RouterModule.forRoot()` con navegación a través de `<router-outlet>` y enlaces `routerLink`:

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/home` | HomeComponent | Presentación personal |
| `/portfolio` | PortfolioComponent | Lista de proyectos |
| `/contact` | ContactComponent | Formulario de contacto |
| `/` | — | Redirección a `/home` |
| `**` | — | Wildcard → `/home` |

## Servicios de Almacenamiento Web (Tema 14)

### StorageService
Servicio genérico para localStorage y sessionStorage con tipado genérico:
- `set<T>(key, value, type)`: Guarda datos serializados con JSON
- `get<T>(key, type, defaultValue?)`: Obtiene datos deserializados con tipo seguro
- `remove(key, type)`: Elimina una clave específica
- `clear(type)`: Limpia todo el almacenamiento
- `has(key, type)`: Verifica existencia de una clave
- Manejo de errores: try-catch en cada método, detección de `QuotaExceededError`
- Verificación de disponibilidad del storage antes de operar
- **Seguridad**: No se almacenan datos sensibles (contraseñas, tokens), solo preferencias de UI y cachés temporales

### ThemeService
Gestión del tema claro/oscuro:
- Persistencia de preferencia en **localStorage** (sobrevive cierre del navegador)
- Signal reactivo de Angular para cambios de tema en tiempo real
- Detección automática de preferencia del sistema (`prefers-color-scheme`)
- Compatibilidad con SSR (verificación `isPlatformBrowser`)

### PortfolioService
Datos de proyectos con caché:
- Caché de proyectos en **sessionStorage** (disponible mientras la pestaña esté abierta)
- Métodos: `getProjects()`, `getProjectById()`, `getProjectsByTechnology()`, `refreshProjects()`
- **Funcionalidad offline parcial**: Los datos cacheados permiten funcionar sin reconexión durante la sesión

## TypeScript Avanzado (Tema 13)

### Interfaces
- `Project`: id, name, description, demoUrl, codeUrl, technologies, imageUrl?
- `ContactFormData`: name, email, message, termsAccepted
- `UserPreferences`: theme, language?, lastVisit?

### Enumerados
- `FormStatus`: IDLE, SUBMITTING, SUCCESS, ERROR — Estados del formulario
- `ThemeMode`: LIGHT, DARK, SYSTEM — Modos de tema
- `StorageType`: LOCAL, SESSION — Tipos de almacenamiento

### Decisiones de Diseño TypeScript
1. **Sin uso de `any`**: Todos los métodos y propiedades tienen tipado explícito. Se usa `ReturnType<typeof setTimeout>` para IDs de temporizadores en lugar de `any`, y `unknown` para bloques catch.
2. **Genéricos**: `StorageService` usa métodos genéricos (`set<T>`, `get<T>`) para tipado seguro de cualquier estructura de datos almacenada.
3. **Strict mode activado**: `tsconfig.json` tiene `strict: true`, `strictTemplates: true`, `noImplicitReturns: true` y `noFallthroughCasesInSwitch: true`.
4. **Gestión de excepciones**: Cada operación de almacenamiento y carga de datos envuelve su lógica en bloques `try-catch` tipados con `error: unknown`, con logging contextual y valores fallback seguros.
5. **Propiedades opcionales**: Se usa el operador `?` en interfaces (`imageUrl?`, `language?`) para campos que pueden no existir, evitando valores nulos accidentales.

## Interactividad y Comunicación entre Componentes

| Técnica | Ubicación | Ejemplo |
|---------|-----------|---------|
| `*ngFor` | Home, Portfolio, Footer, ProjectCard | Iterar skills, proyectos, enlaces |
| `*ngIf` | Home, Contact, Portfolio | Secciones colapsables, validaciones, modal |
| `@Input()` | ProjectCardComponent | Recibe objeto `Project` del padre |
| `@Output()` | ProjectCardComponent | Emite evento `viewDetails` al padre |
| Pipes | Footer (`date`), Portfolio (`uppercase`) | Formateo de año y nombres |
| `[class.X]` | Header, Contact | Binding dinámico de clases CSS |
| `(click)` | Múltiples | Event binding para acciones |
| `routerLink` | Header, Home | Navegación SPA |
| `routerLinkActive` | Header | Resaltado de enlace activo |

## Responsive Design (Bootstrap 5)

- Bootstrap 5 como framework CSS principal
- Bootstrap Icons para iconografía
- Grid system (`row`, `col-md-4`, etc.) para layouts adaptativos
- Navbar con toggler para menú móvil
- Media queries personalizadas para breakpoints ≤768px y ≤480px
- Variables CSS para temas (claro/oscuro)
- Animaciones CSS suaves con `transition` y `@keyframes`
- `@media (prefers-reduced-motion)` para accesibilidad

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve

# Compilar para producción
ng build
```

## Requisitos Cumplidos

| Requisito | Estado | Ubicación |
|-----------|--------|-----------|
| Componentización Angular | ✅ | 6 componentes: Header, Footer, Home, Portfolio, Contact, ProjectCard |
| Enrutamiento SPA (`app-routing.module.ts`) | ✅ | `<router-outlet>`, `routerLink`, rutas definidas |
| Formulario con validaciones | ✅ | ContactComponent con ReactiveFormsModule |
| localStorage para preferencias | ✅ | ThemeService → preferencias de tema |
| sessionStorage para caché/borrador | ✅ | PortfolioService (caché), ContactComponent (borrador) |
| Interfaces TypeScript | ✅ | Project, ContactFormData, UserPreferences |
| Enumerados | ✅ | FormStatus, ThemeMode, StorageType |
| Manejo de excepciones (try-catch) | ✅ | Todos los servicios y componentes |
| Sin uso de `any` | ✅ | Tipado estricto con `strict: true` |
| Diseño responsive (Bootstrap) | ✅ | Grid + media queries + navbar toggler |
| `@Input()` / `@Output()` | ✅ | ProjectCardComponent |
| `*ngFor` | ✅ | Home, Portfolio, Footer, ProjectCard |
| `*ngIf` | ✅ | Home, Contact, Portfolio, ProjectCard |
| Pipes (`date`, `uppercase`) | ✅ | Footer, Portfolio |
