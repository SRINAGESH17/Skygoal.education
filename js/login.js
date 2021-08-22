// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCSs4bnywJYZkrwqWEc1DT4N6VFZxmGW9c",
  authDomain: "skygoal-login.firebaseapp.com",
  projectId: "skygoal-login",
  storageBucket: "skygoal-login.appspot.com",
  messagingSenderId: "687400227804",
  appId: "1:687400227804:web:1ec36fa8187d47194ef519",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signUp() {
  //   var name=document.getElementById('fullname');
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(function (result) {
      return result.user.updateProfile({
        displayName: document.getElementById("fullname").value,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
const db = firebase.firestore();

function signIn() {
  var lemail = document.getElementById("lemail");
  var lpassword = document.getElementById("lpassword");

  const promise = auth.signInWithEmailAndPassword(
    lemail.value,
    lpassword.value
  );
  promise.catch((e) => alert(e.message));
}
function signOut() {
  auth.signOut();
  alert("signed out");
  document.getElementById("change").innerHTML = "Login";
}

auth.onAuthStateChanged(function (user) {
  if (user) {
    //  for testing
    // console.log(user);

    var lemail = user.email;
    alert("Signed In " + lemail);
    document.getElementById("login-btn").innerHTML = "Logout";

    if (document.querySelector(".sign-up") != null) {
      document.querySelector(".sign-up").style.display = "none";
    }
    let usersref = db.collection("users");
    const { serverTimestamp } = firebase.firestore.FieldValue;

    usersref.add({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      mobile: user.phoneNumber,
      createdAt: serverTimestamp(),
    });
  }
});

function googlepop() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithRedirect(provider)
    .then((res) => {
      document.getElementById("change").innerHTML =
        "<button style='background-color:transparent;border:none;outline:none;' onclick='signOut()'>Sign Out from google</button>";
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
  event.preventDefault();
}

function fbRedirect() {
  var provider = new firebase.auth.FacebookAuthProvider();
  auth
    .signInWithRedirect(provider)
    .then((res) => {
      document.getElementById("change").innerHTML =
        "<button onclick='signOut()'style='background-color:transparent;border:none;outline:none;'>Sign Out from google</button>";
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
  // ...
  event.preventDefault();
}
