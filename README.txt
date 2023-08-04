 
Este proyecto pertenece a:
    -Francisco Ramóm Ojeda Casanueva
    -Samuel Elias Sanhueza Salas

Corresponde al Backend del proyecto completo y tiene como objetivo manejar la creación de Brigadistas, su acoplamiento a cuadrillas y registro de asistencias.

Programas necesarios:
    -Node.js 18.17.0 LTS
    -Insomnia (testeo de rutas)

Puntos clave:
Para un correcto inicio del proyecto es necesario completar las siguientes variables,
    -PORT (puerto al que se conectara el Backend)
    -MONGO_URI (enlace a la base de datos MONGODB a utilizar)
    -SECRET (clave secreta con la que se encriptaran las claves)

como iniciar el proyecto:
    1) instalar Node.js 18.17.0 LTS
    2) clonar el repositorio en la carpeta deseada
    3) entrar en la carpeta del proyecto
    4) modificar los valores del archivo .env de ser necesario
    5) ejecutar "npm install" para instalar dependencias
    6) ejecutar "npm run dev" para iniciar el servidor

como testear rutas:
    a) el repositorio contiene las rutas exportadas desde Insomnia para su facil importación y uso.
    b) usar el Frontend del proyecto en : PRÓXIMAMANETE

#Explicacion de rutas#
*se especifica que tipo de usuario puede usar cada ruta, de no ser asi, cualquiera lo puede usar.
*todas las rutas requieren el uso de Bearer token, a exepcion de signup y login


GET - /api/fichaActual
    -Brigadista/Jefe de cuadrilla
    De existir, obtiene la ficha de trabajo de la temporada actual del brigadista que lo solicita.

POST - /api/ficha/crear
    -Admin
    Crea una ficha de trabajo con los datos especificados; "user_id","cuadrilla_id","cargo","temporada_id", donde "cargo" puede tener dos valores, "Brigadista" y "JefeCuadrilla"
    *"cargo" es el cargo que ostenta un usuario brigadista solo durante esta temporada y no a su userType en su cuenta de usuario

GET - /api/asistencia/asistenciaPorAceptar
    -Jefe de cuadrilla
    Devuelve las asistencias por aceptar de su propia cuadrilla en un rango de el dia actual hasta 2 dias atras

GET - /api/asistencia/verificarMarcado
    -Brigadista/Jefe de cuadrilla
    Verifica si la asistencia del dia a sido marcada, devolviendo como resultado; "marcada","noMarcada" y "null" en caso de no ser un dia de trabajo

GET - /api/asistencia/obtenerHorario
    -Brigadista/Jefe de cuadrilla
    Devuelve el horario de trabajo de la Ficha de trabajo actual del brigadista

GET - /api/asistencia/asistenciaMensual/{fecha}
    -Admin
    Devuelve una lista formateada de [id_usuario,nombre,asistencias], que devuelve el usuario y el numero de asistencias durante un mes, este ultimo especificado en la url

POST - /api/asistencia/crearHorario
    -Admin
    Crea el horario de la ficha en "ficha_id" especificada, solo para las que aun no la tengan creada

PTCH - /api/asistencia/aceptar
    -Jefe de cuadrilla
    acepta la asistencia ingresada que, previamnete, alla sido marcada por el brigadista

PTCH - /api/asistencia/marcar
    -Brigadista/Jefe de cuadrilla
    marca la asistencia ingresada

GET - /api/cuadrilla/obtenerCuadrillas
    -Admin
    Devuelve todas las cuadrillas existentes (no sus integrantes)

POST - /api/cuadrilla/crear
    -Admin
    Crea una cuadrilla nueva con los datos ingresados;
    "temporada_id" y "base_id"

GET - /temporada/obtActFut
    Devuelve las temporadas Actual y la siguiente a esta

GET - /api/base/obtener
    Devuelve todas las bases existentes

POST - /api/base/crear
    Crea una base nueva con el valor "nombre" especificado

POST - /api/user/login
    Devuelve un token de sesion JWT al ingresar los datos "rut" y "password"

POST - /api/user/signup
    Crea una cuenta de usuario con los valores ingresados "email", "rut", "password" y por ultimo "userType" el cual puede tener solo dos valores, "admin" y "brigadista"
        *en este contexto "brigadista" refiere a trabajador por temporada y no a la distincion entre Brigadista y Jefe de cuadrilla

Programas utilizados:
    -Node.js : (https://nodejs.org) - JavaScript runtime enviroment
    -Git : (https://git-scm.com) - Control de versiones
    -GitHub : (https://github.com/Antrax98/Prueba_backend_CeF/) - Repositorio

