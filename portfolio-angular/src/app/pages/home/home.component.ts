import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Componente de la página Home (Sobre Mí)
 */
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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

  /**
   * Reproduce el video de presentación
   */
  playVideo(): void {
    const video = document.getElementById('presentationVideo') as HTMLVideoElement;
    if (video) {
      video.play();
      const playBtn = document.getElementById('playVideoBtn');
      if (playBtn) {
        playBtn.style.display = 'none';
      }
    }
  }

  /**
   * Maneja el evento cuando el video termina
   */
  onVideoEnded(): void {
    const playBtn = document.getElementById('playVideoBtn');
    if (playBtn) {
      playBtn.style.display = 'block';
    }
  }
}
