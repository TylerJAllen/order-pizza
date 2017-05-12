//-------------Business Logic-------------//
//Constructor
function Pizza(size, cheeses, meats) {
  this.size = size;
  this.cheeses = cheeses;
  this.meats = meats;
  this.price = 0;
}


//Prototype that calculates price of pizza
Pizza.prototype.pizzaPrice = function() {
  //Determine price based on user selected size
  if (this.size === "Small"){
    this.price += 4;
  }
  else if (this.size === "Medium"){
    this.price += 6;
  }
  else if (this.size === "Large"){
    this.price += 8;
  }

  //Determine price based on user selected cheese(s)
  if (this.cheeses.length === 5){
    this.price += 2;
  }
  else if (this.cheeses.length === 4){
    this.price += 1.5;
  }
  else if (this.cheeses.length === 3){
    this.price += 1;
  }
  else if (this.cheeses.length === 2){
    this.price += .60;
  }
  else if (this.cheeses.length === 1){
    this.price += .30;
  }

  //Determine price based on user selected meat(s)
  if (this.meats.length === 8) {
    this.price += 8;
  }
  else if (this.meats.length === 7) {
    this.price += 6.5;
  }
  else if (this.meats.length === 6) {
    this.price += 5;
  }
  else if (this.meats.length === 5) {
    this.price += 4;
  }
  else if (this.meats.length === 4) {
    this.price += 3;
  }
  else if (this.meats.length === 3) {
    this.price += 2.25;
  }
  else if (this.meats.length === 2) {
    this.price += 1.5;
  }
  else if (this.meats.length === 1) {
    this.price += .75;
  }
}


//-------------User Interface Logic-------------//
$(function(){
  $("#formOne").submit(function(event){
    event.preventDefault();
    var userSize = $("input:radio[name=pizzaSize]:checked").val();
    var userCheeses = [];
    var userMeats = [];

    $("input:checkbox[name=cheese]:checked").each(function(){
      var cheese = $(this).val();
      userCheeses.push(cheese);
    });
    $("input:checkbox[name=meats]:checked").each(function(){
      var meat = $(this).val();
      userMeats.push(meat);
    });

    var newPizza = new Pizza(userSize, userCheeses, userMeats);
    console.log(newPizza);

    newPizza.pizzaPrice();

    $("ul").append("<li>" + newPizza.price + "</li>");
  });
});
