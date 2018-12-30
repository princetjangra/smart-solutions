var db = firebase.firestore();


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

function setMargin() {
    var margin_vendor = document.getElementById("vendorMargin").value;
    var selected_operator;
    var selected_vendor;
    var dbref = db.collection("vMargins").doc(selected_vendor).collection("Operators").doc(selected_operator);
    if($('#radio_active_margin').prop('checked')){
        dbref.set({
            margin:margin_vendor,
            status:"active"
        })
        .then(function() {
            console.log("Document successfully written!");
            // window.location.href="manage-message.html"
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }else if($('#radio_inactive_margin').prop('checked')){
        dbref.set({
            margin:margin_vendor,
            status:"inactive"
        })
        .then(function() {
            console.log("Document successfully written!");
            // window.location.href="manage-message.html"
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

}