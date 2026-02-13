import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Componente de pie de página
 */
@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  /** Año actual para el copyright */
  currentYear = new Date();

  /** Información de contacto */
  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alejandro-torres-mu%C3%B1oz-745341351/',
      icon: 'bi-linkedin',
      external: true
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Atm0027',
      icon: 'bi-github',
      external: true
    },
    {
      name: 'Teléfono',
      url: 'tel:+34624613932',
      icon: 'bi-telephone',
      external: false
    }
  ];
}
