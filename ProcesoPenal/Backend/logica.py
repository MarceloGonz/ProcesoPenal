from datetime import datetime


from conexionQuery import *

def validarCredenciales (credenciales):
    respuesta = {}
    usuario = buscarUsuarioCorreo(credenciales)
    if(usuario != None):
        if(usuario[4] == credenciales['clave']):
            datosUsuario = buscarPersonId(usuario[1])
            respuesta["nombres"] = datosUsuario[2]
            respuesta["apellidos"] = datosUsuario[1]
            respuesta["IdPersonas"] = datosUsuario[0]
            return respuesta
    return respuesta
def ingresarInvolucradoAudiencia (involucrados):
    for inv in involucrados:
        pass

def buscarInvolucrado (cedula):
    contactos = []
    invo = {}

    res = buscarPersonCedula(cedula)
    if(res==None):
        return res
    else:
        resCon = buscarContactosPersona(res[0])
        invo["IdPersona"]= res[0]
        invo["apellidos"]= res[1]
        invo["nombres"]= res[2]
        invo["cedula"]= res[3]
        for cont in resCon:
            contacto = {}
            contacto["tipoContacto"] = cont[2]
            contacto["valorContacto"] = cont[3]
            contactos.append(contacto)
        invo["contactos"]= contactos

        return invo

def ingresarInvolucrado (involucrado):
    res = buscarPersonCedula(involucrado["cedula"])
    if(res==None):
        idPersona = insertarPersonas(involucrado)
        for con in involucrado["contacto"]:
            insertarContacto(con,idPersona)
        return idPersona
    return res

def guardarAudiencia (audiencia):
    respuesta = buscarCasoId(audiencia["IdCasos"])
    if (respuesta == None):
        audiencia['fechaCreacionCaso'] = darmatoFecha(audiencia['fechaCreacionCaso'])
        if(audiencia['fechaFinCaso']!= ""):
            audiencia['fechaFinCaso'] = darmatoFecha(audiencia['fechaFinCaso'])
        audiencia["IdCasos"]=insertarCaso(audiencia)
        
    numeroAudiencia = buscarUltimaAudienciaIdCaso(audiencia["IdCasos"])
    print(numeroAudiencia)

    if (numeroAudiencia==None):
        audiencia["numeroAudiencia"] = 1
    else:
        print(numeroAudiencia)
        audiencia["numeroAudiencia"] = (numeroAudiencia[0]+1)

    audiencia['fechaCreacionAudiencia'] = darmatoFecha(audiencia['fechaCreacionAudiencia'])
    
    idAudiencia = insertarAudiencia(audiencia)

    for per in audiencia["listaInvolucrados"]:
        insertarPersonasAudiencia(per,idAudiencia)

def proximasAudiencias (pagina):
    offset = 20*pagina 
    listaCasos = []
    listaCasosID = []
    respuesta = buscarAudienciasProximas(offset)
    if(respuesta==None):
        pass
    else:
        for ids in respuesta:
            listaCasosID.append(buscarCasoId(ids[1]))

        for i in range(len(respuesta)):
            casoAu = listaCasosID[i]
            audiencia = respuesta[i]
            caso = {}
            caso["IdCasos"] = casoAu[0]
            caso["Nombrecaso"] = casoAu[1]
            caso["CodigoCaso"] = casoAu[6]
            caso["IdAudiencias"] = audiencia[0]
            caso["FechaAudiencia"] = quitarFormatoFecha(audiencia[4])
            caso["NumeroAudiencia"] = audiencia[9]

            listaCasos.append(caso)
    
    return listaCasos;

def CasosProceso (pagina):
    offset = 20*pagina 
    listaCasos = []

    respuesta = buscarCasosEstado(offset,"En proceso")
    if(respuesta==None):
        pass
    else:
        for row in respuesta:
            caso = {}
            caso["IdCasos"] = row[0]
            caso["Nombrecaso"] = row[1]
            caso["CodigoCaso"] = row[6]
            caso["FechaCreacion"] = quitarFormatoFecha(row[4])

            listaCasos.append(caso)
    
    return listaCasos;

