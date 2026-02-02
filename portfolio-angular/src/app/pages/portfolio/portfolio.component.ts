import { Component, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProjectService } from '../../services';
import { Project } from '../../models';

/**
 * Componente de la página Portfolio
 * Muestra la lista de proyectos usando el componente reutilizable ProjectCard
 */
@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [ProjectCardComponent],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.css'
})
export default class PortfolioComponent implements OnInit {
    /** Lista de proyectos */
    projects: Project[] = [];

    /** Proyecto seleccionado para ver detalles */
    selectedProject: Project | null = null;

    /** Indica si el modal de detalles está visible */
    isModalOpen = false;

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.loadProjects();
    }

    /**
     * Carga los proyectos desde el servicio
     */
    private loadProjects(): void {
        try {
            this.projects = this.projectService.getProjects();
        } catch (error: unknown) {
            console.error('Error al cargar proyectos:', error);
            this.projects = [];
        }
    }

    /**
     * Maneja el evento de ver detalles de un proyecto
     */
    onViewDetails(project: Project): void {
        this.selectedProject = project;
        this.isModalOpen = true;
    }

    /**
     * Cierra el modal de detalles
     */
    closeModal(): void {
        this.isModalOpen = false;
        this.selectedProject = null;
    }

    /**
     * Refresca la lista de proyectos
     */
    refreshProjects(): void {
        this.projects = this.projectService.refreshProjects();
    }
}
