var db = firebase.firestore();

var user = firebase.auth().currentUser;

var oplist = [];
var addData = "";


// Display operators available for deletion
(function showOperators() {
    
    // var user = firebase.auth().currentUser;
    var dbRefOperators = db.collection("users").doc(user.uid).collection("operators");
    
    dbRefOperators.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // Initialize object for storing fetched data
            var obj = {};
            
            oplist.push(doc.id);

            // Insert data fetched from DB in customer object
            Object.assign(obj, doc.data());

            // Store Transaction ID in new variable which will be used for appending data to table
            var newRow = "<tr><td>" + doc.id + "</td>";
            Object.keys(obj).forEach(function (key) {

                // Store the details of transaction
                newRow += "<td>" + obj[key] + "</td>";
            })
            // Close the row
            newRow += "</tr>";

            // Append entries in table
            // $('#cust-transactions-table tbody').prepend(newRow);
            $('#cust-op-table tbody').prepend(newRow);

            addData += "<option>" + doc.id + "</option>";
            // console.log("document written");
            
        });
        $('#cust-del-op').html(addData);
    });
})();

var op = [];
var not = [];

(function displayOperators(){
    
    var dbRefOperators = db.collection("Operators")
    dbRefOperators.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            op.push(doc.id);
        });

        var app = "";

        (op.filter(function (item) {
            return !oplist.includes(item);
        }))
        .forEach(function(newop){
            app += "<option>" + newop + "</option>";
        })

        console.log(app)
        $('#cust-add-op').html(app);
    });
    
})();

// Test
// console.time('someFunction');

// for(i=1; i<30; i++)($('#cust-add-op').append($('<option></option>').text('bakchodi')))

// console.timeEnd('someFunction');

function addOperator(){
    var addop = $('#cust-add-op option:selected')

    // Check if disabled option is selected or not
    if(addop.prop('disabled') != true){

        // Value of selected option
        var add = addop.text();

        var docRef = db.collection("users").doc(user.uid);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", JSON.stringify(doc.data()));
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        db.collection("op_requests").doc(user.uid).set({
            name: userName,
            email: userEmail,
            number: userNumber,
            operator: add
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            // window.location.href = "cust-login.html";
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }
    else{

        // UI functions

    }
}

// Delete selected Operator
function deleteOperator(){

    // Get selected option
    var delop = $('#cust-del-op option:selected');

    // Check if disabled option is selected or not
    if(delop.prop('disabled') != true){
        var del = delop.text();
    
        db.collection("users").doc("6RL81S7mFoLbksC9TDys").collection("operators").doc(del).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
    else{

        // UI functions

    }
}