var db = firebase.firestore();


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       // window.location.href = "cust-op.html";
    } else {
      // No user is signed in.
    }
  });

(function displayBalance(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var id = user.uid;
            var res = id.slice(1, 5);
            var res2 = reverse(res)
            var docRef = db.collection("mBalance").doc(res2);

            docRef.get().then(function(doc) {
            if (doc.exists) {
                document.getElementById("amount").innerHTML = doc.data().coins;
            } else {
            console.log("No such document!");
        }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
            
} else {

}
});
    
})();

function reverse(s){
    return s.split("").reverse().join("");
  }