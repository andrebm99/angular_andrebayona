import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Curso, CursoModel } from '../interface/curso.interface'; 


@Injectable({ providedIn: 'root' })

export class CursoService{
    private curse = new BehaviorSubject<Curso[]>([]);
    curso$: Observable<Curso[]> = this.curse.asObservable();

    


    agregar(curso: Curso){
        const actual = this.curse.getValue();

        this.curse.next([...actual, new CursoModel(
            curso.nombreCurso,
            curso.ciclo,
            curso.creditos,
            curso.seccion
        )]);
    }

    limpiarCurso(){
        this.curse.next([]); 
    }
    
}