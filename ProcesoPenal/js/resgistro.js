import { GuardarCasoAPI } from "./conexionAPI.js"; 
import { buscarCedula } from "./conexionAPI.js";
import {addInvolucradoAPI} from "./conexionAPI.js";
import {addContactoAPI} from "./conexionAPI.js";
import {BuscarAudienciasCaso} from "./conexionAPI.js";
import {BuscarCasoAudiencia} from "./conexionAPI.js";


let datosInvolucrado ;
let listaInvolucradosAudiencia = []; 

var url = window.location.href;
let valitatorIdAu = url.indexOf("idAu");
let valitatorIdCa = url.indexOf("idCa");
let idCaso = -1;
let idAu = -1;


if(valitatorIdCa != -1 && valitatorIdAu == -1){
    idCaso = url.slice(valitatorIdCa+5, url.length);
    idCaso = parseInt(idCaso);
    let caso = await BuscarAudienciasCaso(idCaso);
    mostrarCaso(caso);
}else if (valitatorIdCa != -1 && valitatorIdAu != -1){
    let valitatorComa = url.indexOf(",");
    idCaso = url.slice(valitatorIdCa+5, valitatorComa);
    idAu = url.slice(valitatorIdAu+5, url.length);
    let caso = await BuscarCasoAudiencia(idCaso,idAu);
    mostrarCaso(caso);
    mostrarAudiencia(caso.Audiencias[0]);
    mostrarInvolucrados (caso.Audiencias[0].Involucrados);
}


function mostrarCaso (caso){
    if(caso.NombreCaso!= undefined){
        document.querySelector('#NombreCaso').value = caso.NombreCaso;
        document.querySelector('#NombreCaso').disabled = true;
        if(caso.Estado == "Terminado"){
            document.querySelector('#cbEstadoProceso').click();
        }
        document.querySelector('#Categorias').value = caso.Categoria;
    }
}

function mostrarAudiencia (audiencia){
    if(audiencia.IdAudiencias!= undefined){
        document.querySelector('#Direcion').value = audiencia.DireccionLugar;
        document.querySelector('#NombreLugar').value = audiencia.NombreLugar;
        document.querySelector('#FechaAudiencia').value = audiencia.FechaAudiencia;
        document.querySelector('#Hora').value = audiencia.HoraAudiencia.slice(0, 2);
        document.querySelector('#Minutos').value = audiencia.HoraAudiencia.slice(2, 4);
        document.querySelector('#DescripcionAudiencia').value = audiencia.DescripcionAudiencia;
        
    }
}

