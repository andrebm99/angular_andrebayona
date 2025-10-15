import { Component } from "@angular/core";


@Component({
    selector: 'app-acerca',
    standalone: true,
    template: `
        <div class="caja">
            <h2>Acerca De</h2>
            <p>Esta es la ruta de acerca de la empresa.</p>
        </div>
    `,
    styles: [
        `
        * {
            background-color: #dee2e6;
        }
        .caja{
            padding-top: 20px;
            margin: auto;
            align-items: center; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            text-align: center; 
            height: 77vh; 
            border-radius: 10px;
        }
        h2{
            font-size: 2em;
            font-family: "Roboto", sans-serif;
        }
        p{
            font-family: "Roboto", sans-serif;
            font-size: 1.1em; 
        }
        `
    ]
})

export class AcercaComponent { }