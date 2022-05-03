### Stack Utilizado

React.js, NODE.js, Express, MongoDB.

Para los requests se utilizo Axios.
Para la validacion se utilizo express-validator.
Para armar las rutas y rutas privadas se utilizo react-router-dom.
Para el estilado se utilizo css puro junto a bootstrap.

# Aclaracion

para el desarrollo se utilizo nodemon y concurrently con el fin de poder simultaneamente en la misma ventana de comando
iniciar el server de nodemon y tambien iniciar el server de desarrollo para poder visualizar la app en el browser.
Para ejecutar esto en la ventana de comando estando en la raiz del proyecto se utiliza: npm run dev

## Servicios

Dentro de la carpeta ./client/src/service se encuentran los scripts que manejan los requests
que golpean los endpoints armados con Express. Estos endpoints estan divididos en diferentes
scripts segun la informacion que manejan, se encuentran dentro de la carpeta ./routes.

## Routes

# auth

Auth se encarga de autorizar al usuario que se esta logueando y traer al usuario que fue autenticado

_GET_
El metodo get va a devoler un objeto que es el usuario el cual contiene los datos del
usuario:

-\_id: El id del usuairo
-date: Fecha de creacion del usuario
-email: El email del usuario
-name: Nombre del usuario

_POST_
El metodo post se encarga de autenticar al usuario y devolver su correspondiente token.

# invite

invite se encarga de manejar la base de datos que contiene los datos de los usuarios que
pidieron unirse a una meetup que fue creada

_GET_
El metodo get va a traer un array de objetos donde cada objeto contiene:
-\_id: El id del objeto de las invitaciones
-date: La fecha de creacion del objeto
-day: El dia que corresponde a los pedidos de participar en la meetup de dicho dia
-invi: Es un array de objetos donde cada objeto es el objeto "user" que contiene los datos del usuario.

_POST_
El metodo post va a agregar un nuevo pedido de invite a una meetup que ya este creada.

_PUT_
El metodo put va a editar el array de pedidos de invite, eso es para que si un usuario
quiere unirse a una meetup y el array de invites ya estaba creado con anterioridad
no se sobreescriba y se edite correctamente.

# meetup

meetup se encarga de manejar la base de datos que contiene los datos de las meetups
creadas.

_GET_
El metodo get trae todas las meetups hechas, esto seria un array de objetos siendo los objetos las meetups
con todos su datos correspondientes.

_POST_
El metodo post va a crear una nueva meetup, los datos que va a ingresar uno en el formulario son
dia de la meetup, y la lista de gente que se quiere invitar.

_PUT_
El metodo put va a editar una meetup ya existente, pudiendo cambiar tanto dia como lista de invitados.

_DELETE_
El metodo delete va a simplemente borrar de la base de datos la meetup seleccionada.

# order

order se encarga de manejar la base de datos que contiene los datos de los pedidos de birra para las meetups.
_NOTA ESPECIAL_ Este script trabaja en conjunto con el servicio birraService, hubo una cruza de nombres y me di cuenta muy tarde.

_GET_
El metodo get trae todos los pedidos de birra, esto va a ser un array de objetos donde cada objeto contiene los datos del dia de la meetup
y la cantidad de birra pedida para ese dia.

_POST_
El metodo post va a agregar un nuevo pedido de birra a la base de datos.

_PUT_
El metodo put va a modificar un pedido de birra existente pudiendose cambiar la cantidad de birra pedida.

_DELETE_
El metodo delete va a borrar un pedido de birra para la meetup seleccionada

# users

users se encarga de manejar los usuario registrados en la app que son guardados en la base de datos.

_GET_
El metodo get va a traer un array de objetos siendo estos objetos los usuarios que contienen los datos
de los mismos.

_POST_
El metodo post va a crear una nueva entrada de usuario en la base de datos.

_DELETE_
El metodo delete va a borrar un usuario que se haya seleccionado

no hay metodo put.

# weather

weather se encarga de obtener el tiempo de la api.

_GET_
El metodo get va a traer un array de objetos donde cada objeto es un dia contiene los datos del tiempo
de cada dia. El largo del array es de 16 siendo el valor [0] el dia anterior al actual, el cual suele ser filtrado en la app.
