import { GuardarCasoAPI } from "./conexionAPI.js"; 
import { buscarCedula } from "./conexionAPI.js";
import {addInvolucradoAPI} from "./conexionAPI.js";


let datosInvolucrado ;
let listaInvolucradosAudiencia = []; 

const btnCedula = document.querySelector('#btnCedula');
btnCedula.addEventListener("click",mostarRegsitro);

async function mostarRegsitro() {
    let cedula = document.querySelector('#txtCedula').value;
    if (cedula == "") {
        alert("ingrese un numero de cedula")
    } else {
        datosInvolucrado = await buscarCedula(cedula);
        let vf = document.querySelector('#añadirInvolucrado');
        vf.style.display = "flex";
        if (datosInvolucrado != undefined) {
            document.getElementById('vfApellidos').value = datosInvolucrado.apellidos;
            document.getElementById('vfNombres').value = datosInvolucrado.nombres;
            document.getElementById('vfCedula').value = cedula;
            document.getElementById('vfContacto').value = 
                                (datosInvolucrado.contactos.length > 0 
                                ? datosInvolucrado.contactos[0].valorContacto : "");
            
        }else{
            document.getElementById('vfCedula').value = cedula;
        }
        
        
    }
}



const btnAñadir = document.querySelector('#btnAñadir');
btnAñadir.addEventListener("click",añadirInvolucrado);

async function añadirInvolucrado() { 

    let vf = document.querySelector('#añadirInvolucrado');
    let nombres = vf.querySelector('#vfNombres').value;
    let apellidos = vf.querySelector('#vfApellidos').value;
    let cedula = vf.querySelector('#vfCedula').value;
    let contacto = vf.querySelector('#vfContacto').value;
    let rol = vf.querySelector('#vfRoles');
    let rol2 = rol.options[rol.selectedIndex].value;
    
    if (datosInvolucrado != undefined) {
        listaInvolucradosAudiencia.push(datosInvolucrado.IdPersona);
    }else{
        var datIn = {};
        datIn.apellidos = apellidos;
        datIn.nombres = nombres;
        datIn.cedula = cedula;
        datIn.contacto = [];
        let inContacto = {};
        inContacto.tipoContacto = "whatsapp";
        inContacto.ValorContacto = contacto;
        datIn.contacto.push(inContacto);
        let respuesta = await addInvolucradoAPI(datIn);
        listaInvolucradosAudiencia.push(respuesta);
    }
    
    let tarjeta = `<div class="TarjetaInvolucrado" >
    <h2 id="NombreInvolucrado">
    <span id="spanApellidoInvolucrado">${apellidos}</span> 
    <span id="spanNombreInvolucrado">${nombres}</span> 
    </h2>
    <h3 id="Contacto">Contacto <span id="spanContacto">${contacto}</span> </h3>
    <div class="TextoBajo">
        <h3 id="Cedula">Cedula <span id="spanCedula">${cedula}</span> </h3>
        <h3 id="ROL">${rol2}</h3>
        <div id="DecoradorTarjeta"></div>
    </div>
    </div>`;

    document.getElementById('containerTarjetas').innerHTML += tarjeta;
    
    ocultarRegsitro();
}

const Guardar = document.querySelector('#Guardar');
Guardar.addEventListener("click",GuardarCaso);

function GuardarCaso() {
    var Audiencia = {};
    let contador = 0;
    var fecha = new Date();
    let hoy = fecha.toLocaleDateString();

    let EstadoCasoB = document.querySelector('#cbEstadoProceso').checked;
    let hora = document.querySelector('#Hora').value;
    let minutos = document.querySelector('#Minutos').value;
    let categoriaCaso = document.querySelector('#Categorias');
    let tarjetas = document.querySelectorAll(".TarjetaInvolucrado");
    

    
    //cambiar IdCasos, fechaCreacionCaso,fechaFinCaso,fechaCreacionAudiencia
    //involucrados.contacto y idPersona 
    Audiencia.IdCasos = -1;
    Audiencia.NombreCaso = document.querySelector('#NombreCaso').value;
    Audiencia.EstadoCaso = (EstadoCasoB ? "Terminado":"En proceso");
    Audiencia.CodigoCaso = "001AB";
    Audiencia.fechaCreacionCaso = hoy;
    Audiencia.fechaFinCaso = "N/A";
    Audiencia.Categoria = categoriaCaso.options[categoriaCaso.selectedIndex].value;
    Audiencia.direccionAudiencia = document.querySelector('#Direcion').value;
    Audiencia.lugarAudiencia = document.querySelector('#NombreLugar').value;
    Audiencia.fechaAudiencia = document.querySelector('#FechaAudiencia').value;
    Audiencia.fechaCreacionAudiencia = hoy;
    Audiencia.horaAudiencia = hora+minutos;
    Audiencia.descripcionAudiencia = document.querySelector('#DescripcionAudiencia').value;
    Audiencia.estadoAudiencia = "guardado";
    Audiencia.listaInvolucrados=[];
    

    if(tarjetas.length > 0){
        tarjetas.forEach(element => {
            let involucrados = {}; 
            involucrados.IdPersona = listaInvolucradosAudiencia[contador];
            involucrados.RolPersona = element.querySelector('#ROL').innerHTML;
            Audiencia.listaInvolucrados.push(involucrados);
            contador += 1;
        })
    }

    let validator = GuardarCasoAPI(Audiencia);
    alert("caso guardado");

}


const btnCerrar = document.querySelector('#btnCerrar');
btnCerrar.addEventListener("click",ocultarRegsitro);

function ocultarRegsitro() {
    let vf = document.querySelector('#añadirInvolucrado');
    document.querySelector('#txtCedula').value = "";
    vf.querySelector('#vfNombres').value = "";
    vf.querySelector('#vfApellidos').value = "";
    vf.querySelector('#vfCedula').value = "";
    vf.querySelector('#vfContacto').value = "";
    vf.style.display = "none";


}

