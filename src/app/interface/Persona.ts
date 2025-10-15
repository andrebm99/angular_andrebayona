export interface Persona{
    nombres: string;
    apellidos: string; 
    lugarNacimiento: string; 
    direccion: string;
    universidad: string;
    seguro: 'Essalud' | 'EPS';
}


export class PersonaModel implements Persona{
    constructor(
        public nombres: string,
        public apellidos: string,
        public lugarNacimiento: string,
        public direccion: string,
        public universidad: string,
        public seguro: 'Essalud' | 'EPS'
    ){}
    
} 
