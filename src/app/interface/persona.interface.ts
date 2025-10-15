export interface Persona{
    nombres: string;
    apellidos: string; 
    lugarNacimiento: string; 
    direccion: string;
    universidad: string;
    seguro: 'Essalud' | 'EPS';
}