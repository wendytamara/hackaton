var url = 'https://api.themoviedb.org/3/list/45420?api_key=';
var apiKey = '265e83f8f40d0da5e658ceb6b263b552';
var language = '&language=es';

$.getJSON(url + apiKey + language, function(results) {
  var items = results['items'];
  // console.log(items);

  for (let i = 0; i < items.length; i++) {
    var element = items[i];
    var url = 'https://image.tmdb.org/t/p/original/';
    var posterPath = element['poster_path'];
    $('#content-movie-js').append(
      '<div class="col s2 offset-s2 center-align">' +
        '<a class="modal-trigger" href="#modal1">' +
          '<img class="movie_img responsive-img" src=' + url + posterPath + '>' +
        '</a>' +
      '</div>'
    );
  }
});