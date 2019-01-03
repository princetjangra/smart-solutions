var db = firebase.firestore();

function onTransfer(){
    var number = document.getElementById("balance-member-number").value;
    var balance = parseInt(document.getElementById("balance-member-amount").value);

    var def = db.collection("Mobiles").doc(number);
    def.get().then(function(doc) {
        if (doc.exists) {
            var id = doc.data().id;
            var res = id.slice(1, 5);
            var res2 = reverse(res)
            console.log(res2)
            //Encode Here
            var dbRef = db.collection("mBalance").doc(res2);
            dbRef.get().then(function(doc) {
                if (doc.exists) {
                    var amount = parseInt(doc.data().coins);
                    amount = amount + balance;
                    dbRef.set({
                        coins: amount
                    })
                    .then(function() {
                        console.log("Document successfully written!");
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

        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


  
}

function onRefund(){
    var number = document.getElementById("balance-member-number").value;
    var balance = parseInt(document.getElementById("balance-member-amount").value);

    var def = db.collection("Mobiles").doc(number);
    def.get().then(function(doc) {
        if (doc.exists) {
            var id = doc.data().id;
            //Decode Here
            var res = id.slice(1, 5);
            var res2 = reverse(res)
            var dbRef = db.collection("mBalance").doc(res2);
            dbRef.get().then(function(doc) {
                if (doc.exists) {
                    var amount = parseInt(doc.data().coins);
                    amount = amount - balance;
                    dbRef.set({
                        coins: amount
                    })
                    .then(function() {
                        console.log("Document successfully written!");
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

        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function onfetchTable(){
      
}

function reverse(s){
    return s.split("").reverse().join("");
}