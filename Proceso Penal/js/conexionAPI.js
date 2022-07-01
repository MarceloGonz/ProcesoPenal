export async  function validarCredenciales(usuario,clave)  {
    const respuesta = await fetch(`http://127.0.0.1:8000/`+
    `validarUsuario/${usuario},${clave}`);
    let validador = await respuesta.json();
    console.log(validador);
    return validador;
}

export async  function avalidarCredenciales(usuario,clave)  {
    const respuesta = await fetch(`http://127.0.0.1:8000/`+
    `validarUsuario/${usuario},${clave}`);
    let validador = await respuesta.json();
    console.log(validador);
    return validador;
}
