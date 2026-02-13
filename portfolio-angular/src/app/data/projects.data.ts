import { Project } from '../models/project.interface';

/**
 * Datos de proyectos del portfolio
 * Separado del servicio para facilitar mantenimiento
 */
export const PROJECTS_DATA: Project[] = [
    {
        id: 1,
        name: 'Portfolio Personal',
        description: 'Sitio personal con una selección de proyectos, blog y CV interactivo. Diseño responsivo y despliegue continuo.',

        codeUrl: 'https://github.com/Atm0027/Portfolio-Personal',
        technologies: ['Angular', 'TypeScript', 'Bootstrap', 'CSS3'],
        imageUrl: 'https://placehold.co/600x400/2c3e50/ffffff?text=Portfolio+Personal'
    },
    {
        id: 2,
        name: 'App de Tareas',
        description: 'Aplicación CRUD para gestión de tareas con autenticación, filtro por estado y API REST con Node.js.',

        codeUrl: 'https://github.com/Atm0027/Torres_Munoz_Alejandro_TaskFlow',
        technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
        imageUrl: 'https://placehold.co/600x400/e74c3c/ffffff?text=App+de+Tareas'
    },
    {
        id: 3,
        name: 'Blog Estático',
        description: 'Blog estático con contenido optimizado para SEO y pipeline de CI/CD para publicación automática.',

        codeUrl: 'https://github.com/usuario/static-blog',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Actions'],
        imageUrl: 'https://placehold.co/600x400/27ae60/ffffff?text=Blog+Estático'
    }
];
