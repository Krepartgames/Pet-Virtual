var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastMealTime;
var feed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed Dog");
  feed.position(950,350);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  fill("white")

  //write code to read fedtime value from the database 
  database.ref("lastMeal").on("value",function(data){
    lastMealTime = data.val()
  })
 
  //write code to display text lastFed time here
  if(lastMealTime !== undefined){
    text("last Meal: "+ lastMealTime + "H",300,25)
  }
  
  text("Stock: "+ foodS,400, 25)
   
  if(foodS <= 0){
    foodS = 0
    database.ref('/').update({
      Food:foodS,
    })
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodS--;
  lastMealTime = hour()
  database.ref('/').update({
    Food:foodS,
    lastMeal: lastMealTime
  })


  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
