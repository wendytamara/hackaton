/* NAVBAR*/
$('.button-collapse').sideNav();
$(document).ready(function() {
  $('.dropdown-button').dropdown();
});

/* Carrusel*/
$('.carousel.carousel-slider').carousel({fullWidth: true});
$('.carousel').carousel();
setInterval(function() {
  $('.carousel').carousel('next');
}, 5000); // every 2 seconds

/*Select*/

$(document).ready(function() {
  $('select').material_select();
});

/*Modales */

$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});
       