from fastapi import FastAPI as fast
from typing import Dict, Union
import modelosEntidades as mE
from fastapi.middleware.cors import CORSMiddleware

from logica import validarCredenciales as validar
from conexionQuery import insertarUsuario as inUsu

app = fast()

origins = [
    
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/InUsuario")
def ingresarUsuario (usuario: mE.usuario):
    inUsu(usuario.dict())
    return True

@app.post("/InInvolucrado")
def ingresarUsuario (involucrado: mE.Involucrado):
    inUsu(involucrado.dict())
    return True

@app.get("/validarUsuario/{usuario},{clave}")
def validarUsuario (usuario, clave):
    credenciales = {}
    credenciales['usuario'] = str(usuario)
    credenciales['clave'] = str(clave)
    respuesta = validar(credenciales)
    return respuesta

