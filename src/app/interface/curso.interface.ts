export interface Curso{
    nombreCurso: string;
    ciclo: 'Primer' | 'Segundo' | 'Tercero' | 'Cuarto' | 'Quinto' | 'Sexto' | 'Septimo' | 'Octavo' | 'Noveno' | 'Decimo';
    creditos: number; 
    seccion: number;
}


export class CursoModel implements Curso{
    constructor(
        public nombreCurso: string,
        public ciclo: 'Primer' | 'Segundo' | 'Tercero' | 'Cuarto' | 'Quinto' | 'Sexto' | 'Septimo' | 'Octavo' | 'Noveno' | 'Decimo',
        public creditos: number,
        public seccion: number
    ){}
    
} 