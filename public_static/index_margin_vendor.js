var db = firebase.firestore();


function setMargin() {
   
}

(function setOperators() {
    db.collection("Operators").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id)
        });
    });
})();

(function setVendors() {
    db.collection("Vendors").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id)
        });
    });
})();