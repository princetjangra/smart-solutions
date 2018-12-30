var db = firebase.firestore();


function setMargin() {
   
}












(function setOperators() {
    db.collection("Operators").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            $('#manage-vendor-vendor').append($('<option></option>').text(doc.id));
        });
    });
})();

(function setVendors() {
    db.collection("Vendors").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            $('#manage-vendor-operator').append($('<option></option>').text(doc.id));
        });
    });
})();