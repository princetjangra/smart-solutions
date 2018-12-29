var db = firebase.firestore();

function updateSelect(){
    // var value = window.prompt
    var values= {
        "1": "Test 1",
        "2": "Test 2",
        "3": "Test 3"
    }
    var output = [];
    $.each(values, function(key, value){
        output.push('<option value="' + key + '">' + value + '</option>');
    });
    $('#manage-update-select').html(output.join(''));
}

$("#update_form").submit(
    function register(e){
        e.preventDefault();
        var name = document.getElementById("manage-update-name").value;
        var code = document.getElementById("code1").value;
        var margin = document.getElementById("baseMargin1").value;
        
       
       // To find out which radio button is selected 
       var radio_res = ($('input[name="inlineRadioOptions_update"]:checked').val());
       console.log(radio_res);

       // To map functions for radio buttons checked
       if($('#manage-update-mobile').prop('checked')){
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
       else if($('#manage-update-dish').prop('checked')){
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
       else if($('#manage-update-vendor').prop('checked')){
           var email = document.getElementById("email1").value;
           db.collection("Vendors").doc(name).set({
               name: name,
               code: code,
               margin: margin,
               email:email,
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