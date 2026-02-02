import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services';
import { ThemeMode } from '../../models';

/**
 * Componente de cabecera con navegación y switch de tema
 */
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    /** Estado del menú móvil */
    isMenuOpen = false;

    constructor(private themeService: ThemeService) { }

    /**
     * Alterna el menú móvil
     */
    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    /**
     * Cierra el menú móvil
     */
    closeMenu(): void {
        this.isMenuOpen = false;
    }

    /**
     * Alterna el tema claro/oscuro
     */
    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    /**
     * Verifica si el tema actual es oscuro
     */
    isDarkTheme(): boolean {
        return this.themeService.isDarkTheme();
    }

    /**
     * Obtiene el texto del botón de tema
     */
    getThemeButtonText(): string {
        return this.themeService.isDarkTheme() ? 'Tema Claro' : 'Tema Oscuro';
    }

    /**
     * Obtiene el icono del botón de tema
     */
    getThemeIcon(): string {
        return this.themeService.isDarkTheme() ? 'bi-sun' : 'bi-moon';
    }
}
