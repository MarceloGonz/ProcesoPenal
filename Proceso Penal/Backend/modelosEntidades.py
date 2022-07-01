from msilib.schema import Class

from pydantic import BaseModel

class usuario(BaseModel):
       
    apellidos : str
    nombres : str
    cedula : str
    usuario : str
    clave : str
    rol : str

class Involucrado(BaseModel):
    apellidos : str
    nombres : str
    cedula : str
    contacto : str
    rol : str