import { GuardarCasoAPI } from "./conexionAPI.js";
import { buscarCedula } from "./conexionAPI.js";
import { addInvolucradoAPI } from "./conexionAPI.js";
import { addContactoAPI } from "./conexionAPI.js";
import { BuscarAudienciasCaso } from "./conexionAPI.js";
import { BuscarCasoAudiencia } from "./conexionAPI.js";
import { notificar } from "./conexionAPI.js";
import { borrarInvolucrado } from "./conexionAPI.js";



let datosInvolucrado;
let listaInvolucradosAudiencia = [];
let listaBorar = [];
var url = window.location.href;
let valitatorIdAu = url.indexOf("idAu");
let valitatorIdCa = url.indexOf("idCa");
let idCaso = -1;
let idAu = -1;


if (valitatorIdCa != -1 && valitatorIdAu == -1) {
    idCaso = url.slice(valitatorIdCa + 5, url.length);
    idCaso = parseInt(idCaso);
    let caso = await BuscarAudienciasCaso(idCaso);
    mostrarCaso(caso);
} else if (valitatorIdCa != -1 && valitatorIdAu != -1) {
    let valitatorComa = url.indexOf(",");
    idCaso = url.slice(valitatorIdCa + 5, valitatorComa);
    idAu = url.slice(valitatorIdAu + 5, url.length);
    let caso = await BuscarCasoAudiencia(idCaso, idAu);
    mostrarCaso(caso);
    mostrarAudiencia(caso.Audiencias[0]);
    console.log(caso.Audiencias[0].Involucrados);
    mostrarInvolucrados(caso.Audiencias[0].Involucrados);
}


function mostrarCaso(caso) {
    if (caso.NombreCaso != undefined) {
        document.querySelector('#NombreCaso').value = caso.NombreCaso;
        document.querySelector('#NombreCaso').disabled = true;
        if (caso.Estado == "Terminado") {
            document.querySelector('#cbEstadoProceso').click();
        }
        document.querySelector('#Categorias').value = caso.Categoria;
    }
}

function mostrarAudiencia(audiencia) {
    if (audiencia.IdAudiencias != undefined) {
        document.querySelector('#Direcion').value = audiencia.DireccionLugar;
        document.querySelector('#NombreLugar').value = audiencia.NombreLugar;
        document.querySelector('#FechaAudiencia').value = audiencia.FechaAudiencia;
        document.querySelector('#Hora').value = audiencia.HoraAudiencia.slice(0, 2);
        document.querySelector('#Minutos').value = audiencia.HoraAudiencia.slice(2, 4);
        document.querySelector('#DescripcionAudiencia').value = audiencia.DescripcionAudiencia;

    }
}

function mostrarInvolucrados(involucrados) {
    if (involucrados.length > 0) {
        involucrados.forEach(element => {
            let datosInvolucrado = {};
            datosInvolucrado.id = element.IdPersona;
            datosInvolucrado.apellidos = element.apellidos;
            datosInvolucrado.nombres = element.nombres;
            if(element.contactos.length>0){
            datosInvolucrado.contacto = element.contactos[0].valorContacto;
            }
            datosInvolucrado.cedula = element.cedula;
            datosInvolucrado.rol = element.rol;
            dibujarTarjetasRol(datosInvolucrado);
            listaInvolucradosAudiencia.push(element.IdPersona);
        })
    }
}

const btnCedula = document.querySelector('#btnCedula');
btnCedula.addEventListener("click", mostarRegsitro);

async function mostarRegsitro() {
    let cedula = document.querySelector('#txtCedula').value;
    if (cedula == "") {
        alert("ingrese un numero de cedula")
    } else {
        datosInvolucrado = await buscarCedula(cedula);
        let vf = document.querySelector('#añadirInvolucrado');
        vf.style.display = "flex";
        if (datosInvolucrado != undefined) {
            console.log(datosInvolucrado);
            document.getElementById('vfApellidos').value = datosInvolucrado.apellidos;
            document.getElementById('vfNombres').value = datosInvolucrado.nombres;
            document.getElementById('vfCedula').value = cedula;
            document.getElementById('vfContactoWhats').value =
                (datosInvolucrado.contactos.length > 0
                    ? datosInvolucrado.contactos[0].valorContacto : "");
            document.getElementById('vfContactoCorreo').value =
                (datosInvolucrado.contactos.length > 1
                    ? datosInvolucrado.contactos[1].valorContacto : "");

        } else {
            document.getElementById('vfCedula').value = cedula;
        }


    }
}



const btnAñadir = document.querySelector('#btnAñadir');
btnAñadir.addEventListener("click", añadirInvolucrado);

