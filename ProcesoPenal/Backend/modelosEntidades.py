from typing import List

from pydantic import BaseModel

class usuario(BaseModel):
       
    apellidos : str
    nombres : str
    cedula : str
    usuario : str
    clave : str
    rol : str

class EstadoActulizar(BaseModel):
       
    idCaso : str
    fechaFin : str
    estado : str

class Contacto(BaseModel):
    tipoContacto : str
    ValorContacto : str

class addContacto(BaseModel):
    idPersona : int
    tipoContacto : str
    ValorContacto : str


class Involucrado(BaseModel):
    apellidos : str
    nombres : str
    cedula : str
    contacto : List[Contacto]

class InvolucradoDatos(BaseModel):
    IdPersona : int
    RolPersona : str

class Caso(BaseModel):
       
    IdCasos : int
    NombreCaso : str
    EstadoCaso : str
    CodigoCaso : str
    fechaCreacionCaso : str
    fechaFinCaso : str
    Categoria : str
    IdAudiencias : int
    direccionAudiencia : str
    lugarAudiencia : str
    fechaAudiencia : str
    fechaCreacionAudiencia : str
    horaAudiencia : str
    descripcionAudiencia : str
    estadoAudiencia : str
    listaInvolucrados : List[InvolucradoDatos]

    