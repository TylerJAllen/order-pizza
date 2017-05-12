//-------------Business Logic-------------//
//Constructor
function Pizza (size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

function Toppings (cheese, meats) {

}


//-------------User Interface Logic-------------//
$(function(){
  $("#formOne").submit(function(event){
    event.preventDefault();
    var userSize = $("input:radio[name=pizzaSize]:checked").val();
    var userCheeses = [];
    var userMeats = [];

    



    $("#results").text(size);
  });
});
