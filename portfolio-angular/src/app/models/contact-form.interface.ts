/**
 * Interfaz para datos del formulario de contacto
 */
export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    termsAccepted: boolean;
}

/**
 * Enumerado para estados del formulario
 */
export enum FormStatus {
    IDLE = 'idle',
    SUBMITTING = 'submitting',
    SUCCESS = 'success',
    ERROR = 'error'
}
