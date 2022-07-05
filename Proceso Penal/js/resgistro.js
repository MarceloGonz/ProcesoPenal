function mostarRegsitro() {
    cedula = document.querySelector('#txtCedula').value;
    console.log(cedula);
    if (cedula == "") {

    } else {
        vf = document.querySelector('#añadirInvolucrado');
        vf.style.display = "flex";
        document.getElementById('vfCedula').value = cedula;
    }


}
function añadirInvolucrado() {
    vf = document.querySelector('#añadirInvolucrado');
    nombres = vf.querySelector('#vfNombres').value;
    apellidos = vf.querySelector('#vfApellidos').value;
    cedula = vf.querySelector('#vfCedula').value;
    contacto = vf.querySelector('#vfContacto').value;
    rol = vf.querySelector('#vfRoles');
    rol2 = rol.options[rol.selectedIndex].value;
    tarjeta = `<div class="TarjetaInvolucrado" >
    <h2 id="NombreInvolucrado">
    <span id="spanApellidoInvolucrado">${apellidos}</span> 
    <span id="spanNombreInvolucrado ">${nombres}</span> 
    </h2>
    <h3 id="Contacto">Contacto <span id="spanContacto">${contacto}</span> </h3>
    <div class="TextoBajo">
        <h3 id="Cedula">Cedula <span id="spanCedula">${cedula}</span> </h3>
        <h3 id="ROL">${rol2}</h3>
        <div id="DecoradorTarjeta"></div>
    </div>
</div>`;
    document.getElementById('containerTarjetas').innerHTML += tarjeta;

    vf.querySelector('#vfNombres').value = "";
    vf.querySelector('#vfApellidos').value = "";
    vf.querySelector('#vfCedula').value = "";
    vf.querySelector('#vfContacto').value = "";
}

function GuardarCaso() {

    var Audiencia = {};
    

    Audiencia.NombreCaso = document.querySelector('#NombreCaso').value;
    EstadoCasoB = document.querySelector('#cbEstadoProceso').checked;
    Audiencia.EstadoCaso = (EstadoCasoB ? "Terminado":"En proceso");
    Audiencia.CodigoCaso;
    Audiencia.fechaCreacionCaso = "casoLabel";
    Audiencia.fechaFinCaso = "casoLabel";

    Audiencia.direccionAudiencia = document.querySelector('#NombreCaso').value;
    Audiencia.lugarAudiencia = document.querySelector('#NombreCaso').value;
    Audiencia.fechaAudiencia = document.querySelector('#NombreCaso').value;
    Audiencia.fechaCreacionAudiencia = casoLabel;
    hora = document.querySelector('#NombreCaso').value;
    minutos = document.querySelector('#NombreCaso').value;
    Audiencia.horaAudiencia = hora+minutos;
    categoriaCaso = document.querySelector('#vfRoles');
    Audiencia.Categoria = categoriaCaso.options[categoriaCaso.selectedIndex].value;
    Audiencia.descripcionAudiencia = document.querySelector('#NombreCaso').value;
    
    Audiencia.estadoAudiencia = "guardado";
    Audiencia.listaInvolucrados = casoLabel;


    tarjetas = document.querySelectorAll(".TarjetaInvolucrado");
    tarjetas.forEach(element => {
        apellidos = element.querySelector('#spanApellidosInvolucrado').value;
        nombres = element.querySelector('#spanNombreInvolucrado').value;
        contato = element.querySelector('#spanContacto').value;
        cedula = element.querySelector('#spanCedula').value;
        rol = element.querySelector('#ROL').value;
    })

    console

}

function ocultarRegsitro() {
    vf = document.querySelector('#añadirInvolucrado');
    vf.querySelector('#vfNombres').value = "";
    vf.querySelector('#vfApellidos').value = "";
    vf.querySelector('#vfCedula').value = "";
    vf.querySelector('#vfContacto').value = "";
    vf.style.display = "none";


}

