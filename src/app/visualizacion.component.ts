import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CursoService } from "./services/curso.service";
import { Observable } from "rxjs";
import { Curso } from "./interface/curso.interface";


@Component({
    selector: 'app-visualizacion',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    
    <div class= "toolbar">
        <h2>Listado de Cursos</h2>
    </div>
    
    <ng-container *ngIf="cursos$ | async as cursos">
        <p *ngIf="cursos.length; else vacio">
            Total: <strong>{{ cursos.length }}</strong>
        </p>
        <table *ngIf="cursos.length" class="cursoVisualizacion">
            <thead>
                <tr>
                    <th>Nombre Curso</th>
                    <th>Ciclo</th>
                    <th>Créditos</th>
                    <th>Sección</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let curso of cursos; trackBy: trackByCurso">
                    <td>{{ curso.nombreCurso.toUpperCase() }}</td>
                    <td>{{ curso.ciclo.toUpperCase() }}</td>
                    <td>{{ curso.creditos }}</td>
                    <td>{{ curso.seccion }}</td>
                </tr>
            </tbody>
        </table>
    </ng-container>

    <div class="caja-botones">
        <button (click)="limpiarCursos()">Vaciar Cursos</button>
        <a routerLink="/curso">Ir a registro de Curso</a>
    </div>

    <ng-template #vacio>
        <div class="caja">
            <p>No hay cursos registrados. Agregar: <a routerLink="/curso">Formulario</a>.</p> 
        </div>
    </ng-template>
    `,
    styles: [
        `
            * {
                font-family: "Roboto", sans-serif;
            }
            .toolbar{
                display: flex;
                gap: .5rem;
                align-items: center;
                margin-bottom: .5rem; 
                text-align: center; 
                justify-content: center;
                align-items: center; 
                font-family: "Roboto", sans-serif;
            }

            .caja-botones{
                padding-top: 20px; 
                display: flex;
                gap: 2rem;
                align-items: center;
                text-align: center; 
                justify-content: center;
                align-items: center; 
                font-family: "Roboto", sans-serif;
            }

            .caja-botones a{
                text-decoration: none; 
                font-size: 1.1em;
                padding: 10px;
                background-color: #ff006e; 
                color: white; 
                border: 2px solid #495057;
                border-radius: 10px;  
            }

            .caja-botones a:hover{
                background-color: #8338ec; 
                text-decoration: underline; 
            }

            .caja{
                display: flex;
                gap: .5rem;
                align-items: center;
                margin-bottom: .5rem; 
                text-align: center; 
                justify-content: center;
                align-items: center; 
                font-family: "Roboto", sans-serif;
            }

            .caja p{
                font-size: 1.1em;
            }

            .caja a{
                color: blue;
                text-decoration: none;
                font-size: 1.1em;
            }
            .caja a:hover{
                text-decoration: underline;
            }

            .cursoVisualizacion{
                width: 100%;
                border-collapse: collapse;
                
            }

            .cursoVisualizacion th, .cursoVisualizacion td{
                border: 1px solid #ddd;
                padding: .5rem;
                text-align: center; 
            }

            .cursoVisualizacion thead{
                background: #f6f6f6; 
            }
            h2{
                font-size: 2em;
                color: #17183B; 
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

            .toolbar a{
                color: black;
                text-decoration: none;
                font-size: 1.1em;
            }
            .toolbar a:hover{
                text-decoration: underline;
            }
        `
    ]
})

export class VisualizacionComponent {
    private cursoService = inject(CursoService);
    cursos$: Observable<Curso[]> = this.cursoService.curso$;

    limpiarCursos() {
        this.cursoService.limpiarCurso();
    }

    trackByCurso = (_: number, curso: Curso) =>
        `${curso.nombreCurso}`
}