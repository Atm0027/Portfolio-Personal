import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Componente de la página Home (Sobre Mí)
 */
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  /** Indica si la información adicional está expandida */
  isMoreInfoExpanded = false;

  /** Indica si la información del video está expandida */
  isVideoInfoExpanded = false;

  /** Habilidades del desarrollador */
  skills: string[] = ['JavaScript', 'HTML', 'CSS', 'SpringBoot', 'Java', 'PostgreSQL'];

  /**
   * Alterna la sección de más información
   */
  toggleMoreInfo(): void {
    this.isMoreInfoExpanded = !this.isMoreInfoExpanded;
  }

  /**
   * Alterna la sección de información del video
   */
  toggleVideoInfo(): void {
    this.isVideoInfoExpanded = !this.isVideoInfoExpanded;
  }
}
