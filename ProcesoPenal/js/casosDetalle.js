import { BuscarAudienciasCaso } from "./conexionAPI.js";
import { ActualizarProximasAudiecias } from "./conexionAPI.js";
import { proximasAudiencias } from "./conexionAPI.js";
import { CambiarEstadoCaso } from "./conexionAPI.js";



var url = window.location.href;
let valitator = url.indexOf("idCa");
let audiencias = await proximasAudiencias(0);
if (audiencias != undefined) {
    audiencias.forEach(caso => {
        let fechaAu = new Date(caso.FechaAudiencia);
        var fecha = new Date();
        let hoy = new Date();
        if (fechaAu <= hoy) {
            ActualizarProximasAudiecias(caso.IdAudiencias, "NOTIFICADA");
            console.log(fechaAu.getDate());
            console.log(hoy.getDate());
        }
    }
    )
}
if (valitator != -1) {
    let idCaso = url.slice(valitator + 5, url.length);
    idCaso = parseInt(idCaso);
    let caso = await BuscarAudienciasCaso(idCaso);

    document.querySelector('#TituloCaso').innerHTML = "Caso: " + caso.NombreCaso;

    if (caso.Estado == "Terminado") {
        document.querySelector('#cbEstadoProceso').click();
    }
if(caso!=undefined){
    if (caso.Audiencias.length > 0) {
        caso.Audiencias.forEach(Audiencia => {
            let idAu = Audiencia.IdAudiencias;
            let numeroAu = Audiencia.numeroAu;
            let involucrados = Audiencia.involucrados;
            let fecha = Audiencia.fecha;
            let estado = Audiencia.estado.toUpperCase();

            let tarjeta;
            if (estado == "GUARDADO") {
                tarjeta = `<a href="Registro.html?idCa=${idCaso},idAu=${idAu}" class="tarjetas detalles">
                <div class="headerTargeta3">
                <h3 id="nombreCaso">Audiencia ${numeroAu}</h3>
                </div>
                <h3>Involucrados ${involucrados}</h3>
                <h3>Fecha: ${fecha}</h3>
                <h3>${estado}</h3>
                </a>
                `;
            } else if (estado == "PROXIMA") {
                tarjeta = `<a href="Registro.html?idCa=${idCaso},idAu=${idAu}" class="tarjetas detalles">
                <div class="headerTargeta2">
                <h3 id="nombreCaso">Audiencia ${numeroAu}</h3>
                </div>
                <h3>Involucrados ${involucrados}</h3>
                <h3>Fecha: ${fecha}</h3>
                <h3>${estado}</h3>
                </a>
                `;
            } else if (estado == "NOTIFICADA") {
                tarjeta = `<a href="Registro.html?idCa=${idCaso},idAu=${idAu}" class="tarjetas detalles">
                <div class="headerTargeta">
                <h3 id="nombreCaso">Audiencia ${numeroAu}</h3>
                </div>
                <h3>Involucrados ${involucrados}</h3>
                <h3>Fecha: ${fecha}</h3>
                <h3>${estado}</h3>
                </a>
                `;
            } else {
                tarjeta = `<a href="Registro.html?idCa=${idCaso},idAu=${idAu}" class="tarjetas detalles">
                <div class="headerTargeta">
                <h3 id="nombreCaso">Audiencia ${numeroAu}</h3>
                </div>
                <h3>Involucrados ${involucrados}</h3>
                <h3>Fecha: ${fecha}</h3>
                <h3>ERROR</h3>
                </a>
                `;
            }
            document.querySelector('.containerTarjetas').innerHTML += tarjeta;
        });
    }

    //Funciones btns
    const btnAñadir = document.querySelector('#btnañadir');
    btnAñadir.addEventListener("click", añadirAudiencia);

    function añadirAudiencia() {
        window.location = `Registro.html?idCa=${idCaso}`;
    }

    const EstadoCasoCheck = document.querySelector('#cbEstadoProceso');
    EstadoCasoCheck.addEventListener("click", ActulizarCaso);

    async function ActulizarCaso() {
        var fecha = new Date();
        let hoy = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();
        console.log(hoy);
        if (caso.Estado == "Terminado") {
            let respuesta = await CambiarEstadoCaso(idCaso, "En proceso",hoy);
            console.log(respuesta)
        }else{
            let respuesta =  await CambiarEstadoCaso(idCaso, "Terminado",hoy);
            console.log(respuesta)
        }
    }
}

}

