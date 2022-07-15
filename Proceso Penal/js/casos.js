import { proximasAudiencias } from "./conexionAPI.js";
import { casosProceso } from "./conexionAPI.js"; 
import { casosTerminados } from "./conexionAPI.js"; 


let audiencias = await proximasAudiencias(0);
if(audiencias != undefined){
    audiencias.forEach(caso =>{
        let idCaso = caso.IdCasos;
        let Nombrecaso = caso.Nombrecaso;
        let CodigoCaso = caso.CodigoCaso;
        let IdAudiencias = caso.IdAudiencias;
        let FechaAudiencia = caso.FechaAudiencia;
        let NumeroAudiencia = caso.NumeroAudiencia;

        let tarjeta = `<div class="tarjetas proximas">
        <div class="headerTargeta">
        <span id="spanIdCasoAu" class="oculto">${idCaso}</span>
        <span id="spanIdAudienciaAu" class="oculto">${IdAudiencias}</span>
        <h3 id="nombreCaso">Caso: ${Nombrecaso}</h3>
        </div>
        <h3>Audiencia ${NumeroAudiencia} </h3>
        <h3>Fecha: ${FechaAudiencia}</h3>
        <h3>Codigo del caso: ${CodigoCaso}</h3>
        </div>`;

        document.querySelector('.tarjetasProximas').innerHTML += tarjeta;
    })
}

let casosPro = await casosProceso(0);
if(casosPro != undefined){
    casosPro.forEach(caso =>{
        let idCaso = caso.IdCasos;
        let Nombrecaso = caso.Nombrecaso;
        let CodigoCaso = caso.CodigoCaso;
        let FechaCreacion = caso.FechaCreacion;

        let tarjeta = `<div class="tarjetas proceso">
        <div class="headerTargeta">
        <span id="spanIdCasoPro" class="oculto">${idCaso}</span>
        <h3 id="nombreCaso">Caso: ${Nombrecaso}</h3>
        </div>
        <h3>Creado: ${FechaCreacion}</h3>
        <h3>Codigo del caso: ${CodigoCaso}</h3>
        </div>`;

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

        let tarjeta = `<div class="tarjetas terminados ">
        <div class="headerTargeta headerTerminados">
        <span id="spanIdCasoTer" class="oculto">${idCaso}</span>
        <h3 id="nombreCaso">Caso: ${Nombrecaso}</h3>
        </div>
        <h3>Creado: ${FechaCreacion}</h3>
        <h3>Finalizado: ${Fechafin}</h3>
        <h3>Codigo del caso: ${CodigoCaso}</h3>
        </div>`;

        document.querySelector('.tarjetasTerminados').innerHTML += tarjeta;
    })
}
