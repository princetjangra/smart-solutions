var db = firebase.firestore();

// var user = firebase.auth().currentUser;
//var user = firebase.auth().currentUser;
//console.log(user.uid)

var oplist = [];
var addData = "";
var id="";

console.log("id")

(function getuid() {
    firebase.auth().onAuthStateChanged(function(user) {
        var user = firebase.auth().currentUser;
        if (user) {
          // User is signed in.
          id = user.uid;
          console.log(id)
        } else {
            console.log(id)
          // No user is signed in.
        }
      });
})();

// Display operators available for deletion
(function showOperators() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            id = user.uid;
            var dbRefOperators = db.collection("users").doc(id).collection("operators");
    
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
        } else {
          // No user is signed in.
        }
      });
    // var user = firebase.auth().currentUser;
    
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
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user = firebase.auth().currentUser;
          id = user.uid;
          var addop = $('#cust-add-op option:selected')

          console.log("here")
    // Check if disabled option is selected or not
    if(addop.prop('disabled') != true){

        // Value of selected option
        var add = addop.text();

        var docRef = db.collection("users").doc(id);

        docRef.get().then(function (doc) {
            if (doc.exists) {

                db.collection("op_requests").doc(id).collection("Operators").doc(add).set({
                    name: doc.data().name,
                    email: doc.data().email,
                    number: doc.data().number,
                    operator: add,
                    type:"mobile"
                })
                db.collection("op_requests").doc(id).set({
                    data:"tempo"
                })
                    // .then(function (docRef) {
                    //     //console.log("Document written with ID: ", docRef.id);
                    //     // window.location.href = "cust-login.html";
                    // })
                    // .catch(function (error) {
                    //     console.error("Error adding document: ", error);
                    // });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }
    else{

        // UI functions

    }
        } else {
          
        }
      });
    
}

// Delete selected Operator
function deleteOperator(){

    // Get selected option
    var delop = $('#cust-del-op option:selected');

    // Check if disabled option is selected or not
    if(delop.prop('disabled') != true){
        var del = delop.text();
    
        db.collection("users").doc(id).collection("operators").doc(del).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
    else{

        // UI functions

    }
}



//Dish Operator


var dishoplist = [];
var addDishData = "";


// Display operators available for deletion
(function showDishOperators() {
    
    // var user = firebase.auth().currentUser;
    var dbRefOperators = db.collection("users").doc(id).collection("Dish");
    
    dbRefOperators.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // Initialize object for storing fetched data
            var obj = {};
            
            dishoplist.push(doc.id);

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
            $('#cust-dish-op-table tbody').prepend(newRow);

            addDishData += "<option>" + doc.id + "</option>";
            // console.log("document written");
            
        });
        $('#cust-del-dish-op').html(addDishData);
    });
})();

var dishop = [];
var dishnot = [];

(function displayDishOperators(){
    
    var dbRefOperators = db.collection("Dish")
    dbRefOperators.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            dishop.push(doc.id);
        });

        var app = "";

        (dishop.filter(function (item) {
            return !dishoplist.includes(item);
        }))
        .forEach(function(newop){
            app += "<option>" + newop + "</option>";
        })

        console.log(app)
        $('#cust-add-dish-op').html(app);
    });
    
})();

// Test
// console.time('someFunction');

// for(i=1; i<30; i++)($('#cust-add-op').append($('<option></option>').text('bakchodi')))

// console.timeEnd('someFunction');

function addDishOperator(){
    var addop = $('#cust-add-dish-op option:selected')

    // Check if disabled option is selected or not
    if(addop.prop('disabled') != true){

        // Value of selected option
        var add = addop.text();

        var docRef = db.collection("users").doc(id);

        docRef.get().then(function (doc) {
            if (doc.exists) {

                db.collection("op_requests").doc(id).collection("Operators").doc(add).set({
                    name: doc.data().name,
                    email: doc.data().email,
                    number: doc.data().number,
                    operator: add,
                    type:"Dish"
                })
                    // .then(function (docRef) {
                    //     console.log("Document written with ID: ", docRef.id);
                    //     // window.location.href = "cust-login.html";
                    // })
                    // .catch(function (error) {
                    //     console.error("Error adding document: ", error);
                    // });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }
    else{

        // UI functions

    }
}

// Delete selected Operator
function deleteDishOperator(){

    // Get selected option
    var delop = $('#cust-del-dish-op option:selected');

    // Check if disabled option is selected or not
    if(delop.prop('disabled') != true){
        var del = delop.text();
    
        db.collection("users").doc(id).collection("Dish").doc(del).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
    else{

        // UI functions

    }
}

