/**
 * Interfaz para representar un proyecto del portfolio
 */
export interface Project {
  id: number;
  name: string;
  description: string;
  demoUrl: string;
  codeUrl: string;
  technologies: string[];
  imageUrl?: string;
}
