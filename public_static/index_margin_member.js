var db = firebase.firestore();

(function setMarginTable() {
    var dbRefVendors = db.collection("mMargins");

    dbRefVendors.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var dbRef = dbRefVendors.doc(doc.id).collection("Operators");
            var obj = {};
            // Store operator in object\
            console.log(doc.id)
            var dbrf = db.collection("users").doc(doc.id);
            
            dbrf.get().then(function(doc3) {
                if (doc.exists) {
                    var vendor = doc3.data().name;
                    console.log(vendor)
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
                                            $('#table_member_margin tbody').prepend(newRow);
                                })
                        });
                });
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            
    });
});
})();        

(function setOperators() {
    db.collection("Operators").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            $('#margin_operator_select').append($('<option></option>').text(doc.id));
        });
    });
})();

(function setMembers() {
    db.collection("users").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            $('#margin_member_select').append($('<option></option>').text(doc.data().name+" "+ doc.data().number).attr('id', doc.id));
        });
    });
})();

(function setMargin(){
    $('#baseMargin_member').val(0.5);
})();

function setMarginmember() {
    var margin_member = document.getElementById("memberMargin").value;
    var bmargin_member = document.getElementById("baseMargin_member").value;
   // console.log($('select#margin_member_select option:selected').attr('id'))
    var selected_operator = $('select#margin_operator_select option:selected').val();
    var selected_member = $('select#margin_member_select option:selected').attr('id');

    var dbref = db.collection("mMargins").doc(selected_member).collection("Operators").doc(selected_operator);
    var temp = db.collection("mMargins").doc(selected_member);

    db.collection("users").doc(selected_member).get().then(function(doc) {
        if (doc.exists) {
            if($('#radio_active_margin_member').prop('checked')){
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
                    margin:margin_member,
                    bmargin:bmargin_member,
                    number:doc.data().number,
                    status:"active"
                })
                .then(function() {
                    console.log("Document successfully written!");
                    // window.location.href="manage-message.html"
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }else if($('#radio_inactive_margin_member').prop('checked')){
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
                    margin:margin_member,
                    bmargin:bmargin_member,
                    number:doc.data().number,
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
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


}