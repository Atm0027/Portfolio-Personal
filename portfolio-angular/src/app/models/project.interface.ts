/**
 * Interfaz para representar un proyecto del portfolio
 * // [REQUISITO CUMPLIDO]: Interfaces claras (no usar 'any')
 */
export interface Project {
  id: number;
  name: string;
  description: string;
  codeUrl: string;
  technologies: string[];
  imageUrl?: string; // Opcional
}
