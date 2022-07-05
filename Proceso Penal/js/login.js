import { validarCredenciales } from "./conexionAPI.js"; 

const formLogin = document.querySelector('#formLogin');
 
formLogin.addEventListener("submit", validarLogin );


async function validarLogin(e){
    e.preventDefault();
    const usuario = formLogin.querySelector("#user").value;
    const clave = formLogin.querySelector("#pass").value;
    let validador =  await validarCredenciales(usuario,clave);
    if (validador==true) {
        window.location = "casos.html";
    }else{
        console.log("usuario o contraseña incorrectos")
    }
}
