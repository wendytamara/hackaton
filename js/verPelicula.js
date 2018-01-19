
var config = {
  apiKey: "AIzaSyCTEIYIpKwepybwx0Gpfh7uKVs339oAZn8",
  authDomain: "blockbuster-9291e.firebaseapp.com",
  databaseURL: "https://blockbuster-9291e.firebaseio.com",
  projectId: "blockbuster-9291e",
  storageBucket: "blockbuster-9291e.appspot.com",
  messagingSenderId: "577060260032"
};
firebase.initializeApp(config);



var $btnPost = $('#btn-send-coments');
var $newPost = $('#convalidation');
$newPost.on('keyup', function() {
  $btnPost.attr('disabled', false);
  $btnPost.addClass('btn-grad');
});



// creando variables reutilizables

var txtNombre = $('#nombre');
var txtMensaje = $('#mensaje');
var btnEnviar = $('#btnEnviar');
var chatUl = $('#chatUl');

var refConvalidaciones = firebase.database().ref().child('chat');

// funcion al boton enviar

btnEnviar.on('click', function(){

  var nombre = txtNombre.val();
  var mensaje = txtMensaje.val();
  // var html = "<li><b> " + nombre + " : </b> "+mensaje + "</li> ";
  //
  // chatUl.innerHTML += html;

// ingresando a database .ref (rama a la que quiero ir) --- push es para ingresar datos a mi arbol
  firebase.database().ref('chat').push({
    name: nombre,
    message:mensaje
  });
});

// snapshot objeto que contiene informacion dde todo el nodo

firebase.database().ref('chat')
.on('value', function(snapshot) {
  var html = '';

  snapshot.forEach(function(e) {
    var element = e.val();
    var nombre = element.name;

    var mensaje = element.message;
    html +=

    '<div class="col s12 m12  border-post"><div id="public-header" class="col s12 m12"><br><div class="col s2 m2"><img class="img-perfil photoU"></div><div class="col s10 m10  nombreD">'  + ' </div><br><span class="grey-text">Publicado a las :'+getTime()+'</span><br><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12 "><div class="text-public"><p>'+ mensaje +'</p></div></div><div class="col s12 m12 divider"></div><div class="col s12 m12 "><a><i class="fa fa-thumbs-o-up icon-public" id="icon-like"></i></a><a href="#"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><p class="right grey-text" id="contador"></p><div id="add-comment" class="col s12 m12"></div></div><div class="col s12 m12 "></div><br></div>';

  });

  var nombreD = $('.nombreD');
  var photoU = $('.photoU');

  photoU.attr('src', localStorage.photoURL);
  nombreD.text(localStorage.displayName);

  chatUl.html(html);
});


// Función para agregar hora
function getTime() {
  var currentDate = new Date();
  var hh = currentDate.getHours();
  var mm = currentDate.getMinutes();
  return hh + ':' + ((mm < 10 ? '0' : '') + mm);
}
