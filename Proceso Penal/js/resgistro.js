function mostarRegsitro() {

    vf = document.querySelector('#añadirInvolucrado');
    vf.style.display = "flex";
    cedula = document.querySelector('#txtCedula').value;
    document.getElementById('vfCedula').value = cedula;

}
function añadirInvolucrado() {
    vf = document.querySelector('#añadirInvolucrado');
    nombres = vf.querySelector('#vfNombres').value;
    apellidos = vf.querySelector('#vfApellidos').value;
    cedula = vf.querySelector('#vfCedula').value;
    contacto = vf.querySelector('#vfContacto').value;
    rol = vf.querySelector('#vfRoles');
    rol2 = rol.options[rol.selectedIndex].value;
    tarjeta = `<div class="TarjetaInvolucrado">
    <h2 id="NombreInvolucrado">${apellidos} ${nombres}</h2>
    <h3 id="Contacto">Contacto ${contacto}</h3>
    <div class="TextoBajo">
        <h3 id="Cedula">Cedula ${cedula}</h3>
        <h3 id="ROL">${rol2}</h3>
        <div id="DecoradorTarjeta"></div>
    </div>
</div>`;
document.getElementById('containerTarjetas').innerHTML += tarjeta;
}

function ocultarRegsitro() {
    vf = document.querySelector('#añadirInvolucrado');
    vf.style.display = "none";


}

