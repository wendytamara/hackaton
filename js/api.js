var url = 'https://api.themoviedb.org/3/list/45420?api_key=';
var apiKey = '265e83f8f40d0da5e658ceb6b263b552';
var language = '&language=es';

$.getJSON(url + apiKey + language, function (results) {
  var items = results['items'];
  for (let i = 0; i < items.length; i++) {
    var element = items[i];
    var url = 'https://image.tmdb.org/t/p/original/';
    var idVideo = element['id'];
    var posterPath = element['poster_path'];
    $('#content-movie-js').append(
      '<div class="col s2 offset-s2 center-align movie-js"' + 'data-id="' + idVideo + '">' +
      '<a class="modal-trigger" href="#modal1">' +
      '<img class="movie_img responsive-img" src="' + url + posterPath + '"' + '">' +
      '</a>' +
      '</div>'
    );
  };

  for (var i = 0; i < $('.movie-js').length; i++) {
    $('.movie-js ').eq(i).on('click', function () {
      var idMovie = $(this).data('id');
      getIdYoutube(idMovie);
    });
  }
});

function getIdYoutube(idMovie) {
  var url = 'https://api.themoviedb.org/3/';
  var data = 'movie/';
  var apiKey = '?api_key=265e83f8f40d0da5e658ceb6b263b552';
  var language = '&language=en-US';
  var getIdTrailer = url + data + idMovie + '/videos' + apiKey + language;

  $.getJSON(getIdTrailer, function(results) {
    var trailers = results['results'];
    key = trailers[0]['key'];
    var x = url + data + idMovie + apiKey + '&language=es';
    details(x, key);
  });
}
function details(x, key) {
  $.getJSON(x, function(results) {
    var title = results['title'];
    var overview = results['overview'];
    var url = 'https://www.youtube.com/embed/';

    $('#nameMovie').text(title);
    $('#overview').text(overview);
    $('#trailer').attr('src', url + key);
  });
}