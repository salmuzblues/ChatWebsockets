
//creamos un socket con socket.io conectándolo a
//nuestro servidor de websockets que tendremos corriendo en http://localhost:8080
var socket = io.connect('http://localhost:8080', { 'forceNew': true });

//Dejaremos escuchando a ese socket el evento o mensaje messages con
//socket.on('messages')
socket.on('messages', function(data) {
    console.log(data);
    render(data);
});

//Para renderizarlo en el HTML hemos creado una función render(data)
/* Esta función
simplemente toma los datos que le llegan a través del socket (Que será un array de
mensajes) y con la función map , los itera y pinta una plantilla HTML con el nombre del
autor del mensaje y el texto del mismo. */
function render(data) {
    var html = data.map(function (elem, index) {
        /* Template String que permite interpolar variables
utilizando los operadores ${nombre_variable} sin necesidad de tener que concatenar
Strings con el operador más +. También nos permite escribir en varias líneas también
sin concatenar. Por último, en esta función empleamos el método join para unir los
elementos del array con espacios, en lugar de la coma que trae por defecto. */
      return( `<div> <strong>${elem.author}</strong>:<em>${elem.text}</em></div>`);
      }).join(" ");

    document.getElementById('messages').innerHTML = html;
}
/* Lo que realiza está función es recoger el valor de los input del formulario, el que tiene el id
author y el del id text , para por último enviar por sockets con el mensaje newmessage
esos datos.*/
function addMessage(e) {
    var message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', message);
    return false;
}