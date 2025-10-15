import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Persona } from "../interface/persona.interface";
import { PersonaModel } from "../interface/Persona";


@Injectable({ providedIn: 'root' })

export class PersonaService{
    private _personas = new BehaviorSubject<Persona[]>([]);

    personas$: Observable<Persona[]> = this._personas.asObservable();

    agregar(persona: Persona){
        const actual = this._personas.getValue();

        this._personas.next([...actual, new PersonaModel(
            persona.nombres,
            persona.apellidos,
            persona.lugarNacimiento,
            persona.direccion,
            persona.universidad,
            persona.seguro
        )]);
    }

    limpiar(){
        this._personas.next([]);
    }
}