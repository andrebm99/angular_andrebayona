import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { Persona } from "./interface/persona.interface";
import { PersonaService } from "./services/persona.service";


@Component({
    selector: 'app-listado',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="toolbar">
            <h2>Listado de Personas</h2>
        </div>
        
        <ng-container *ngIf="personas$ | async as personas">
            <p *ngIf="personas.length; else vacio">
                Total: <strong>{{ personas.length }}</strong>
            </p>

            <table *ngIf="personas.length" class="tablaListado">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Lugar de Nacimiento</th>
                        <th>Dirección</th>
                        <th>Universidad</th>
                        <th>Seguro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let p of personas; trackBy: trackByNombresApellidos">
                        <td>{{ p.nombres.toUpperCase() }}</td>
                        <td>{{ p.apellidos.toUpperCase() }}</td>
                        <td>{{ p.lugarNacimiento.toUpperCase() }}</td>
                        <td>{{ p.direccion.toUpperCase() }}</td>
                        <td>{{ p.universidad.toUpperCase() }}</td>
                        <td>{{ p.seguro.toUpperCase() }}</td>
                    </tr>
                </tbody>
            </table>
        </ng-container>
        <div class="caja-botones">
            
            <button (click)="limpiar()">Vaciar Lista</button>
            <a routerLink="/formulario">Ir al formulario</a>
        </div>
        <ng-template #vacio>
            <div class="caja">
                <p>No hay personas registradas todavia. Agrega desde el <a routerLink="/formulario">Formulario</a>.</p> 
            </div>


        </ng-template>
    `,
    styles: [
        `
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

            .toolbar a{
                color: blue;
                text-decoration: none;
                font-size: 1.1em;
            }
            .toolbar a:hover{
                text-decoration: underline;
            }

            .toolbar h2{
                font-size: 1.7em;
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
            }

            .caja a{
                color: blue;
                text-decoration: none;
                font-size: 1.1em;
            }
            .caja a:hover{
                text-decoration: underline;
            }


            .tablaListado{
                width: 100%;
                border-collapse: collapse;
                
                
            }

            .tablaListado th, .tablaListado td{
                border: 1px solid #ddd;
                padding: .5rem;
                font-family: "Roboto", sans-serif;
            }

            .tablaListado thead{
                background: #f6f6f6; 
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


            p{
                font-size: 1.2em; 
                color: black; 
            }

        `
    ]

})

export class ListadoComponent{
    private personaService = inject(PersonaService);
    personas$: Observable<Persona[]> = this.personaService.personas$;
    limpiar(){
        this.personaService.limpiar(); 
    }
    trackByNombresApellidos = (_: number, p: Persona) => 
        `${p.nombres} | ${p.apellidos}`; 

    
}