async function añadirInvolucrado() {
    let datosTarjeta = {};
    let vf = document.querySelector('#añadirInvolucrado');
    datosTarjeta.nombres = vf.querySelector('#vfNombres').value;
    datosTarjeta.apellidos = vf.querySelector('#vfApellidos').value;
    datosTarjeta.cedula = vf.querySelector('#vfCedula').value;
    datosTarjeta.contacto = vf.querySelector('#vfContactoWhats').value;
    datosTarjeta.contactoCorreo = vf.querySelector('#vfContactoCorreo').value;
    let rol = vf.querySelector('#vfRoles');
    datosTarjeta.rol = rol.options[rol.selectedIndex].value;
    if (datosInvolucrado != undefined) {
        datosTarjeta.id = datosInvolucrado.IdPersona;
        console.log (datosTarjeta.id);
        if (datosInvolucrado.contactos.length > 2) {
            listaInvolucradosAudiencia.push(datosInvolucrado.IdPersona);
        } else{
            listaInvolucradosAudiencia.push(datosInvolucrado.IdPersona);
            if(datosInvolucrado.contactos.length < 1){
            let Contacto = {};
            Contacto.idPersona = datosInvolucrado.IdPersona;
            Contacto.tipoContacto = "whatsapp";
            Contacto.ValorContacto = datosTarjeta.contacto;
            let respuesta = await addContactoAPI(Contacto);
            console.log(vf.querySelector('#vfContactoCorreo').value);
            }
            if (vf.querySelector('#vfContactoCorreo').value != "") {
                let ContactoCorreo = {};
                console.log("entro correo");
                ContactoCorreo.idPersona = datosInvolucrado.IdPersona;
                ContactoCorreo.tipoContacto = "correo";
                ContactoCorreo.ValorContacto = datosTarjeta.contactoCorreo;
                await addContactoAPI(ContactoCorreo);
            }
        }
        
    } else {
        var datIn = {};
        datIn.apellidos = datosTarjeta.apellidos;
        datIn.nombres = datosTarjeta.nombres;
        datIn.cedula = datosTarjeta.cedula;
        datIn.contacto = [];
        let inContacto = {};
        inContacto.tipoContacto = "whatsapp";
        inContacto.ValorContacto = datosTarjeta.contacto;
        datIn.contacto.push(inContacto);
        if (vf.querySelector('#vfContactoCorreo').value != "") {
            let ContactoCorreo = {};
            console.log("entro correo");
            ContactoCorreo.tipoContacto = "correo";
            ContactoCorreo.ValorContacto = datosTarjeta.contactoCorreo;
            datIn.contacto.push(ContactoCorreo);
        }

        let respuesta = await addInvolucradoAPI(datIn);
        listaInvolucradosAudiencia.push(respuesta);
        datosTarjeta.id = respuesta;
    }
    console.log(datosTarjeta);
    dibujarTarjetasRol(datosTarjeta);
    ocultarRegsitro();
    borrarIn();
}

const Guardar = document.querySelector('#Guardar');
Guardar.addEventListener("click", GuardarCaso);

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
    Audiencia.EstadoCaso = (EstadoCasoB ? "Terminado" : "En proceso");
    Audiencia.CodigoCaso = "001AB";
    Audiencia.fechaCreacionCaso = hoy;

    if (EstadoCasoB) {
        Audiencia.fechaFinCaso = hoy;
    } else {
        Audiencia.fechaFinCaso = "";
    }
    Audiencia.Categoria = categoriaCaso.options[categoriaCaso.selectedIndex].value;
    Audiencia.IdAudiencias = idAu;
    Audiencia.direccionAudiencia = document.querySelector('#Direcion').value;
    Audiencia.lugarAudiencia = document.querySelector('#NombreLugar').value;
    Audiencia.fechaAudiencia = document.querySelector('#FechaAudiencia').value;
    Audiencia.fechaCreacionAudiencia = hoy;
    Audiencia.horaAudiencia = hora + minutos;
    Audiencia.descripcionAudiencia = document.querySelector('#DescripcionAudiencia').value;
    Audiencia.estadoAudiencia = "guardado";
    Audiencia.listaInvolucrados = [];


    if (tarjetas.length > 0) {
        tarjetas.forEach(element => {
            let involucrados = {};
            involucrados.IdPersona = listaInvolucradosAudiencia[contador];
            involucrados.RolPersona = element.querySelector('#ROL').innerHTML;
            Audiencia.listaInvolucrados.push(involucrados);
            contador += 1;
        })
    }
    console.log(Audiencia);
    let validator = GuardarCasoAPI(Audiencia);
    alert("caso guardado");
}

const btnVerAudiencias = document.querySelector('#ver');
btnVerAudiencias.addEventListener("click", mostrarAudiencias);
function mostrarAudiencias() {
    if (idCaso != -1) {
        window.location = `casosDetalle.html?idCa=${idCaso}`;
    } else {
        alert("No existen audiencias")
    }

}

