from ast import If
from conexionQuery import buscarUsuarioCorreo as busUsu

def validarCredenciales (credenciales):
    usuario = busUsu(credenciales)
    print(usuario[4])
    print(credenciales['clave'])
    if(usuario[4]==credenciales['clave']):
        return True
    else:
        return False
    