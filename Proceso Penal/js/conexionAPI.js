var urlBase = 'http://127.0.0.1:8000';
/* METODOS GET */ 
export async  function validarCredenciales(usuario,clave)  {
    const respuesta = await fetch(urlBase+
    `/validarUsuario/${usuario},${clave}`);
    let validador = await respuesta.json();
    return validador;
}



export async  function buscarCedula(clave)  {
    const respuesta = await fetch(urlBase+
    `/buscarInvolucrado/${clave}`);
    let validador = await respuesta.json();
    return validador;
}


/* METODOS POST */ 
export async function GuardarCasoAPI(audiencia)  {
    const respuesta = await fetch(urlBase+
    `/GuardarAudiencia`,
    {method:'POST',
    body:JSON.stringify(audiencia),
    headers:{
        'Content-Type':'application/json'
    }});
    let validador = await respuesta.json();
    return validador;
}

export async function addContactoAPI(contacto)  {
    const respuesta = await fetch(urlBase+
    `/agregarContacto`,
    {method:'POST',
    body:JSON.stringify(contacto),
    headers:{
        'Content-Type':'application/json'
    }});
    let validador = await respuesta.json();
    return validador;
}

export async function addInvolucradoAPI(involucrado)  {
    const respuesta = await fetch(urlBase+
    `/InInvolucrado`,
    {method:'POST',
    body:JSON.stringify(involucrado),
    headers:{
        'Content-Type':'application/json'
    }});
    let validador = await respuesta.json();
    return validador;
}