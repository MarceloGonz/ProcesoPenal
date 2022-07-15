from conexionDb import conexion as con

cursor = con.cursor()


def ultimoInsert(tableName):
    id = "Id"+tableName
    query = f'''SELECT * FROM "{tableName}" ORDER BY "{id}" DESC LIMIT 1'''
    #query = f'SELECT * FROM {tableName} ORDER BY {id} DESC LIMIT 1'
    cursor.execute(query)
    row = cursor.fetchone()
    if(row==None):
        respaldo = [0]
        return respaldo
    else:
      return row
    # añadir verificacion se row es de tipo None
    


def insertarPersonas(persona):
    LastInsert = ultimoInsert("Personas")
    lastId = LastInsert[0]+1
    query = """INSERT INTO public."Personas"(
	"IdPersonas", apellidos, nombres, cedula)
	VALUES (%s, %s, %s, %s);"""
    cursor.execute(
        query, (lastId, persona["apellidos"], persona["nombres"], persona["cedula"]))
    con.commit()
    return lastId


def insertarContacto(contactoPersona, idPersona):
    LastInsert = ultimoInsert("Contactos")
    lastId = LastInsert[0]+1
    query = """INSERT INTO public."Contactos"
    ("IdContactos", "IdPersona", "TipoContacto", 
    "ValorContacto") VALUES (%s, %s, %s, %s);"""
    cursor.execute(
        query, (lastId, idPersona, contactoPersona["tipoContacto"], contactoPersona["ValorContacto"]))
    con.commit()
    return True


def insertarPersonasAudiencia(involucrado):
    LastInsert = ultimoInsert("PersonasAudiencia")
    lastId = LastInsert[0]+1
    query = """INSERT INTO public."PersonasAudiencia"(
	"IdPersonas", "IdAudiencias", "RolPersona")
	VALUES (%s, %s, %s);"""
    cursor.execute(
        query, (lastId, involucrado["IdPersonas"], involucrado["RolPersona"], involucrado["ValorContacto"]))
    con.commit()
    return True


def insertarUsuario(usuario):
    LastInsert = ultimoInsert("Usuarios")
    lastId = LastInsert[0]+1
    idPersona = insertarPersonas(usuario)
    query = """INSERT INTO public."Usuarios"(
	"IdUsuarios", "IdPersona", "RolUsuario", "Usuario", "Clave")
	VALUES (%s, %s, %s, %s, %s);"""
    cursor.execute(query, (lastId, idPersona,
                   usuario["rol"], usuario["usuario"], usuario["clave"]))
    con.commit()


def insertarCaso(caso):
    LastInsert = ultimoInsert("Casos")
    lastId = LastInsert[0]+1
    if(caso["fechaFinCaso"]==""):
        query = """INSERT INTO public."Casos"(
	"IdCasos", "NombreCaso", "EstadoCaso", "Categoria", "FechaCreacion", "CodigoProceso")
	VALUES (%s, %s, %s, %s, %s, %s);"""
        cursor.execute(query, (lastId, caso["NombreCaso"], caso["EstadoCaso"], caso["Categoria"],
                   caso["fechaCreacionCaso"], caso["CodigoCaso"]))
    else:
        query = """INSERT INTO public."Casos"(
	"IdCasos", "NombreCaso", "EstadoCaso", "Categoria", "FechaCreacion", "FechaFin", "CodigoProceso")
	VALUES (%s, %s, %s, %s, %s, %s, %s);"""
        cursor.execute(query, (lastId, caso["NombreCaso"], caso["EstadoCaso"], caso["Categoria"],
                   caso["fechaCreacionCaso"], caso["fechaFinCaso"], caso["CodigoCaso"]))
    con.commit()
    return lastId


def insertarAudiencia(audiencia):
    LastInsert = ultimoInsert("Audiencias")
    lastId = LastInsert[0]+1
    query = """INSERT INTO public."Audiencias"(
	"IdAudiencias", "IdCasos", "DireccionLugar", "NombreLugar", "FechaAudiencia", "FechaCreacion", "HoraAudiencia", "DescripcionAudiencia", "EstadoAudiencia", "NumeroAudiencia")
	VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"""
    cursor.execute(query, (lastId, audiencia["IdCasos"], audiencia["direccionAudiencia"], audiencia["lugarAudiencia"], audiencia["fechaAudiencia"],
                   audiencia["fechaCreacionAudiencia"], audiencia["horaAudiencia"], audiencia["descripcionAudiencia"], audiencia["estadoAudiencia"], audiencia["numeroAudiencia"]))
    con.commit()
    return lastId


