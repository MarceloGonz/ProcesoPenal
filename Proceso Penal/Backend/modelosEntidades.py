from typing import List

from pydantic import BaseModel

class usuario(BaseModel):
       
    apellidos : str
    nombres : str
    cedula : str
    usuario : str
    clave : str
    rol : str


class Contacto(BaseModel):
    tipoContacto : str
    ValorContacto : str


class Involucrado(BaseModel):
    IdPersona : int
    apellidos : str
    nombres : str
    cedula : str
    RolPersona : str
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
    direccionAudiencia : str
    lugarAudiencia : str
    fechaAudiencia : str
    fechaCreacionAudiencia : str
    horaAudiencia : str
    descripcionAudiencia : str
    estadoAudiencia : str
    listaInvolucrados : List[InvolucradoDatos]

    