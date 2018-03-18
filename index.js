//librerías que estamos importando como son Express que es un
//framework para facilitarnos el crear aplicaciones web en Node.js, y Socket.io para el
//tratamiento de los websockets.
//// create app express
var express = require('express');
var app = express();
// create server http
var server = require('http').Server(app);
//seguidamente importamos Socket.io en la variable io y le pasamos el servidor creado.
var io = require('socket.io')(server);

var messages =[{
   text: "hola soy un mensaje",
    author: "Carlos Azaustere"
}];
/* express.static para indicar a nuestro servidor
Node.js cuál es la ruta para los ficheros estáticos o la parte cliente de nuestra
aplicación, la cuál tenemos en la carpeta public .  */
app.use(express.static('public'));
//Ahora ponemos a escuchar a nuestro servidor de websockets con io.on()
io.on('connection', function (socket) {
    console.log('Alguien sea conectado con Sockets');
    socket.emit('messages', messages);
/* Después escuchamos el evento que lanza el cliente, el evento new-message con
socket.on('new-message') y aquí lo que hacemos es obtener los datos desde el cliente
(el objeto mensaje) y añadirlos al array messages con el método push . */
    socket.on('new-message', function (data) {
        messages.push(data);
/*  Seguidamente, emitimos desde un socket a todos los clientes conectados con el método
io.sockets.emit */
        io.sockets.emit('messages', messages);
    });
});

server.listen(8080, function () {
    console.log("Servidor corriendo  en http://localhost:8080");
});