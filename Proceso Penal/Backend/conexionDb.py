from psycopg2 import connect

conexion = connect(user='postgres',
                   password='marjan',
                   host='localhost',
                   port='5432',
                   dbname='PenalRespaldo' )