def CasosTerminados (pagina):
    offset = 20*pagina 
    listaCasos = []

    respuesta = buscarCasosEstado(offset,"Terminado")
    if(respuesta==None):
        pass
    else:
        for row in respuesta:
            caso = {}
            caso["IdCasos"] = row[0]
            caso["Nombrecaso"] = row[1]
            caso["CodigoCaso"] = row[6]
            caso["FechaCreacion"] = quitarFormatoFecha(row[4])
            caso["Fechafin"] = quitarFormatoFecha(row[5])

            listaCasos.append(caso)
    
    return listaCasos;


def traerCaso (idCaso): 
    respuestaCaso = buscarCasoId(idCaso)
    caso = {}
    listaAu = []
    if(respuestaCaso==None):
        pass
    else:
        respuestaAudiencias = buscarAudienciasIdCaso(respuestaCaso[0])
        caso["IdCasos"] = respuestaCaso[0]
        caso["NombreCaso"] = respuestaCaso[1]
        caso["Estado"] = respuestaCaso[2]
        if(respuestaAudiencias != None):
            for row in respuestaAudiencias:
                RespuestaInvolucrados = buscarInvolucradosIdAudiencia(row[0])
                au = {}

                if(RespuestaInvolucrados != None):
                    au["IdAudiencias"] = row[0]
                    au["numeroAu"] = row[9]
                    au["involucrados"] = len(RespuestaInvolucrados)
                    au["fecha"] = quitarFormatoFecha(row[4])
                    au["estado"] = row[8]
                    
                else:
                    au["involucrados"] = 0

                listaAu.append(au)

            caso["Audiencias"] = listaAu
    return caso;

def buscarCaso (idCaso,idAu): 
    respuestaCaso = buscarCasoId(idCaso)
    caso = {}
    listaAu = []
    if(respuestaCaso==None):
        pass
    else:
        respuestaAudiencias = buscarAudienciasIdAu(idAu)
        caso["IdCasos"] = respuestaCaso[0]
        caso["NombreCaso"] = respuestaCaso[1]
        caso["Estado"] = respuestaCaso[2]
        caso["Categoria"] = respuestaCaso[3]
        caso["CodigoProceso"] = respuestaCaso[6]
        if(respuestaAudiencias != None):
            au = {}
            au["IdAudiencias"] = respuestaAudiencias[0]
            au["DireccionLugar"] = respuestaAudiencias[2]
            au["NombreLugar"] = respuestaAudiencias[3]
            au["FechaAudiencia"] = respuestaAudiencias[4]
            au["HoraAudiencia"] = respuestaAudiencias[6]
            au["DescripcionAudiencia"] = respuestaAudiencias[7]
            au["Involucrados"] = []

            involucrados = buscarInvolucradosIdAudiencia(respuestaAudiencias[0])
            if(involucrados != None):
                for row in involucrados:
                    #mejorar esta parte creando una sentencia que conbine personasAudiencia y personas
                    respuestaPersona = buscarPersonId(row[0])
                    involucrado = buscarInvolucrado(respuestaPersona[3])
                    involucrado['rol']=row[2]
                    au["Involucrados"].append(involucrado)

            listaAu.append(au)
            caso["Audiencias"] = listaAu
    return caso;
        
def addContacto(contacto):
    validar = buscarPersonId(contacto['idPersona'])
    if(validar!=None):
        insertarContacto(contacto,contacto['idPersona'])
        return True
    return False


def darmatoFecha (fecha):
    
    fecha_dt = datetime.strptime(fecha, '%d/%m/%Y')
    fechaFomat = datetime.strftime(fecha_dt,'%Y-%m-%d')
    return fechaFomat;

def quitarFormatoFecha (fecha):
    fechaFomat = datetime.strftime(fecha, '%d/%m/%Y' )
    return fechaFomat;


