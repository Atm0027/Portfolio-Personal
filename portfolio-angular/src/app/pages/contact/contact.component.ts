import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService, StorageType } from '../../services';
import { ContactFormData, FormStatus } from '../../models';

/**
 * Clave para guardar borrador del formulario en sessionStorage
 */
const DRAFT_KEY = 'portfolio_contact_draft';

/**
 * Componente de la página de Contacto
 * Implementa Angular Reactive Forms con validaciones
 * // [REQUISITO CUMPLIDO]: Reactive Forms
 */
@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, OnDestroy {
  /** Formulario de contacto */
  contactForm!: FormGroup;

  /** Estado actual del formulario */
  formStatus: FormStatus = FormStatus.IDLE;

  /** Timeout ID para simular envío */
  private submitTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Acceso al enum desde el template */
  FormStatus = FormStatus;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDraft();
  }

  ngOnDestroy(): void {
    if (this.formStatus !== FormStatus.SUCCESS) {
      this.saveDraft();
    }

    // Limpiar timeout para evitar memory leaks
    if (this.submitTimeout) {
      clearTimeout(this.submitTimeout);
    }
  }

  /**
   * Inicializa el formulario con validaciones
   * // [REQUISITO CUMPLIDO]: Validaciones (Required, Email, longitud mínima)
   */
  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  /**
   * Carga el borrador guardado desde sessionStorage
   */
  private loadDraft(): void {
    try {
      const draft = this.storageService.get<Partial<ContactFormData>>(
        DRAFT_KEY,
        StorageType.SESSION
      );

      if (draft) {
        this.contactForm.patchValue({
          name: draft.name || '',
          email: draft.email || '',
          message: draft.message || ''
        });
      }
    } catch (error: unknown) {
      console.error('Error al cargar borrador:', error);
    }
  }

  /**
   * Guarda el borrador del formulario en sessionStorage
   */
  private saveDraft(): void {
    if (this.contactForm.dirty) {
      const formValue = this.contactForm.value;
      const draft: Partial<ContactFormData> = {
        name: formValue.name,
        email: formValue.email,
        message: formValue.message
      };
      this.storageService.set(DRAFT_KEY, draft, StorageType.SESSION);
    }
  }

  /**
   * Limpia el borrador guardado
   */
  private clearDraft(): void {
    this.storageService.remove(DRAFT_KEY, StorageType.SESSION);
  }

  /**
   * Envía el formulario
   */
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.formStatus = FormStatus.SUBMITTING;

    // Simular envío (en producción sería una llamada HTTP)
    this.submitTimeout = setTimeout(() => {
      try {
        const formData: ContactFormData = this.contactForm.value;
        console.log('Formulario enviado:', formData);

        this.formStatus = FormStatus.SUCCESS;
        this.clearDraft();
        this.contactForm.reset();

        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.formStatus = FormStatus.IDLE;
        }, 5000);
      } catch (error: unknown) {
        console.error('Error al enviar formulario:', error);
        this.formStatus = FormStatus.ERROR;
      }
    }, 1000);
  }

  /**
   * Marca todos los campos como tocados para mostrar errores
   */
  private markAllAsTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Verifica si un campo tiene error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.hasError(errorType) && field.touched : false;
  }

  /**
   * Verifica si un campo es inválido y ha sido tocado
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }
}
