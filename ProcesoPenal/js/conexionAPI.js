var urlBase = 'http://127.0.0.1:8000';
/* METODOS GET */ 
export async  function validarCredenciales(usuario,clave)  {
    const respuesta = await fetch(urlBase+
    `/validarUsuario/${usuario},${clave}`);
    let validador = await respuesta.json();
    return validador;
}

export async  function notificar(idAu)  {
    const respuesta = await fetch(urlBase+
    `/Notificar/${idAu}`);
    let validador = await respuesta.json();
    return validador;
}

export async  function ActualizarProximasAudiecias(idAu,estado)  {
    const respuesta = await fetch(urlBase+
    `/CabiarEstadoAudiencia/${idAu},${estado}`);
    let validador = await respuesta.json();
    return validador;
}

export async  function BuscarCasoAudiencia(idCaso,idAu)  {
    const respuesta = await fetch(urlBase+
    `/BuscarCaso/${idCaso},${idAu}`);
    let validador = await respuesta.json();
    return validador;
}

export async  function BuscarAudienciasCaso(idCaso)  {
    const respuesta = await fetch(urlBase+
    `/BuscarAudienciasCaso/${idCaso}`);
    let validador = await respuesta.json();
    return validador;
}

export async  function buscarCedula(clave)  {
    const respuesta = await fetch(urlBase+
    `/buscarInvolucrado/${clave}`);
    let validador = await respuesta.json();
    return validador;
}

export async  function proximasAudiencias(pagina)  {
    const respuesta = await fetch(urlBase+
    `/proximasAudiencias/${pagina}`);
    let validador = await respuesta.json();
    return validador;
}

export async  function casosProceso(pagina)  {
    const respuesta = await fetch(urlBase+
    `/casosProceso/${pagina}`);
    let validador = await respuesta.json();
    return validador;
}

export async  function casosTerminados(pagina)  {
    const respuesta = await fetch(urlBase+
    `/casosTerminados/${pagina}`);
    let validador = await respuesta.json();
    return validador;
}

export async  function borrarInvolucrado(IdAu,idIn)  {
    const respuesta = await fetch(urlBase+
    `/BorrarInvolucrado/${IdAu},${idIn}`);
    let validador = await respuesta.json();
    return validador;
}

/* METODOS POST */ 
export async function GuardarCasoAPI(audiencia)  {
    console.log(audiencia);
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


