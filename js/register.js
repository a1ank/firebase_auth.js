////////AUTH FUNCTION/////////
(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBT4Z6I8O9LlbjTMPyMBE-LWh3karrbXpE",
    authDomain: "new-app-98447.firebaseapp.com",
    databaseURL: "https://new-app-98447.firebaseio.com",
    projectId: "new-app-98447",
    storageBucket: "new-app-98447.appspot.com",
    messagingSenderId: "451825055280"
  };
  firebase.initializeApp(config);
  const auth = firebase.auth();


  //  GET ELEMENTS
  let name = document.getElementById('name');
  let surname = document.getElementById('surname');
  let age = document.getElementById('age');
  let gender = document.getElementById('gender');
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSingup = document.getElementById('btnSingup');
  const btnLogout = document.getElementById('btnLogout');
  const btnReset = document.getElementById('btnReset');
  const dbRef = firebase.database().ref();
  const usersRef = dbRef.child('users');


  usersRef.on("child_added", snap => {
    console.log("This our users", snap.val());
  });

  //  ADD LOGIN EVENT
  btnLogin.addEventListener('click', e => {
    //  GET EMAIL AND PASS
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //  SING IN
    // console.log("email and password", email, pass, auth);
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then(response => {
        console.log("This is response", response.user.uid);
        dbRef.child("users" + response.user.uid).on("child_added", snap => {
          console.log("My user", snap.val());
        })
      })
      .catch(error => console.log(error));
    // promise.catch(e => console.log(e.message));
  });

  //  ADD SINUP EVENT
  btnSingup.addEventListener('click', e => {
    //  GET EMAIL AND PASS
    const email = txtEmail.value;
    const pass = txtPassword.value;
    //  SING IN
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .catch(e => console.log(e.message));

  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut()
      .then(function(response) {
        console.log("This is response", response);
      }, function(error) {
        console.log("This is error", error);
      })
  });

  //  ADD REALTIME addEventListener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      console.log("This is user", firebaseUser.uid);
      let newUser = {};
      newUser.name = name.value;
      newUser.surname = surname.value;
      newUser.age = age.value;
      newUser.gender = gender.value;
      userRef = dbRef.child("users" + firebaseUser.uid).push(newUser, response => {
        console.log("This is user update response", response);
      });
      btnLogout.classList.remove('hide');
    } else {
      console.log(e.message);
      btnLogout.classList.add('hide');
    }
  });

  // Сброс пароля на почту

  btnReset.addEventListener('click', e => {
    console.log("This email", txtEmail.value, "is true");
    firebase.auth().sendPasswordResetEmail(txtEmail.value)
      .then(function() {
        console.log("The message was sent to the mail");
        // Email sent.
      }).catch(function(error) {
        console.log("This is error", error);
        // An error happened.
      });
  });

  // function getAllUrlParams(url) {
  //
  //   getAllUrlParams().product; // 'shirt'
  //   getAllUrlParams().color; // 'blue'
  //   getAllUrlParams().newuser; // true
  //   getAllUrlParams().nonexistent; // undefined
  //   getAllUrlParams('http://test.com/?a=abc').a; // 'abc'
  //
  //
  //   // get query string from url (optional) or window
  //   var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  //
  //   // we'll store the parameters here
  //   var obj = {};
  //
  //   // if query string exists
  //   if (queryString) {
  //
  //     // stuff after # is not part of query string, so get rid of it
  //     queryString = queryString.split('#')[0];
  //
  //     // split our query string into its component parts
  //     var arr = queryString.split('&');
  //
  //     for (var i = 0; i < arr.length; i++) {
  //       // separate the keys and the values
  //       var a = arr[i].split('=');
  //
  //       // set parameter name and value (use 'true' if empty)
  //       var paramName = a[0];
  //       var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  //
  //       // (optional) keep case consistent
  //       paramName = paramName.toLowerCase();
  //       if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  //
  //       // if the paramName ends with square brackets, e.g. colors[] or colors[2]
  //       if (paramName.match(/\[(\d+)?\]$/)) {
  //
  //         // create key if it doesn't exist
  //         var key = paramName.replace(/\[(\d+)?\]/, '');
  //         if (!obj[key]) obj[key] = [];
  //
  //         // if it's an indexed array e.g. colors[2]
  //         if (paramName.match(/\[\d+\]$/)) {
  //           // get the index value and add the entry at the appropriate position
  //           var index = /\[(\d+)\]/.exec(paramName)[1];
  //           obj[key][index] = paramValue;
  //         } else {
  //           // otherwise add the value to the end of the array
  //           obj[key].push(paramValue);
  //         }
  //       } else {
  //         // we're dealing with a string
  //         if (!obj[paramName]) {
  //           // if it doesn't exist, create property
  //           obj[paramName] = paramValue;
  //         } else if (obj[paramName] && typeof obj[paramName] === 'string'){
  //           // if property does exist and it's a string, convert it to an array
  //           obj[paramName] = [obj[paramName]];
  //           obj[paramName].push(paramValue);
  //         } else {
  //           // otherwise add the property
  //           obj[paramName].push(paramValue);
  //         }
  //       }
  //     }
  //   }
  //
  //   return obj;
  // }


}());
//////////////////////////////



///////// MODaL BOX //////////
// var modal = document.getElementById('myModal');
//
// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
// ///////// //////////
