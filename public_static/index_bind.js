var db = firebase.firestore();

(function displayTable(){
    var dbRefOperators = db.collection("Bind");
    //var dbRefVendors   = db.collection("Bind").doc(dbRefOperators.doc);
    var dat = ['AT', 'Vikas Comm', 'active', 'eg service'];

    dbRefOperators.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var dbRef = dbRefOperators.doc(doc.id).collection("Binded");
            // console.log(doc.id+" ->")
            var obj = {};

            // Store operator in object
            var operator = doc.id;
            obj[operator] = {}
            
            dbRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function (doc2) {
                    
                    // Insert vendor (doc2.id) in Operator key of obj
                    obj[operator]['vendor'] = doc2.id;

                    // Insert data fetched from DB in vendor object
                    Object.assign(obj[operator], doc2.data());

                    Object.keys(obj).forEach(function(op) {
                        
                        // Store the name of Operator
                        var newRow = "<tr><td>" + op + "</td>";

                        // Store vendor and its values by iterating through object values
                        Object.keys(obj[op]).forEach(function(key) {
                            if(obj[op][key] == '0')
                                obj[op][key] = 'Inactive';
                            else if(obj[op][key] == '1')
                                obj[op][key] = 'Active';
                            
                            newRow += "<td>" + obj[op][key] + "</td>";
                        })
                        newRow += "</tr>";

                        // Append entries in table
                        $('#bind-table tbody').prepend(newRow);
                        // Using Vanilla JS
                        // var parent = document.getElementById('bind-table').getElementsByTagName('tbody')[0];
                        // parent.insertBefore(newRow, parent.firstChild);
                    })
                });
            });
        });
    });

    // function appendTableColumn(table, rowData) {
    //     var lastRow = $('<tr/>').appendTo(table.find('tbody:last'));
    //     $.each(rowData, function (colIndex, item) {
    //         lastRow.append($('<td/>').text(item));
    //     })
    //     return lastRow;
    // }

    // $(document).ready(function(){
    //     appendTableColumn($('#bind-table'), dat);
    // })
    // // $.each((item) => $('#bind-table tbody').append(('<tr>').append('<td>' + item + '</td>')));
    // // $("<tr><td>prependTo</td></tr>").prependTo("table > tbody");
})();

(function updateSelectOP(){

    db.collection("Operators").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            //console.log(doc.data().name)
            $('#bind_operator_select').append($('<option></option>').text(doc.data().name));
        });
    });
})();

(function updateSelectV(){

    db.collection("Vendors").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            //console.log(doc.data().name)
            $('#bind_vendor_select').append($('<option></option>').text(doc.data().name));
        });
    });
})();

   function addBind(){
        var operator = $('#bind_operator_select').children(":selected").text();
        var vendor = $('#bind_vendor_select').children(":selected").text();
        var mode = $('#bind_mode').children(":selected").text();
        if(mode == "Gtalk"){
            var dbRef = db.collection("Bind").doc(operator)
            .collection("Binded").doc(vendor);

            var temp = db.collection("Bind").doc(operator);
            temp.set({
                temp:"data"
            })
            .then(function() {
                console.log("written temp");
                // window.location.href="manage-message.html"
            })
            .catch(function(error) {
                //console.error("Error writing document: ", error);
            });
            dbRef.set({
                mode:"Gtalk",
                active:0
            })
            .then(function() {
                console.log("Document successfully written!");
                // window.location.href="manage-message.html"
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }else{
        
        var dbRef = db.collection("Bind").doc(operator)
        .collection("Binded").doc(vendor);
        var temp = db.collection("Bind").doc(operator);
            temp.set({
                temp:"data"
            })
            .then(function() {
                console.log("written temp");
                // window.location.href="manage-message.html"
            })
            .catch(function(error) {
                //console.error("Error writing document: ", error);
            });
        dbRef.set({
            mode:"API",
            active:0
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

    function updateBind(){
        var operator = $('#bind_operator_select').children(":selected").text();
        var vendor = $('#bind_vendor_select').children(":selected").text();
        var mode = $('#bind_mode').children(":selected").text();
        var dbRef = db.collection("Bind").doc(operator)
        .collection("Binded").doc(vendor);
        if($('#inlineRadioOptions_bind_active').prop('checked')){
            dbRef.set({
                mode:mode,
                active:1
            })
            .then(function() {
                console.log("Document successfully written!");
                // window.location.href="manage-message.html"
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }else if($('#inlineRadioOptions_bind_inactive').prop('checked')){
            dbRef.set({
                mode:mode,
                active:0
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
