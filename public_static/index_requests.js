var db = firebase.firestore();

(function setRequests() {
    
    var dbRefrequests = db.collection("op_requests");
    //var dbRefVendors   = db.collection("Bind").doc(dbRefOperators.doc);

    dbRefrequests.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc1) {
            var dbRefusers = db.collection("users").doc(doc1.id);

            dbRefusers.get().then(function(doc) {
                    var obj = {};
                    // Store operator in object
                    var id = doc.data().id;
        
                    // Store details in object
                    obj.name = doc.data().name;
                    obj.email = doc.data().email;
                    obj.no = doc.data().number;
        
                    //  console.log(JSON.stringify(obj))
                    var newRow = "<tr>";
                    Object.keys(obj).forEach(function (key) {
                        newRow += "<td>" + obj[key] + "</td>";
                    })
        
                   // console.log(id, obj.name);
                    newRow += "<td><button class=\"btn btn-primary approve-btn\" id=\"a" + id + "\" onclick=\"approve(this)\">Approve</button></td><td><button class=\"btn btn-primary reject-btn\" id=\"r" + id + "\" onclick=\"reject(this)\">Reject</button></td></tr>";
        
                    // Append entries in table
                    $('#requests_table tbody').prepend(newRow);
        
                    // Using Vanilla JS
                    // var parent = document.getElementById('bind-table').getElementsByTagName('tbody')[0];
                    // parent.insertBefore(newRow, parent.firstChild);
                    // })

                });
            });
        });
})();

function approve(item){
    aid = item.id.substring(1);
    var dbref = db.collection("users").doc(aid);
    var setWithMerge = dbref.set({
        approve:"yes"
    }, { merge: true })
    .then(function() {
        console.log("Document successfully written!");
        //UI Functions
        
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function reject(ritem){
    rid = ritem.id.substring(1);
    var dbref = db.collection("users").doc(rid);
    dbref.delete().then(function() {
        console.log("Document successfully deleted!");

         //UI Functions

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
