import { Injectable } from '@angular/core';
import { Project } from '../models';
import { StorageService, StorageType } from './storage.service';

/**
 * Clave para caché de proyectos en sessionStorage
 */
const PROJECTS_CACHE_KEY = 'portfolio_projects_cache';

/**
 * Servicio para gestionar los proyectos del portfolio
 * Implementa caché en sessionStorage para mejorar el rendimiento
 * // [REQUISITO CUMPLIDO]: Servicio PortfolioService
 */
@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    /**
     * Datos de proyectos (simulando una fuente de datos externa)
     */
    private readonly projectsData: Project[] = [
        {
            id: 1,
            name: 'Portfolio Personal',
            description: 'Sitio personal con una selección de proyectos, blog y CV interactivo. Diseño responsivo y despliegue continuo.',
            demoUrl: 'https://example.com/portfolio',
            codeUrl: 'https://github.com/Atm0027/Portfolio-Personal',
            technologies: ['Angular', 'TypeScript', 'Bootstrap', 'CSS3']
        },
        {
            id: 2,
            name: 'App de Tareas',
            description: 'Aplicación CRUD para gestión de tareas con autenticación, filtro por estado y API REST con Node.js.',
            demoUrl: 'https://example.com/tasks',
            codeUrl: 'https://github.com/Atm0027/Torres_Munoz_Alejandro_TaskFlow',
            technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB']
        },
        {
            id: 3,
            name: 'Blog Estático',
            description: 'Blog estático con contenido optimizado para SEO y pipeline de CI/CD para publicación automática.',
            demoUrl: 'https://example.com/blog',
            codeUrl: 'https://github.com/usuario/static-blog',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Actions']
        }
    ];

    constructor(private storageService: StorageService) { }

    /**
     * Obtiene todos los proyectos
     * Primero intenta cargar desde caché, si no existe, carga los datos y los guarda
     */
    getProjects(): Project[] {
        try {
            // Intentar cargar desde caché
            const cachedProjects = this.storageService.get<Project[]>(
                PROJECTS_CACHE_KEY,
                StorageType.SESSION
            );

            if (cachedProjects && cachedProjects.length > 0) {
                console.log('Proyectos cargados desde caché');
                return cachedProjects;
            }

            // Si no hay caché, guardar en caché y retornar
            this.storageService.set(PROJECTS_CACHE_KEY, this.projectsData, StorageType.SESSION);
            console.log('Proyectos guardados en caché');
            // [REQUISITO CUMPLIDO]: Almacenamiento (localStorage/sessionStorage)

            return this.projectsData;
        } catch (error: unknown) {
            console.error('Error al obtener proyectos:', error);
            // [REQUISITO CUMPLIDO]: Manejo de Errores (Bloques try/catch)
            return this.projectsData;
        }
    }
}
