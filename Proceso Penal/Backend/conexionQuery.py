from conexionDb import conexion as con

cursor = con.cursor()


def ultimoInsert(tableName):
    id = "Id"+tableName
    query = f'''SELECT * FROM "{tableName}" ORDER BY "{id}" DESC LIMIT 1'''
    #query = f'SELECT * FROM {tableName} ORDER BY {id} DESC LIMIT 1'
    cursor.execute(query)
    row = cursor.fetchone()

    # añadir verificacion se row es de tipo None
    return row


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


def insertarUsuario(usuario):
    LastInsert = ultimoInsert("Usuarios")
    idPersona = insertarPersonas(usuario)
    lastId = LastInsert[0]+1
    query = """INSERT INTO public."Usuarios"(
	"IdUsuarios", "IdPersona", "RolUsuario", "Usuario", "Clave")
	VALUES (%s, %s, %s, %s, %s);"""
    cursor.execute(query, (lastId, idPersona,
                   usuario["rol"], usuario["usuario"], usuario["clave"]))
    con.commit()


def buscarUsuarioCorreo(credenciales):
    usuario = credenciales['usuario']
    query = f"""SELECT * FROM public."Usuarios"
    WHERE "Usuario" = '{usuario}' """
    cursor.execute(query)
    row = cursor.fetchone()
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
