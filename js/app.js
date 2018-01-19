$(document).ready(function() {
  var config = {
    apiKey: 'AIzaSyCTEIYIpKwepybwx0Gpfh7uKVs339oAZn8',
    authDomain: 'blockbuster-9291e.firebaseapp.com',
    databaseURL: 'https://blockbuster-9291e.firebaseio.com',
    projectId: 'blockbuster-9291e',
    storageBucket: 'blockbuster-9291e.appspot.com',
    messagingSenderId: '577060260032'
  };
  firebase.initializeApp(config);

  $('.modal').modal();


  var passwordLogin = $('.password-login');
  var emailLogin = $('.email-login');
  var emailRegister = $('.email-register');
  var passwordRegisterNew = $('.password-register');
  var nameRegisterNew = $('.name-register');
  var validatePassword = false;
  var validateEmail = false;
  var validateName = false;

  emailRegister.on('keyup', function(event) {
    var EMAILUSER = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

    if (EMAILUSER.test($(this).val())) {
      validateEmail = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });


  passwordRegisterNew.on('keyup', function(event) {
    if (passwordRegisterNew.val()) {
      validatePassword = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });

  nameRegisterNew.on('keyup', function(event) {
    if (nameRegisterNew.val()) {
      validateName = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });

  emailLogin.on('keyup', function(event) {
    var EMAILUSER = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

    if (EMAILUSER.test($(this).val())) {
      validateEmail = true;
      validateUser();
    } else {
      inactiveUser();
    }
  });

  passwordLogin.on('keyup', function(event) {
    if (passwordLogin.val()) {
      validatePassword = true;
      validateUser();
    } else {
      inactiveUser();
    }
  });

  function validateUser() {
    if (validateEmail && validatePassword) {
      $('.btn-login').attr('disabled', false);
    }
  }


  function validateRegister() {
    if (validateEmail && validatePassword && validateName) {
      $('.btn-register').attr('disabled', false);
    }
  }

  function inactiveRegister() {
    $('.btn-register').attr('disabled', 'disabled');
  }

  function inactiveUser() {
    $('.btn-login').attr('disabled', 'disabled');
  }


  $('.btn-register').click(function() {
    firebase.auth().createUserWithEmailAndPassword(emailRegister.val(), passwordRegisterNew.val())
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    firebase.auth().onAuthStateChanged(function(user) {
      var userNew = nameRegisterNew.val();
      if (user) {
        // Ingresando datos en la base de datos
        firebase.database().ref('users/' + user.uid).set({
          name: userNew,
          email: user.email,
          uid: user.uid,
          profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/blockbuster-9291e.appspot.com/o/user.png?alt=media&token=60f2aa30-20e5-4f8b-bbb0-81c61fa98ca2',
          posterPhoto: 'https://firebasestorage.googleapis.com/v0/b/blockbuster-9291e.appspot.com/o/portada9.jpg?alt=media&token=98f8be0d-d618-49b0-a87b-49b30814f6f8'
        }).then(user => {
          console.log('Usuario Registrado');
        });
      } else {
        console.log('Error al registrar');
      }
    });
  });


  // Autentificación por email y password

  $('.btn-login').click(function(event) {
    event.preventDefault();

    var email = emailLogin.val();
    var password = passwordLogin.val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        alert('email y/o contraseña incorrecta');
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        $(location).attr('href', 'home.html');
      }
    });
  });


  // Login con Google
  var provider = new firebase.auth.GoogleAuthProvider();
  $('.btn-google').on('click', function() {
    event.preventDefault();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;

      var user = result.user;

      firebase.database().ref('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        profilePhoto: user.photoURL,
        posterPhoto: 'NONE'
      }).then(
        user => {
          $(location).attr('href', 'home.html');
        });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });

  var providerFacebook = new firebase.auth.FacebookAuthProvider();
  $('.btn-facebook').on('click', function() {
    event.preventDefault();
    firebase.auth().signInWithPopup(providerFacebook).then(function(result) {
      var token = result.credential.accessToken;

      var user = result.user;

      firebase.database().ref('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        profilePhoto: user.photoURL,
        posterPhoto: 'NONE'
      }).then(
        user => {
          $(location).attr('href', 'home.html');
        });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });


  $('.close').click(function() {
    firebase.auth().signOut().then(function() {
      $(location).attr('href', '../index.html');
    }).catch(function(error) {
      // An error happened.

    });
  });
});
