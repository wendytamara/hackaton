/* NAVBAR*/
$('.button-collapse').sideNav();
$(document).ready(function() {
  $('.dropdown-button').dropdown();
});

/* Carrusel*/
$('.carousel.carousel-slider').carousel({
  fullWidth: true
});
$('.carousel').carousel();
setInterval(function() {
  $('.carousel').carousel('next');
}, 5000); // every 2 seconds

/* Select*/

$(document).ready(function() {
  $('select').material_select();
});

/* Modales */

$(document).ready(function() {
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

$(document).ready(function() {
 
  // Filtros del input
  $('.search').keyup(function() {
    var name = $(this).val().toLowerCase();
    $('.collection').hide();
   
    $('.collection').each(function() { // filtro por titulo
      var search = $(this).text();
      var $title = $(this).data('title');
      if ($title.indexOf(name) !== -1) {
        $(this).show();
      }
    });
   
  });
});

