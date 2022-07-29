import { proximasAudiencias } from "./conexionAPI.js";
import { casosProceso } from "./conexionAPI.js"; 
import { casosTerminados } from "./conexionAPI.js"; 


let audiencias = await proximasAudiencias(0);
if(audiencias != undefined){
    audiencias.forEach(caso =>{
        let fechaAu = new Date(caso.FechaAudiencia);
        var fecha = new Date();
        let hoy = new Date();
        console.log(fechaAu.getDate())
        console.log(hoy.getDate())
        
        if(fechaAu>=hoy){
            
            let idCaso = caso.IdCasos;
            let Nombrecaso = caso.Nombrecaso;
            let CodigoCaso = caso.CodigoCaso;
            let IdAudiencias = caso.IdAudiencias;
            let FechaAudiencia = caso.FechaAudiencia;
            let NumeroAudiencia = caso.NumeroAudiencia;
    
            let tarjeta = `<a href="Registro.html?idCa=${idCaso},idAu=${IdAudiencias}" class="tarjetas proximas">
            <div class="headerTargeta headerAudiencia">
            <h3 id="nombreCaso">Caso: ${Nombrecaso}</h3>
            </div>
            <h3>Audiencia ${NumeroAudiencia} </h3>
            <h3>Fecha: ${FechaAudiencia}</h3>
            <h3>Codigo del caso: ${CodigoCaso}</h3>
            </a>`;
    
            document.querySelector('.tarjetasProximas').innerHTML += tarjeta;
        }
        
    })
}

let casosPro = await casosProceso(0);
if(casosPro != undefined){
    casosPro.forEach(caso =>{
        let idCaso = caso.IdCasos;
        let Nombrecaso = caso.Nombrecaso;
        let CodigoCaso = caso.CodigoCaso;
        let FechaCreacion = caso.FechaCreacion;

        let tarjeta = `<a href="CasosDetalle.html?idCa=${idCaso}" class="tarjetas proceso">
        <div class="headerTargeta headerProceso">

        <h3 id="nombreCaso">Caso: ${Nombrecaso}</h3>
        </div>
        <h3>Creado: ${FechaCreacion}</h3>
        <h3>Codigo del caso: ${CodigoCaso}</h3>
        </a>`;

        document.querySelector('.tarjetasProceso').innerHTML += tarjeta;
    })
}

let casosTer = await casosTerminados(0);
if(casosTer != undefined){
    casosTer.forEach(caso =>{
        let idCaso = caso.IdCasos;
        let Nombrecaso = caso.Nombrecaso;
        let CodigoCaso = caso.CodigoCaso;
        let FechaCreacion = caso.FechaCreacion;
        let Fechafin = caso.Fechafin;

        let tarjeta = `<a href="CasosDetalle.html?idCa=${idCaso}" class="tarjetas terminados ">
        <div class="headerTargeta headerTerminados">

        <h3 id="nombreCaso">Caso: ${Nombrecaso}</h3>
        </div>
        <h3>Creado: ${FechaCreacion}</h3>
        <h3>Finalizado: ${Fechafin}</h3>
        <h3>Codigo del caso: ${CodigoCaso}</h3>
        </a>`;

        document.querySelector('.tarjetasTerminados').innerHTML += tarjeta;
    })
}
/*
const TargetasCaso = document.querySelectorAll('.tarjetas');

TargetasCaso.forEach(TargetaCaso =>{
    let element = TargetaCaso;
    TargetaCaso.addEventListener("click",AbrirCaso);
})


function AbrirCaso(){
    console.log("hola");
    //let idTargeta = element.querySelector('#spanIdCaso');
    //console.log(idTargeta);
    

}
*/