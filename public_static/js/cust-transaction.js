var db = firebase.firestore();

const pages = 1;

(function displayTable(){
    var dbRefOperators = db.collection("Transaction")
   
    
  
    dbRefOperators.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var dbRef = dbRefOperators.doc(doc.id).collection("t_id").limit(pages);

            dbRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    // Initialize object for storing fetched data
                    var obj = {};

                    // Insert data fetched from DB in customer object
                    Object.assign(obj, doc.data());

                    // Store Transaction ID in new variable which will be used for appending data to table
                    var newRow = "<tr><td>" + doc.id + "</td>";
                    Object.keys(obj).forEach(function(key) {

                        // Store the details of transaction
                        newRow += "<td>" + obj[key] + "</td>";
                        

                    })
                    // Close the row
                    newRow += "</tr>";
                    

                    // Append entries in table
                    // $('#cust-transactions-table tbody').prepend(newRow);
                    $('.cust-transactions-table tbody').prepend(newRow);
                    
                });
            });
        });
    });

})();

function showMore() {
    pages+=1;
    
}