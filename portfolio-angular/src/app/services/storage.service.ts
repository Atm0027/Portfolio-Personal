import { Injectable } from '@angular/core';

/**
 * Enumerado para tipos de almacenamiento
 */
export enum StorageType {
    LOCAL = 'localStorage',
    SESSION = 'sessionStorage'
}

/**
 * Servicio genérico para gestionar el almacenamiento web (localStorage/sessionStorage)
 * Implementa buenas prácticas de seguridad y manejo de errores
 */
@Injectable({
    providedIn: 'root'
})
export class StorageService {

    /**
     * Verifica si el almacenamiento está disponible en el navegador
     */
    private isStorageAvailable(type: StorageType): boolean {
        try {
            const storage = type === StorageType.LOCAL ? localStorage : sessionStorage;
            const testKey = '__storage_test__';
            storage.setItem(testKey, testKey);
            storage.removeItem(testKey);
            return true;
        } catch (error: unknown) {
            console.warn(`Storage ${type} no disponible:`, error);
            return false;
        }
    }

    /**
     * Obtiene el objeto de almacenamiento según el tipo
     */
    private getStorage(type: StorageType): Storage | null {
        if (!this.isStorageAvailable(type)) {
            return null;
        }
        return type === StorageType.LOCAL ? localStorage : sessionStorage;
    }

    /**
     * Guarda un valor en el almacenamiento
     * @param key - Clave para identificar el dato
     * @param value - Valor a almacenar (se serializa a JSON)
     * @param type - Tipo de almacenamiento (localStorage o sessionStorage)
     */
    set<T>(key: string, value: T, type: StorageType = StorageType.LOCAL): boolean {
        try {
            const storage = this.getStorage(type);
            if (!storage) {
                return false;
            }

            const serializedValue = JSON.stringify(value);
            storage.setItem(key, serializedValue);
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error al guardar en ${type}:`, error.message);

                // Manejar error de cuota excedida
                if (error.name === 'QuotaExceededError') {
                    console.warn('Almacenamiento lleno. Considera limpiar datos antiguos.');
                }
            }
            return false;
        }
    }

    /**
     * Obtiene un valor del almacenamiento
     * @param key - Clave del dato a recuperar
     * @param type - Tipo de almacenamiento
     * @param defaultValue - Valor por defecto si no existe la clave
     */
    get<T>(key: string, type: StorageType = StorageType.LOCAL, defaultValue?: T): T | null {
        try {
            const storage = this.getStorage(type);
            if (!storage) {
                return defaultValue ?? null;
            }

            const item = storage.getItem(key);
            if (item === null) {
                return defaultValue ?? null;
            }

            return JSON.parse(item) as T;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error al leer de ${type}:`, error.message);
            }
            return defaultValue ?? null;
        }
    }

    /**
     * Elimina un valor del almacenamiento
     * @param key - Clave del dato a eliminar
     * @param type - Tipo de almacenamiento
     */
    remove(key: string, type: StorageType = StorageType.LOCAL): boolean {
        try {
            const storage = this.getStorage(type);
            if (!storage) {
                return false;
            }

            storage.removeItem(key);
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error al eliminar de ${type}:`, error.message);
            }
            return false;
        }
    }

    /**
     * Limpia todo el almacenamiento del tipo especificado
     * @param type - Tipo de almacenamiento
     */
    clear(type: StorageType = StorageType.LOCAL): boolean {
        try {
            const storage = this.getStorage(type);
            if (!storage) {
                return false;
            }

            storage.clear();
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error al limpiar ${type}:`, error.message);
            }
            return false;
        }
    }

    /**
     * Verifica si existe una clave en el almacenamiento
     * @param key - Clave a verificar
     * @param type - Tipo de almacenamiento
     */
    has(key: string, type: StorageType = StorageType.LOCAL): boolean {
        const storage = this.getStorage(type);
        if (!storage) {
            return false;
        }
        return storage.getItem(key) !== null;
    }
}
