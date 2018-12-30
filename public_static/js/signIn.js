// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Get the currently signed-in user
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";


    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.uid;

      var email_verified = user.emailVerified;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

  });

}

function create_account()
{
    var userName = document.getElementById("cust-name").value;
    var userEmail = document.getElementById("cust-email").value;
    var userNumber = document.getElementById("cust-phone").value;
    var userAddress =document.getElementById("cust-address").value;
    var userPass = document.getElementById("cust-pass").value;

    // var email_id = user.uid;


    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    });
    //  function send_verification()
    // {
    var user = firebase.auth().currentUser;
    db.collection("users").doc(user.uid).set({
    name:userName,
    email:userEmail,
    number:userNumber,
    address:userAddress,
    password:userPass
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        window.location.href="cust-login.html";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    user.sendEmailVerification().then(function() {
    // Email sent.
       window.alert("Verification sent");
    }).catch(function(error) {
    // An error happened.
       window.alert("Error : " + error.message);
    });
    // }

}


function logout(){
  firebase.auth().signOut();
}

 
