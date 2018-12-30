var db = firebase.firestore();

(function updateSelect(){

    db.collection("Vendors").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data().name)
            // var output = [];
            // var value = [];
            // value.push(doc.data().name)
            // $.each(values, function(value){
            // output.push('<option value="' + key + '">' + value + '</option>');
    // });
            // $('#manage-update-select').html(output.join(''));
            $('#manage-update-select-vendor').append($('<option></option>').text(doc.data().name));
        });
    });

})();

// On selecting each value, it prints text of option
$(document).on('change','#manage-update-select-vendor', function() {
    var selectedValue = $('#manage-update-select-vendor').children(":selected").text();
    $('#manage-update-name-vendor').val(selectedValue);
    var docRef = db.collection("Vendors").doc(selectedValue);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            $('#code2').val(doc.data().code);
            $('#baseMargin2').val(doc.data().margin);
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

$("#update_vendor_form").submit(
    function register(e){
        e.preventDefault();
        var selectedValue = $('#manage-update-select-vendor').children(":selected").text();
        console.log(selectedValue);
        db.collection("Vendors").doc(selectedValue).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        var name = document.getElementById("manage-update-name-vendor").value;
        var code = document.getElementById("code2").value;
        var margin = document.getElementById("baseMargin2").value;
        
       
       // To find out which radio button is selected 
      
           var email = document.getElementById("email2").value;
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
)