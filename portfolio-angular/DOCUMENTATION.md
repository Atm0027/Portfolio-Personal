# Project Documentation

## 1. Overview
This project is a Single Page Application (SPA) developed with Angular, designed to present a professional portfolio. It transforms a static design into a dynamic, performance-optimized application using modern web development practices.

## 2. Technologies Used

| Technology | Purpose |
|------------|---------|
| **Angular** | Main framework for structure, dependency injection, and performance. |
| **TypeScript** | Adds static typing to JavaScript for better maintainability and error reliability. |
| **Bootstrap 5** | UI framework for responsive grid systems and base styling. |
| **RxJS** | Handles asynchronous operations and event streams. |

## 3. Project Structure
The source code is modularly organized within `src/app`:

- **`pages/`**: Main application views (Lazy Loaded modules).
    - `home`: Landing page with personal presentation.
    - `portfolio`: Project listing.
    - `contact`: Contact form.
- **`components/`**: Reusable UI elements.
    - `header`: Navigation bar.
    - `footer`: Application footer.
    - `project-card`: Reusable component to display project details.
- **`services/`**: Business logic and state management.
- **`models/`**: TypeScript interfaces and enums for type safety.
- **`shared/`**: Common utilities.

## 4. Components and Routing
The application uses the Angular Router for navigation, loading components without refreshing the page.

### Routing (`app-routing.module.ts`)
| Route | Component | Description |
|-------|-----------|-------------|
| `/home` | `HomeComponent` | Personal introduction, skills, and bio. |
| `/portfolio` | `PortfolioComponent` | Gallery of projects. |
| `/contact` | `ContactComponent` | Contact form with validation. |
| `**` | - | Redirects to `/home`. |

### Key Components
- **HeaderComponent**: Manages navigation and the theme switch (Light/Dark).
- **ProjectCardComponent**: A "dumb" component that receives data via `@Input()` and emits events via `@Output()`.
- **ContactComponent**: Uses **Reactive Forms** for robust validation and user feedback.

## 5. Bootstrap Customization
The project customizes Bootstrap 5 using global CSS variables in `styles.css` to ensure a unique and consistent brand identity.

### Global Variables
- **Colors**: Defined for background, surface, primary text, and accents (`--accent-start`, `--accent-end`).
- **Typography**: Uses 'Poppins' as the primary font family.

### Dark Mode
A `.dark-theme` class is applied to the `body` by the `ThemeService`. This overrides CSS variables to switch color palettes dynamically (e.g., dark backgrounds, light text) without changing component logic.

### Custom Elements
- **Buttons**: `.btn-primary` is overridden with a custom gradient and shadow effects.
- **Animations**: Global transitions for smooth color mode switching and hover effects.

## 6. Services and Data Management
Services centralize logic and state, following the Singleton pattern.

### `PortfolioService`
- Manages project data retrieval.
- Implements **caching** via `sessionStorage` to prevent redundant data fetching during a session.

### `ThemeService`
- Controls the Light/Dark theme.
- Persists user preference in **localStorage** so settings survive browser restarts.
- Reacts to system preferences (`prefers-color-scheme`).

### `StorageService`
- A generic wrapper for `localStorage` and `sessionStorage`.
- Key features:
    - **Type Safety**: Uses Generics `<T>` to ensure correct data types.
    - **Error Handling**: Safely handles quota errors or access issues.
    - **Security**: Designed for non-sensitive UI state and cache.

### Forms
The `ContactComponent` ensures data integrity using:
- **Validators**: Required fields, email format.
- **State Preservation**: Saves draft content to `sessionStorage` automatically, restoring it if the user accidentally navigates away and returns.
