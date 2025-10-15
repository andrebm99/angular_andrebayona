import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { CursoService } from "./services/curso.service";
import { Curso } from "./interface/curso.interface";


@Component({
    selector: 'app-curso',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
    
        <div class="container">
            <h2>Formulario del curso</h2>
            <form [formGroup]="formCurso" (ngSubmit)="onSubmit()" novalidate class="form">
                <div class="caja"> 
                    <label>Nombre del Curso</label>
                    <input type="text" formControlName="nombreCurso" placeholder="Ejm. JavaScript"/>
                    <small class=   "error" *ngIf="invalid('nombreCurso')">Campo requerido</small>
                </div>
                <div class="caja"> 
                    <label>Ciclo</label>
                    <select formControlName="ciclo">
                        <option value="" disabled>Seleccione su ciclo...</option>
                        <option value="Primer">Primer</option>
                        <option value="Segundo">Segundo</option>
                        <option value="Tercero">Tercer</option>
                        <option value="Cuarto">Cuarto</option>
                        <option value="Quinto">Quinto</option>
                        <option value="Sexto">Sexto</option>
                        <option value="Septimo">Septimo</option>
                        <option value="Octavo">Octavo</option>
                        <option value="Noveno">Noveno</option>
                        <option value="Decimo">Decimo</option>
                    </select>
                    <small class="error" *ngIf="invalid('ciclo')">Campo requerido</small>
                </div>
                <div class="caja"> 
                    <label>Creditos</label>
                    <input type="number" formControlName="creditos" />
                    <small class="error" *ngIf="invalid('creditos')">Campo requerido</small>
                </div>

                <div class="caja">
                    <label>Seccion</label>
                    <input type="number" formControlName="seccion" />
                    <small class="error" *ngIf="invalid('seccion')">Campo requerido!</small>
                </div>

                
                <div class="actions">
                    <button type="submit" [disabled]="formCurso.invalid">Agregar</button>
                    <button type="button" (click)="onReset()">Limpiar Formulario</button>
                    <a routerLink="/visualizacion">Cursos Registrados</a>
                </div>
                

            </form>
        </div>
    `,
    styles: [
        `
        .container{
            width: 100%;
            padding-top: 20px;
            max-height: 100vh; 
            align-items: center;
            justify-content: center;
            display: flex;
            flex-direction: column; 
            font-family: "Roboto", sans-serif;

        }
        .form{
            max-width: 640px;
            display: grid;
            gap: .75rem;
        }
        .caja{
            display: grid;
            gap: .25rem;
        }
        .caja input, .caja select{
            padding: .5rem;
            border: 1px solid #ccc; 
            border-radius: .375rem; 
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
            font-size: 1em;
            cursor: pointer;
        }
        button:hover{
            background-color: #8338ec; 
            color: white; 
        }
        `
    ]
})

export class CursoComponent {

    private builder = inject(FormBuilder);
    private cursoService = inject(CursoService);

    formCurso = this.builder.nonNullable.group({
        nombreCurso: ['', [Validators.required]],
        ciclo: this.builder.control<'Primer' | 'Segundo' | 'Tercero' | 'Cuarto' | 'Quinto' | 'Sexto' | 'Septimo' | 'Octavo' | 'Noveno' | 'Decimo' | ''>('', Validators.required),
        creditos: [0, [Validators.required]],
        seccion: [0, [Validators.required]]
    });

    invalid(control: keyof typeof this.formCurso.controls): boolean {
        const validacionCurso = this.formCurso.controls[control];
        return validacionCurso.invalid && (validacionCurso.dirty || validacionCurso.touched);
    }

    onSubmit() {
        if (this.formCurso.invalid) {
            if (this.formCurso.invalid) {
                this.formCurso.markAllAsTouched();
                return;
            }
        }
        const cursoSubmit = this.formCurso.getRawValue() as Curso;

        this.cursoService.agregar(cursoSubmit);

        this.onReset();
    }

    onReset() {
        this.formCurso.reset({
            nombreCurso: '',
            ciclo: '',
            creditos: 0,
            seccion: 0 
        });
    }
}