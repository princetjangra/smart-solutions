var db = firebase.firestore();

(function setMarginTable() {
    var dbRefOperators = db.collection("Transaction").doc("user_uid").collection("t_id");
    //var dbRefVendors   = db.collection("Bind").doc(dbRefOperators.doc);
    var dat = ['AT', 'Vikas Comm', 'active', 'eg service'];

    dbRefOperators.where("approve", "==", "no").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // console.log(doc.id+" ->")
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

            console.log(id, obj.name);
            newRow += "<td><button class=\"btn btn-primary approve-btn\" id=\"a" + id + "\" onclick=\"approve(this)\">Approve</button></td><td><button class=\"btn btn-primary reject-btn\" id=\"r" + id + "\" onclick=\"reject(this)\">Reject</button></td></tr>";

            // Append entries in table
            $('#member_table tbody').prepend(newRow);

            // Using Vanilla JS
            // var parent = document.getElementById('bind-table').getElementsByTagName('tbody')[0];
            // parent.insertBefore(newRow, parent.firstChild);
            // })
        });
    });
})();