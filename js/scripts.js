//-------------Business Logic-------------//
//Order constructor
function Order(sides, drinks) {
  this.pizza = [];
  this.sides = sides;
  this.drinks = drinks;
  this.price = 0;
}

//Pizza constructor that will go inside Order constructor
function Pizza(size, sauces) {
  this.size = size;
  this.sauces = sauces;
  this.cheeses = [];
  this.meats = [];
  this.veggies = [];
}

Pizza.prototype.outputPizzaDetails = function(){
  $("ul#resultsSize").append("<li>" + this.size + "</li>");
  $("ul#resultsSauce").append("<li>" + this.sauces + "</li>");
  for(var index = 0; index < this.cheeses.length; index += 1){
    $("ul#resultsCheeses").append("<li>" + this.cheeses[index] + "</li>");
  }

  for(var index = 0; index < this.meats.length; index += 1){
    $("ul#resultsMeats").append("<li>" + this.meats[index] + "</li>");
  }

  for(var index = 0; index < this.veggies.length; index += 1){
    $("ul#resultsVeggies").append("<li>" + this.veggies[index] + "</li>");
  }
}

//Prototype that calculates price of pizza based on user inputs
Pizza.prototype.pizzaPrice = function() {
  var price = 0;
  //Determine price based on user selected size
  if (this.size === "Small"){
    price += 4;
  }
  else if (this.size === "Medium"){
    price += 6;
  }
  else if (this.size === "Large"){
    price += 8;
  }
  //Determine price based on user selected cheese(s)
  if (this.cheeses.length === 5){
    price += 2;
  }
  else if (this.cheeses.length === 4){
    price += 1.50;
  }
  else if (this.cheeses.length === 3){
    price += 1;
  }
  else if (this.cheeses.length === 2){
    price += .60;
  }
  else if (this.cheeses.length === 1){
    price += .30;
  }
  //Determine price based on user selected meat(s)
  else if (this.meats.length === 6) {
    price += 5;
  }
  else if (this.meats.length === 5) {
    price += 4;
  }
  else if (this.meats.length === 4) {
    price += 3;
  }
  else if (this.meats.length === 3) {
    price += 2.25;
  }
  else if (this.meats.length === 2) {
    price += 1.50;
  }
  else if (this.meats.length === 1) {
    price += .75;
  }
  //Determine price based on user selected veggie(s)
  if (this.veggies.length > 5) {
    price += 3;
  }
  else if (this.veggies.length > 2) {
    price += 1.5;
  }
  return price;
}

//Prototype that inputs pizza price and calculates total price of user order
Order.prototype.orderPrice = function() {
  //Determine price based on user selected side(s)
  if(this.sides.includes("Breadsticks") === true) {
    this.price += 3;
  }
  if (this.sides.includes("Cheesy Breadsticks") === true) {
    this.price += 4;
  }
  if (this.sides.includes("Pasta - Chicken Alfredo") === true) {
    this.price += 5;
  }
  if (this.sides.includes("Pasta - Meaty Marinara") === true) {
    this.price += 5;
  }
  if (this.sides.includes("Wings - Traditional") === true) {
    this.price += 6;
  }
  if (this.sides.includes("Wings - BBQ") === true) {
    this.price += 6;
  }
  //Determine price based on user selected drink(s)
  if(this.drinks.length === 4){
    this.price += 6;
  }
  else if(this.drinks.length === 3){
    this.price += 4.5;
  }
  else if(this.drinks.length === 2){
    this.price += 3;
  }
  else if(this.drinks.length === 1){
    this.price += 1.5;
  }
}


//-------------User Interface Logic-------------//
$(function(){
  //User Interface Global Variables
  var userSize = "";
  var userSauce = "";
  var userCheeses = [];
  var userMeats = [];
  var userVeggies = [];
  var userSides = [];
  var userDrinks = [];

  $(".formOne").click(function(event){
    event.preventDefault();
    $("#startButton").hide();
    $("#containerBody").show();
    $(".formSize").show();
  });

  $(".formSize").submit(function(event){
    event.preventDefault();
    userSize = $("input:radio[name=size]:checked").val();
    $(".formSize").hide();
    $(".formSauce").show();
  });

  $(".formSauce").submit(function(event){
    event.preventDefault();
    userSauce = $("input:radio[name=sauce]:checked").val();
    //Create newPizza constructor with user inputs
    newPizza = new Pizza(userSize, userSauce);
    $(".formSauce").hide();
    $(".formCheese").show();
  });

  $(".formCheese").submit(function(event){
    event.preventDefault();
    $("input:checkbox[name=cheese]:checked").each(function(){
      var cheese = $(this).val();
      newPizza.cheeses.push(cheese);
    });
    $(".formCheese").hide();
    $(".formMeat").show();
  });

  $(".formMeat").submit(function(event){
    event.preventDefault();
    $("input:checkbox[name=meats]:checked").each(function(){
      var meat = $(this).val();
      newPizza.meats.push(meat);
    });
    $(".formMeat").hide();
    $(".formVeggies").show();
  });

  $(".formVeggies").submit(function(event){
    event.preventDefault();
    $("input:checkbox[name=veggies]:checked").each(function(){
      var veggie = $(this).val();
      newPizza.veggies.push(veggie);
    });
    $(".formVeggies").hide();
    $(".formSides").show();
  });

  $(".formSides").submit(function(event){
    event.preventDefault();
    $("input:checkbox[name=sides]:checked").each(function(){
      var sides = $(this).val();
      userSides.push(sides);
    });
    $(".formSides").hide();
    $(".formDrinks").show();
  });

  $(".formDrinks").submit(function(event){
    event.preventDefault();
    $("input:checkbox[name=drinks]:checked").each(function(){
      var drinks = $(this).val();
      userDrinks.push(drinks);
    });

    //Create newOrder constructor with user inputs
    var newOrder = new Order(userSides, userDrinks);

    //Push newPizza constructor to pizza array in newOrder constructor
    newOrder.pizza.push(newPizza);

    //Call pizzaPrice() method to calculate price of user created pizza and store as newOrder.price
    newOrder.price = newPizza.pizzaPrice();

    //Call orderPrice() method to calculate total price of order
    newOrder.orderPrice();

    //Output total price and order details to screen
    $("#totalPrice").text(newOrder.price.toFixed(2));
    // $("ul").append("<li>" + newPizza + "</li>");



    newOrder.pizza.forEach(function(input){
      input.outputPizzaDetails();
    });

    for(var index = 0; index < newOrder.sides.length; index += 1){
      $("ul#resultsSides").append("<li>" + newOrder.sides[index] + "</li>");
    };

    for(var index = 0; index < newOrder.drinks.length; index += 1){
      $("ul#resultsDrinks").append("<li>" + newOrder.drinks[index] + "</li>");
    };

    // $("ul").append("<li>" + newOrder.sides + "</li>");
    // $("ul").append("<li>" + newOrder.drinks + "</li>");
    $(".formDrinks").hide();
    $("#buttons").hide();
    $(".results").show();
    $("#formStartOver").show();
  });

  $("#formStartOver").click(function(event){
    event.preventDefault();
    location.reload();
  });
});
