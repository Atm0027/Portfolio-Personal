import { Injectable, signal, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageService, StorageType } from './storage.service';
import { ThemeMode, UserPreferences } from '../models';

/**
 * Clave para almacenar las preferencias de usuario
 */
const PREFERENCES_KEY = 'portfolio_user_preferences';

/**
 * Servicio para gestionar el tema de la aplicación (claro/oscuro)
 * Persiste la preferencia en localStorage
 */
@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    /** Signal reactivo para el tema actual */
    private currentTheme = signal<ThemeMode>(ThemeMode.LIGHT);

    /** Preferencias de usuario completas */
    private preferences = signal<UserPreferences>({
        theme: ThemeMode.LIGHT
    });

    /** Indica si estamos en el navegador (evita errores en SSR) */
    private isBrowser: boolean;

    constructor(
        private storageService: StorageService,
        @Inject(PLATFORM_ID) platformId: object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.loadPreferences();

        // Efecto para aplicar el tema cuando cambie
        effect(() => {
            const theme = this.currentTheme();
            if (this.isBrowser) {
                this.applyTheme(theme);
            }
        });
    }

    /**
     * Carga las preferencias desde localStorage
     */
    private loadPreferences(): void {
        if (!this.isBrowser) return;

        try {
            const storedPrefs = this.storageService.get<UserPreferences>(
                PREFERENCES_KEY,
                StorageType.LOCAL
            );

            if (storedPrefs) {
                this.preferences.set(storedPrefs);
                this.currentTheme.set(storedPrefs.theme);
            } else {
                // Detectar preferencia del sistema
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const initialTheme = prefersDark ? ThemeMode.DARK : ThemeMode.LIGHT;
                this.currentTheme.set(initialTheme);
            }
        } catch (error: unknown) {
            console.error('Error al cargar preferencias:', error);
        }
    }

    /**
     * Aplica el tema al documento
     */
    private applyTheme(theme: ThemeMode): void {
        if (!this.isBrowser) return;

        const body = document.body;

        // Remover clases de tema anteriores
        body.classList.remove('light-theme', 'dark-theme');

        // Añadir la clase correspondiente
        if (theme === ThemeMode.DARK) {
            body.classList.add('dark-theme');
        } else {
            body.classList.add('light-theme');
        }

        // Actualizar el atributo data-theme para compatibilidad
        document.documentElement.setAttribute('data-theme', theme);
    }

    /**
     * Guarda las preferencias en localStorage
     */
    private savePreferences(): void {
        const prefs: UserPreferences = {
            ...this.preferences(),
            theme: this.currentTheme(),
            lastVisit: new Date().toISOString()
        };

        this.preferences.set(prefs);
        this.storageService.set(PREFERENCES_KEY, prefs, StorageType.LOCAL);
    }

    /**
     * Establece un tema específico
     */
    setTheme(theme: ThemeMode): void {
        this.currentTheme.set(theme);
        this.savePreferences();
    }

    /**
     * Alterna entre tema claro y oscuro
     */
    toggleTheme(): void {
        const newTheme = this.currentTheme() === ThemeMode.LIGHT
            ? ThemeMode.DARK
            : ThemeMode.LIGHT;
        this.setTheme(newTheme);
    }

    /**
     * Verifica si el tema actual es oscuro
     */
    isDarkTheme(): boolean {
        return this.currentTheme() === ThemeMode.DARK;
    }
}
