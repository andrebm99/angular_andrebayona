import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { PersonaService } from "./services/persona.service";
import { Persona } from "./interface/persona.interface";



@Component({
    selector: 'app-formulario',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
        <div class="container">
            <h2>FORMULARIO PERSONA</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="form">
            <div class="field">
                <label>Nombres</label>
                <input type="text" formControlName="nombres" placeholder="Ejm: André Ronaldo"/>
                <small class="error" *ngIf="invalid('nombres')">Requerido (min 2 caracteres)</small>
            </div>
            <div class="field">
                <label>Apellidos</label>
                <input type="text" formControlName="apellidos" placeholder="Ejm: Bayona Manrique"/>
                <small class="error" *ngIf="invalid('apellidos')">Requerido (min 2 caracteres)</small>
            </div>
            <div class="field">
                <label>Lugar de Nacimiento</label>
                <input type="text" formControlName="lugarNacimiento" placeholder="Ejm: Miraflores"/>
                <small class="error" *ngIf="invalid('lugarNacimiento')">Requerido</small>
            </div>
            <div class="field">
                <label>Direccion</label>
                <input type="text" formControlName="direccion" placeholder="Ejm: Av. Perú"/>
                <small class="error" *ngIf="invalid('direccion')">Requerido</small>
            </div>
            <div class="field">
                <label>Universidad | Instituto | Colegio</label>
                <input type="text" formControlName="universidad" placeholder="Ejm: Universidad tecnológica del Perú"/>
                <small class="error" *ngIf="invalid('universidad')">Requerido</small>
            </div>
            <div class="field">
                <label>Seguro</label>
                <select formControlName="seguro">
                    <option value="" disabled>Seleccione...</option>
                    <option value="Essalud">Essalud</option>
                    <option value="EPS">EPS</option>
                </select>
                <small class="error" *ngIf="invalid('seguro')">Seleccione una opción</small>
            </div>
            <div class="actions">
                <button type="submit" [disabled]="form.invalid">Agregar</button>
                <button type="button" (click)="onReset()">Limpiar Formulario</button>
                <a routerLink="/listado">Ir a listado</a>
            </div>
        </form>
        </div>
    `,
    styles: [
        `
        .container{
            width: 100%;
            max-height: 100vh; 
            align-items: center;
            justify-content: center;
            display: flex;
            flex-direction: column; 
            font-family: "Roboto", sans-serif;
        }

        .container h2{
            font-size: 1.6em;
        }

        .form{
            max-width: 640px;
            display: grid;
            gap: .75rem;
        }
        .field{
            display: grid;
            gap: .25rem;
        }
        .field input, .field select{
            padding: .5rem;
            border: 1px solid #ccc; 
            border-radius: .375rem; 
            font-size: 1em; 
            font-family: "Roboto", sans-serif;
        }
        .error{
            color: #b00020;
        }
        .actions{
            padding: 20px;
            display: flex; 
            gap: 10px;
            text-align: center; 
            align-items: center;
            justify-content: space-between;
            margin: auto;
        }

        .actions a{
            color: black;
            text-decoration: none;
        }

        .actions a:hover{
            text-decoration: underline;
        }

        button{
            padding: 10px 20px;
            background-color: #ff006e; 
            color: white; 
            border: none;
            border-radius: 10px; 
            box-shadow: 0px 0px 2px 2px rgb(0,0,0);
            font-size: 1.1em;
            cursor: pointer;
        }
        button:hover{
            color: white;
            background-color: #8338ec; 
        }

        
        `
    ]
})

export class FormularioComponent {

    private builder = inject(FormBuilder);
    private personaService = inject(PersonaService);

    form = this.builder.nonNullable.group({
        nombres: ['', [Validators.required, Validators.minLength(2)]],
        apellidos: ['', [Validators.required, Validators.minLength(2)]],
        lugarNacimiento: ['', Validators.required],
        direccion: ['', Validators.required],
        universidad: ['', Validators.required],
        seguro: this.builder.control<'Essalud' | 'EPS' | ''>('', Validators.required)
    });

    invalid(ctrl: keyof typeof this.form.controls): boolean {
        const validacion = this.form.controls[ctrl];
        return validacion.invalid && (validacion.dirty || validacion.touched);
    }
    onSubmit() {
        if (this.form.invalid) {
            if (this.form.invalid) {
                this.form.markAllAsTouched();
                return;
            }
        }

        const persona = this.form.getRawValue() as Persona;
        this.personaService.agregar(persona);

        this.onReset();
    }

    onReset() {
        this.form.reset({
            nombres: '',
            apellidos: '',
            lugarNacimiento: '',
            direccion: '',
            universidad: '',
            seguro: ''
        });
    }
}