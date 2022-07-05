urlBase = `http://127.0.0.1:8000`

export async  function validarCredenciales(usuario,clave)  {
    const respuesta = await fetch(urlBase+
    `/validarUsuario/${usuario},${clave}`);
    let validador = await respuesta.json();
    console.log(validador);
    return validador;
}

export async function GuardarCasoAPI(audiencia)  {
    const respuesta = await fetch(urlBase+
    `/GuardarAudiencia`,
    {method:'POST',
    body:JSON.stringify(audiencia),
    headers:{
        'Content-Type':'application/json'
    }});
    let validador = await respuesta.json();
    console.log(validador);
    return validador;
}
