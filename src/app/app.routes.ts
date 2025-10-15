import { Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida.component';
import { AcercaComponent } from './acerca.component';
import { FormularioComponent } from './formulario.component';

export const routes: Routes = [
    {
        path: '', component: BienvenidaComponent
    },
    {
        path: 'acerca',
        loadComponent: ()=> 
            import('./acerca.component').then(acerca => acerca.AcercaComponent)
        
    },
    {
        path: 'formulario',
        loadComponent: () => 
            import('./formulario.component').then(form => form.FormularioComponent)
    },
    {
        path: 'listado',
        loadComponent: () => 
            import('./listado.component').then(list => list.ListadoComponent)
    },
    {
        path: 'curso',
        loadComponent: () =>
            import('./curso.component').then(curso => curso.CursoComponent)
    },
    {
        path: 'visualizacion',
        loadComponent: () =>
            import('./visualizacion.component').then(visualizar => visualizar.VisualizacionComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
