var db = firebase.firestore();

(function updateSelect(){

    db.collection("Dish").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data().name)
            // var output = [];
            // var value = [];
            // value.push(doc.data().name)
            // $.each(values, function(value){
            // output.push('<option value="' + key + '">' + value + '</option>');
    // });
            // $('#manage-update-select').html(output.join(''));
            $('#manage-update-select-dish').append($('<option></option>').text(doc.data().name));
        });
    });

})();

// On selecting each value, it prints text of option
$(document).on('change','#manage-update-select-dish', function() {
    var selectedValue = $('#manage-update-select-dish').children(":selected").text();
    $('#manage-update-name-dish').val(selectedValue);
    var docRef = db.collection("Dish").doc(selectedValue);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            $('#code3').val(doc.data().code);
            $('#baseMargin3').val(doc.data().margin);
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

$("#update_dish_form").submit(
    function register(e){
        e.preventDefault();
        var selectedValue = $('#manage-update-select-dish').children(":selected").text();
        console.log(selectedValue);
        db.collection("Dish").doc(selectedValue).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        var name = document.getElementById("manage-update-name-dish").value;
        var code = document.getElementById("code3").value;
        var margin = document.getElementById("baseMargin3").value;
        
       
       // To find out which radio button is selected 
      
           //var email = document.getElementById("email2").value;
           db.collection("Dish").doc(name).set({
               name: name,
               code: code,
               margin: margin,
              // email:email,
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
)