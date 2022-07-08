import { validarCredenciales } from "./conexionAPI.js"; 

const formLogin = document.querySelector('#formLogin');
 
formLogin.addEventListener("submit", validarLogin );


async function validarLogin(e){
    e.preventDefault();
    
    const usuario = formLogin.querySelector("#user").value;
    const clave = formLogin.querySelector("#pass").value;
    let validador =  await validarCredenciales(usuario,clave);
    if (validador.nombres != undefined) {
        localStorage.setItem("usuarioLocalNombres",validador.nombres);
        localStorage.setItem("usuarioLocalApellidos",validador.apellidos);
        localStorage.setItem("usuarioLocalId",validador.IdPersonas);
        window.location = "casos.html";
    }else{
        alert( "usuario o contraseña incorrectos");
    }
}
