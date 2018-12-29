var db = firebase.firestore();

(function updateSelect(){

    db.collection("Operators").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data().name)
            // var output = [];
            // var value = [];
            // value.push(doc.data().name)
            // $.each(values, function(value){
            // output.push('<option value="' + key + '">' + value + '</option>');
    // });
            // $('#manage-update-select').html(output.join(''));
            $('#manage-update-select').append($('<option></option>').text(doc.data().name));
        });
    });

})();

// On selecting each value, it prints text of option
$(document).on('change','#manage-update-select', function() {
    var selectedValue = $('#manage-update-select').children(":selected").text();
    $('#manage-update-name').val(selectedValue);
    var docRef = db.collection("Operators").doc(selectedValue);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            $('#code1').val(doc.data().code);
            $('#baseMargin1').val(doc.data().margin);
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
});

// (function selectedOption(){
//     var selectedValue = $('#manage-update-select option:selected').text();
//     console.log(selectedValue);
// })();

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