/**
 * Enumerado para modos de tema
 */
export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = 'system'
}

/**
 * Interfaz para preferencias de usuario
 */
export interface UserPreferences {
    theme: ThemeMode;
    language?: string;
    lastVisit?: string;
}
