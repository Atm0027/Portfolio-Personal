import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../models';

/**
 * Componente reutilizable para mostrar una tarjeta de proyecto
 * Utiliza @Input para recibir datos y @Output para emitir eventos
 */
@Component({
    selector: 'app-project-card',
    standalone: true,
    imports: [],
    templateUrl: './project-card.component.html',
    styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
    /** Proyecto a mostrar */
    @Input({ required: true }) project!: Project;

    /** Evento emitido al hacer clic en ver detalles */
    @Output() viewDetails = new EventEmitter<Project>();

    /**
     * Emite el evento de ver detalles
     */
    onViewDetails(): void {
        this.viewDetails.emit(this.project);
    }

    /**
     * Obtiene las primeras N tecnologías para mostrar
     */
    getDisplayedTechnologies(limit: number = 3): string[] {
        return this.project.technologies.slice(0, limit);
    }

    /**
     * Verifica si hay más tecnologías para mostrar
     */
    hasMoreTechnologies(limit: number = 3): boolean {
        return this.project.technologies.length > limit;
    }

    /**
     * Obtiene el número de tecnologías adicionales
     */
    getExtraTechnologiesCount(limit: number = 3): number {
        return this.project.technologies.length - limit;
    }
}