def insertarPersonasAudiencia(personasAudiencia, idAudiencia):
    query = """INSERT INTO public."PersonasAudiencia"(
	"IdPersonas", "IdAudiencias", "RolPersona")
	VALUES (%s, %s, %s);"""
    cursor.execute(
        query, (personasAudiencia["IdPersona"], idAudiencia, personasAudiencia["RolPersona"]))
    con.commit()


def buscarUltimaAudienciaIdCaso(idCaso):
    query = f"""SELECT * FROM public."Audiencias"
    WHERE "IdCaso" = {idCaso} ORDER BY "IdAudiencias" DESC LIMIT 1"""
    cursor.execute(query)
    row = cursor.fetchone()
    return row


def buscarUsuarioCorreo(credenciales):
    usuario = credenciales['usuario']
    query = f"""SELECT * FROM public."Usuarios"
    WHERE "Usuario" = '{usuario}' """
    cursor.execute(query)
    row = cursor.fetchone()
    return row


def buscarPersonCedula(cedula):
    query = f"""SELECT * FROM public."Personas"
    WHERE "cedula" = '{cedula}' """
    cursor.execute(query)
    row = cursor.fetchone()
    return row

def buscarPersonId(idPersona):
    query = f"""SELECT * FROM public."Personas"
    WHERE "IdPersonas" = '{idPersona}' """
    cursor.execute(query)
    row = cursor.fetchone()
    return row


def buscarContactosPersona(Idpersona):
    query = f"""SELECT * FROM public."Contactos"
    WHERE "IdPersona" = '{Idpersona}' """
    cursor.execute(query)
    lista = cursor.fetchall()
    return lista


def buscarCasoId(idCaso):
    query = f"""SELECT * FROM public."Casos"
    WHERE "IdCasos" = '{idCaso}' """
    cursor.execute(query)
    row = cursor.fetchone()
    return row


def buscarCasosPaginas(offset):
    query = f"""SELECT *
    FROM public."Casos"
    ORDER BY "FechaCreacion"  DESC
	LIMIT 20 OFFSET {offset}"""
    cursor.execute(query)
    lista = cursor.fetchall()
    return lista

def buscarCasosEstado(offset,estado):
    query = f"""SELECT *
    FROM public."Casos"
    WHERE "EstadoCaso" = '{estado}'
    ORDER BY "IdCasos"  DESC
	LIMIT 20 OFFSET {offset}"""
    cursor.execute(query)
    lista = cursor.fetchall()
    return lista


def buscarUltimaAudienciaIdCaso (IdCaso):
    query = f"""SELECT "NumeroAudiencia" 
    FROM "Audiencias"  
    WHERE "IdCasos" = {IdCaso} 
    ORDER BY "NumeroAudiencia" 
    DESC LIMIT 1"""
    cursor.execute(query)
    row = cursor.fetchone()
    return row

def buscarAudienciasIdCaso (IdCaso):
    query = f"""SELECT *
    FROM "Audiencias"  
    WHERE "IdCasos" = {IdCaso} 
    ORDER BY "NumeroAudiencia" 
    ASC """
    cursor.execute(query)
    row = cursor.fetchall()
    return row

def buscarAudienciasProximas (offset):
    query = f"""SELECT *
    FROM "Audiencias"  
    WHERE "EstadoAudiencia" = 'proxima' ORDER BY 
    "FechaAudiencia" DESC 
    LIMIT 20 OFFSET {offset}"""
    cursor.execute(query)
    row = cursor.fetchall()
    return row

def cerrarConexion():
    con.close()


'''usuario={
"apellidos":"JARAMILLO JURADO",
"nombres":"CRISTIAN CARLOS",
"cedula":"1105182477",
"usuario":"cristian@gmail.com",
"clave":"12345",
"rol":"usuario"
}
insertarUsuario(usuario)
cerrarConexion()
#ultimoId = ultimoInsert("Usuarios")
#print(ultimoId[0])'''