const btnAddAudiencia = document.querySelector('#añadir');
btnAddAudiencia.addEventListener("click", crearAudiencia);
function crearAudiencia() {
    if (idCaso != -1) {
        window.location = `registro.html?idCa=${idCaso}`;
    } else {
        window.location = `registro.html`;
    }

}

const btnCerrar = document.querySelector('#btnCerrar');
btnCerrar.addEventListener("click", ocultarRegsitro);

function ocultarRegsitro() {
    let vf = document.querySelector('#añadirInvolucrado');
    document.querySelector('#txtCedula').value = "";
    vf.querySelector('#vfNombres').value = "";
    vf.querySelector('#vfApellidos').value = "";
    vf.querySelector('#vfCedula').value = "";
    vf.querySelector('#vfContactoWhats').value = "";
    vf.querySelector('#vfContactoCorreo').value = "";
    vf.style.display = "none";


}

var Notifi = document.getElementById("Notificar");
Notifi.addEventListener('click', notify);

async function notify() {
    if (idAu != -1) {
        let respuesta = await notificar(idAu)
        if (respuesta) {
            alert("Audiencia Notificada")
        } else {
            alert("algo salio mal")
        }
    } else {
        alert("Primero debe guardar la audiencia")
    }

}



borrarIn();
async function borrarIn() {
    var BorrarInvolucrado = document.querySelectorAll(".TarjetaInvolucrado");
    BorrarInvolucrado.forEach(element => {
        element.addEventListener('click', e => {
            const id = element.querySelector(".idIn").innerHTML;
            element.outerHTML="";
            if(idCaso!=-1&&idAu!=-1){
                borrarInvolucrado(idAu,id);
            } 
        }
        );
    })
}
function dibujarTarjetasRol(datosTarjeta) {
    if (datosTarjeta.rol == "juez") {
        let tarjeta = `<div class="TarjetaInvolucrado Juez" >
        <h2 id="${datosTarjeta.id}" class="oculto idIn">${datosTarjeta.id}</h2>
        <h2 id="NombreInvolucrado">
        <span id="spanApellidoInvolucrado">${datosTarjeta.apellidos}</span> 
        <span id="spanNombreInvolucrado">${datosTarjeta.nombres}</span> 
        </h2>
        <h3 id="Contacto">Contacto <span id="spanContacto">${datosTarjeta.contacto}</span> </h3>
        <div class="TextoBajo">
            <h3 id="Cedula">Cedula <span id="spanCedula">${datosTarjeta.cedula}</span> </h3>
            <h3 id="ROL">${datosTarjeta.rol}</h3>
            <div id="DecoradorTarjetaJuez"></div>
        </div>
        </div>`;
        document.getElementById('containerTarjetas').innerHTML += tarjeta;

    } else if (datosTarjeta.rol == "abogado") {
        let tarjeta = `<div class="TarjetaInvolucrado Abogado" >
        <h2 id="${datosTarjeta.id}" class="oculto idIn">${datosTarjeta.id}</h2>
        <h2 id="NombreInvolucrado">
        <span id="spanApellidoInvolucrado">${datosTarjeta.apellidos}</span> 
        <span id="spanNombreInvolucrado">${datosTarjeta.nombres}</span> 
        </h2>
        <h3 id="Contacto">Contacto <span id="spanContacto">${datosTarjeta.contacto}</span> </h3>
        <div class="TextoBajo">
            <h3 id="Cedula">Cedula <span id="spanCedula">${datosTarjeta.cedula}</span> </h3>
            <h3 id="ROL">${datosTarjeta.rol}</h3>
            <div id="DecoradorTarjetaAbogado"></div>
        </div>
        </div>`;
        document.getElementById('containerTarjetas').innerHTML += tarjeta;

    } else if (datosTarjeta.rol == "testigo") {
        let tarjeta = `<div class="TarjetaInvolucrado" >
        <h2 id="${datosTarjeta.id}" class="oculto idIn">${datosTarjeta.id}</h2>
        <h2 id="NombreInvolucrado">
        <span id="spanApellidoInvolucrado">${datosTarjeta.apellidos}</span> 
        <span id="spanNombreInvolucrado">${datosTarjeta.nombres}</span> 
        </h2>
        <h3 id="Contacto">Contacto <span id="spanContacto">${datosTarjeta.contacto}</span> </h3>
        <div class="TextoBajo">
            <h3 id="Cedula">Cedula <span id="spanCedula">${datosTarjeta.cedula}</span> </h3>
            <h3 id="ROL">${datosTarjeta.rol}</h3>
            <div id="DecoradorTarjeta"></div>
        </div>
        </div>`;
        document.getElementById('containerTarjetas').innerHTML += tarjeta;
    }
}