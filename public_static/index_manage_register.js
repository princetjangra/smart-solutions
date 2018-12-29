var db = firebase.firestore();

$("#reg-form").submit(
    function register(e){
        e.preventDefault();
        
         var name = document.getElementById("name").value;
         var code = document.getElementById("code").value;
         var margin = document.getElementById("baseMargin").value;
        
        // To find out which radio button is selected 
        var radio_res = ($('input[name="inlineRadioOptions"]:checked').val());
        console.log(radio_res);

        // To map functions for radio buttons checked
        if($('#reg-mobile').prop('checked')){
            db.collection("Operators").doc(name).set({
                name: name,
                code: code,
                margin: margin,
                type : "operator"
            })
            .then(function() {
                console.log("Document successfully written!");
                // window.location.href="manage-message.html"
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }
        else if($('#reg-dish').prop('checked')){
            db.collection("Dish").doc(name).set({
                name: name,
                code: code,
                margin: margin,
                type : "dish"
            })
            .then(function() {
                console.log("Document successfully written!");
                // window.location.href="manage-message.html"
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }
        else if($('#reg-vendor').prop('checked')){
            db.collection("Vendors").doc(name).set({
                name: name,
                code: code,
                margin: margin,
                type : "vendor"
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
)
