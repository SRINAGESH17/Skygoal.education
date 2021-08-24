// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCSs4bnywJYZkrwqWEc1DT4N6VFZxmGW9c",
    authDomain: "skygoal-login.firebaseapp.com",
    databaseURL:
      "https://skygoal-login-default-rtdb.asia-southeast1.firebasedatabase.app",
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
  ).then(function (result) {
    console.log(result);
    window.location.href = "/index.html";
  });

  promise.catch((e) => alert(e.message));
}
function signOut() {
  auth.signOut().then(() => {
  
 
    console.log('signed out');
    window.location.href = "/index.html";
  });
    // window.location.href = "/index.html";
  // document.getElementById("change").innerHTML = "Login";

   if (document.querySelector(".profile-btn") != null) {
     document.querySelector(".profile-btn").style.display = "none";
   }
  

}

auth.onAuthStateChanged(function (user) {
  if (user) {
    //  for testing
    // console.log(user);

    var lemail = user.email;
    console.log("Signed in as" + lemail);
    // alert("Signed In " + lemail);
    document.getElementById("login-btn").innerHTML = "Logout";

    if (document.querySelector(".profile-btn") != null) {
      document.querySelector(".profile-btn").style.display = "block";
    }
    document.getElementById("login-btn").addEventListener("click", function () {
      signOut();

    });

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
  // Get a reference to the database service
  var database = firebase.database();


function getData(user) {

  
  //  gets data from realtime database if present and fills into the fields
  const dbRef = firebase.database().ref();
  dbRef
    .child("users")
    .child(user.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        document.querySelector("#name").value = snapshot.val().name;
        document.querySelector("#surname").value = snapshot.val().surname;
        document.querySelector("#email").value = snapshot.val().email;
        document.querySelector("#mobile").value = snapshot.val().mobile;
      } else {
        console.log("No data ");
        fillDefault(user);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}





function writeUserData(user) {
  var name = document.querySelector("#name").value;
  var email = document.querySelector("#email").value;
  var surname = document.querySelector("#surname").value;
  var mobile = document.querySelector("#mobile").value;
  firebase
    .database()
    .ref("users/" + user.uid)
    .set(
      {
        name: name,
        surname: surname,
        email: email,
        mobile: mobile,
      },
      (error) => {
        if (error) {
          console.error(error);
        } else {
          alert("Data saved");
          console.log("data saved successfully");
        }
      }
    );
}