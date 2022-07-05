from ast import If
from conexionQuery import *

def validarCredenciales (credenciales):
    usuario = buscarUsuarioCorreo(credenciales)
    print(usuario[4])
    print(credenciales['clave'])
    if(usuario[4]==credenciales['clave']):
        return True
    else:
        return False
    
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
        return True
    return False

def guardarAudiencia (audiencia):
    respuesta = buscarCasoId(audiencia["IdCasos"])
    if (respuesta == None):
        audiencia["IdCasos"]=insertarCaso(audiencia)
    
    numeroAudiencia = buscarUltimaAudienciaIdCaso(audiencia["IdCasos"])

    if (numeroAudiencia==None):
        audiencia["numeroAudiencia"] = 1
    else:
        audiencia["numeroAudiencia"] = (numeroAudiencia[9]+1)

    idAudiencia = insertarAudiencia(audiencia)

    for per in audiencia["listaInvolucrados"]:
        insertarPersonasAudiencia(per,idAudiencia)

def traerCasos (): 
    listaCasos = []
    respuesta = buscarCasos()
    if(respuesta==None):
        pass
    else:
        for row in respuesta:
            caso = {}
            caso["IdCasos"] = row[0]
            caso["Nombrecaso"] = row[1]
            caso["EstadoCaso"] = row[2]
            caso["Categoria"] = row[3]
            caso["CodigoCaso"] = row[4]
            caso["numeroAudiencia"] = buscarUltimaAudienciaIdCaso(row[0])
            listaCasos.append(caso)
    
    return listaCasos;
        



    