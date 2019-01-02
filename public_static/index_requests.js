var db = firebase.firestore();

(function setRequests() {

    var dbRefrequests = db.collection("op_requests");
    //var dbRefVendors   = db.collection("Bind").doc(dbRefOperators.doc);

    dbRefrequests.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc1) {

            var dbRefusers = db.collection("users").doc(doc1.id);
            console.log(doc1.id)
            // Store id in object
            var id = doc1.id;
            dbRefusers.get().then(function (doc) {
                var obj = {};

                dbRefrequests.doc(doc1.id).collection("Operators")
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc4) {
                        obj.name = doc.data().name;
                        obj.op = doc4.id;
                        obj.no = doc.data().number;

                        
                        //  console.log(JSON.stringify(obj))
                        var newRow = "<tr>";
                        Object.keys(obj).forEach(function (key) {
                            newRow += "<td>" + obj[key] + "</td>";
                        })
                        
                        // Store operator whose request has has been raised by customer
                        var opid = obj.op;
                        
                        // Store m/a/r + unique id_opertor // m: margin input, a: accept button, r: reject button
                        // This will be used to append unique ids' to html elements making it easier to get their values
                        var nid = "";
                        nid = id + "_" + opid;
        
                        newRow += "<td><input type=\"number\" required min=\"0\" step=\"0.01\" placeholder=\"Enter member margin\" id=\"m" + 
                        nid + "\"></td><td><button class=\"btn btn-primary approve-btn\" id=\"a" + 
                        nid + "\" onclick=\"approve(this)\">Approve</button></td><td><button class=\"btn btn-primary reject-btn\" id=\"r" + 
                        nid + "\" onclick=\"reject(this)\">Reject</button></td></tr>";
        
                        // Append entries in table
                        $('#requests_table tbody').prepend(newRow);
        
                        // Using Vanilla JS
                        // var parent = document.getElementById('bind-table').getElementsByTagName('tbody')[0];
                        // parent.insertBefore(newRow, parent.firstChild);
                        // })
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

                // Store details in object
               

            });
        });
    });
})();

function approve(item){
    aid = item.id.substring(1).split("_")[0];
    var opid = item.id.split("_")[1];

    // Value of margin input field
    var minput = $('#m' + aid + '_' + opid).val();
    //console.log(opid)


    var dbref = db.collection("users").doc(aid).collection("operators").doc(opid);
    var dbref2 = db.collection("mMargins").doc(aid).collection("Operators").doc(opid);
    var dbrefT = db.collection("mMargins").doc(aid);
    var setWithMerge = dbref.set({
        margin:minput
    }, { merge: true })
    .then(function() {
        console.log("Document successfully written!");
        //UI Functions  
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    db.collection("users").doc(aid).get().then(function(doc) {
        if (doc.exists) {
            var setWithMerge2 = dbref2.set({
                margin:minput,
                bmargin:"0.5",
                number:doc.data().number,
                status:"active"
            }, { merge: true })
            .then(function() {
                console.log("Document successfully written!");

                db.collection("op_requests").doc(aid).collection("Operators").doc(opid).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
        
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
 
    var setWithMerge2 = dbrefT.set({
        temp:"data"
    }, { merge: true })
    .then(function() {
        console.log("Document successfully written!");

        //UI approve Functions  

    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function reject(ritem){
    rid = ritem.id.substring(1).split("_")[0];
    var opid2 = ritem.id.split("_")[1];
    var dbref = db.collection("op_requests").doc(rid).collection("Operators").doc(opid2);
    dbref.delete().then(function() {
        console.log("Document successfully deleted!");

         //UI reject Functions

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
