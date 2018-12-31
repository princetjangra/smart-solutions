var db = firebase.firestore();

(function setMarginTable() {
    var dbRefVendors = db.collection("vMargins");

    dbRefVendors.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var dbRef = dbRefVendors.doc(doc.id).collection("Operators");
            var obj = {};
            // Store operator in object
            var vendor = doc.id;
            obj[vendor] = {}
            dbRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function (doc2) {
                                // Insert vendor (doc2.id) in Operator key of obj
                                obj[vendor]['operator'] = doc2.id;

                                // Insert data fetched from DB in vendor object
                                Object.assign(obj[vendor], doc2.data());
            
                                Object.keys(obj).forEach(function(op) {
                                    
                                    // Store the name of Operator
                                    var newRow = "<tr><td>" + op + "</td>";
            
                                    // Store vendor and its values by iterating through object values
                                    Object.keys(obj[op]).forEach(function(key) {
                                        newRow += "<td>" + obj[op][key] + "</td>";
                                    })
                                    newRow += "</tr>";
            
                                    // Append entries in table
                                    $('#table_vendor_margin tbody').prepend(newRow);
                        })
                });
        });
    });
});
})();        

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

(function setMargin(){
    $('#vendorMargin').val(0);
})();

function setMargin() {
    var margin_vendor = document.getElementById("vendorMargin").value;
    // console.log($('select#manage-vendor-vendor option:selected').val())
    var selected_operator = $('select#manage-vendor-vendor option:selected').val();
    var selected_vendor = $('select#manage-vendor-operator option:selected').val();
    var dbref = db.collection("vMargins").doc(selected_vendor).collection("Operators").doc(selected_operator);
    var temp = db.collection("vMargins").doc(selected_vendor);
    if($('#radio_active_margin').prop('checked')){
        temp.set({
            data:"value"
        })
        .then(function() {
            console.log("Document successfully written!");
            // window.location.href="manage-message.html"
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
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
        temp.set({
            data:"value"
        })
        .then(function() {
            console.log("Document successfully written!");
            // window.location.href="manage-message.html"
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
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