function mostrarInvolucrados (involucrados){
    if(involucrados.length > 0){
        involucrados.forEach(element => {
            if(element.rol=="juez"){
                let tarjeta = `<div class="TarjetaInvolucrado Juez" >
                <h2 id="NombreInvolucrado">
                <span id="spanApellidoInvolucrado">${element.apellidos}</span> 
                <span id="spanNombreInvolucrado">${element.nombres}</span> 
                </h2>
                <h3 id="Contacto">Contacto <span id="spanContacto">${element.contactos[0].valorContacto}</span> </h3>
                <div class="TextoBajo">
                    <h3 id="Cedula">Cedula <span id="spanCedula">${element.cedula}</span> </h3>
                    <h3 id="ROL">${element.rol}</h3>
                    <div id="DecoradorTarjetaJuez"></div>
                </div>
                </div>`;
                document.getElementById('containerTarjetas').innerHTML += tarjeta;
            
            }else if(element.rol=="abogado"){
                let tarjeta = `<div class="TarjetaInvolucrado Abogado" >
                <h2 id="NombreInvolucrado">
                <span id="spanApellidoInvolucrado">${element.apellidos}</span> 
                <span id="spanNombreInvolucrado">${element.nombres}</span> 
                </h2>
                <h3 id="Contacto">Contacto <span id="spanContacto">${element.contactos[0].valorContacto}</span> </h3>
                <div class="TextoBajo">
                    <h3 id="Cedula">Cedula <span id="spanCedula">${element.cedula}</span> </h3>
                    <h3 id="ROL">${element.rol}</h3>
                    <div id="DecoradorTarjetaAbogado"></div>
                </div>
                </div>`;
                document.getElementById('containerTarjetas').innerHTML += tarjeta;
            
            }else if(element.rol=="testigo"){
                let tarjeta = `<div class="TarjetaInvolucrado" >
                <h2 id="NombreInvolucrado">
                <span id="spanApellidoInvolucrado">${element.apellidos}</span> 
                <span id="spanNombreInvolucrado">${element.nombres}</span> 
                </h2>
                <h3 id="Contacto">Contacto <span id="spanContacto">${element.contactos[0].valorContacto}</span> </h3>
                <div class="TextoBajo">
                    <h3 id="Cedula">Cedula <span id="spanCedula">${element.cedula}</span> </h3>
                    <h3 id="ROL">${element.rol}</h3>
                    <div id="DecoradorTarjeta"></div>
                </div>
                </div>`;
                document.getElementById('containerTarjetas').innerHTML += tarjeta;
            
            }
/*
            let tarjeta = `<div class="TarjetaInvolucrado" >
            <h2 id="NombreInvolucrado">
            <span id="spanApellidoInvolucrado">${element.apellidos}</span> 
            <span id="spanNombreInvolucrado">${element.nombres}</span> 
            </h2>
            <h3 id="Contacto">Contacto <span id="spanContacto">${element.contactos[0].valorContacto}</span> </h3>
            <div class="TextoBajo">
                <h3 id="Cedula">Cedula <span id="spanCedula">${element.cedula}</span> </h3>
                <h3 id="ROL">${element.rol}</h3>
                <div id="DecoradorTarjeta"></div>
            </div>
            </div>`;
            document.getElementById('containerTarjetas').innerHTML += tarjeta;
        */
            })
        
        
    }
}








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
        if(datosInvolucrado.contactos.length > 0){
            listaInvolucradosAudiencia.push(datosInvolucrado.IdPersona);
        }else{
            listaInvolucradosAudiencia.push(datosInvolucrado.IdPersona);
            let Contacto = {};
            Contacto.idPersona = datosInvolucrado.IdPersona;
            Contacto.tipoContacto = "whatsapp";
            Contacto.ValorContacto = contacto;
            let respuesta = await addContactoAPI(Contacto);
            console.log("añadir involucrado:")
            console.log(respuesta)
        }
        
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
    /*
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
    */
    if(rol2=="juez"){
        let tarjeta = `<div class="TarjetaInvolucrado Juez" >
        <h2 id="NombreInvolucrado">
        <span id="spanApellidoInvolucrado">${apellidos}</span> 
        <span id="spanNombreInvolucrado">${nombres}</span> 
        </h2>
        <h3 id="Contacto">Contacto <span id="spanContacto">${contacto}</span> </h3>
        <div class="TextoBajo">
            <h3 id="Cedula">Cedula <span id="spanCedula">${cedula}</span> </h3>
            <h3 id="ROL">${rol2}</h3>
            <div id="DecoradorTarjetaJuez"></div>
        </div>
        </div>`;
        document.getElementById('containerTarjetas').innerHTML += tarjeta;
    
    }else if(rol2=="abogado"){
        let tarjeta = `<div class="TarjetaInvolucrado Abogado" >
        <h2 id="NombreInvolucrado">
        <span id="spanApellidoInvolucrado">${apellidos}</span> 
        <span id="spanNombreInvolucrado">${nombres}</span> 
        </h2>
        <h3 id="Contacto">Contacto <span id="spanContacto">${contacto}</span> </h3>
        <div class="TextoBajo">
            <h3 id="Cedula">Cedula <span id="spanCedula">${cedula}</span> </h3>
            <h3 id="ROL">${rol2}</h3>
            <div id="DecoradorTarjetaAbogado"></div>
        </div>
        </div>`;
        document.getElementById('containerTarjetas').innerHTML += tarjeta;
    
    }else if(rol2=="testigo"){
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
    
    }
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

    
    //cambiar fechaCreacionCaso,fechaFinCaso
    //involucrados.contacto y idPersona 
    Audiencia.IdCasos = idCaso;
    Audiencia.NombreCaso = document.querySelector('#NombreCaso').value;
    Audiencia.EstadoCaso = (EstadoCasoB ? "Terminado":"En proceso");
    Audiencia.CodigoCaso = "001AB";
    Audiencia.fechaCreacionCaso = hoy;

    if(EstadoCasoB){
        Audiencia.fechaFinCaso = hoy;
    }else{
        Audiencia.fechaFinCaso = "";
    }
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

const btnVerAudiencias = document.querySelector('#ver');
btnVerAudiencias.addEventListener("click",mostrarAudiencias);
function mostrarAudiencias(){
    if(idCaso!=-1){
        window.location = `casosDetalle.html?idCa=${idCaso}`;
    }else{
        alert("No existen audiencias")
    }
    
}

const btnAddAudiencia = document.querySelector('#añadir');
btnAddAudiencia.addEventListener("click",crearAudiencia);
function crearAudiencia(){
    if(idCaso!=-1){
        window.location = `registro.html?idCa=${idCaso}`;
    }else{
        alert("No existen audiencias")
    }
    
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

var notificar = document.getElementById("Notificar");
notificar.addEventListener('click',notify);

function notify(){
    // verificacion de que el navegador soporta notificaciones
    if(("Notification" in window)){
        alert("El navegador no soporta notificaciones")

    }else if(Notification.permission = "granted"){
        var notificacion = new notificacion("Notificacion Enviada A Los Involucrados")

    }else if(Notification.permission = "denied"){
        Notification.requestPermission(function(permission){
            if(Notification.permission === "granted"){
                var notificacion = new notificacion("Notificacion Enviada A Los Involucrados") 
            }
        });
    }
}
