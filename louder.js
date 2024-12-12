firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      // home
      setTimeout(() => {
        window.location.assign("home.html");
      }, 1000);
    } else {
      // email verification
      setTimeout(() => {
        window.location.assign("emailVerifiaction.html");
      }, 1000);
    }
  } else {
    // login
    setTimeout(() => {
      window.location.assign("Login.html");
    }, 1000);
  }
});
