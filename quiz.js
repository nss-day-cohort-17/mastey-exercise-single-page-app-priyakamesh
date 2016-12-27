
var inventory = [];
var carCard = "";
var descript=[];
var currentCarcardIndex ;
var colorName = "green"



loadInventory();
function loadInventory (callback) {
  var inventoryLoad = new XMLHttpRequest();
  inventoryLoad.addEventListener("load", populatePage);
  inventoryLoad.open("GET", "inventory.json");
  inventoryLoad.send();
}


function populatePage (e) {
   data= JSON.parse(e.target.responseText);
   for (var i = 0; i < data.cars.length; i++) {
   inventory[i]=data.cars[i];
   carCard += `<div id="carCard${[i]}" class="infoList col-md-3"><p>${inventory[i].make}</p>
                                                <p>(${inventory[i].model} ${inventory[i].year})</p>
                                                <p>$${inventory[i].price}</p>
                                                <p id ="descript${[i]}">${inventory[i].description}</p></div>`

 }
 document.getElementById("mainContent").innerHTML += carCard;
 activateEvents()

}

//event listener
 function activateEvents () {
  document.getElementById("input").addEventListener("click", function(){
      document.getElementById("input").value ="";
  } )
  for(var i=0; i < inventory.length; i++ ){
  document.getElementsByClassName("infoList")[i].addEventListener("click", (function (x) {
    return function(){
      changeValue(x,colorName)
      currentCarcardIndex = x
      console.log(x)
    }
  })(i))

 }
 kbevt()


 }

//function to reset to original values

function reset() {
  for (var i=0; i < mainContent.childNodes.length; i++){
    if (mainContent.childNodes[i].classList.contains("newClass")) {
      document.getElementById("carCard"+i).classList.remove("newClass")
      document.getElementById("carCard"+currentCarcardIndex).style.backgroundColor = "#f48042";

    }
  }
}


//function to change the background-color


// function to change the border thickness and background color

function changeValue (currentCarcardIndex, colorName) {
  reset()
  document.getElementById("carCard"+currentCarcardIndex).classList.toggle("newClass")
  document.getElementById("input").value = ""

  document.getElementById("input").focus()


  document.getElementById("carCard"+currentCarcardIndex).style.backgroundColor = colorName;

}
//keyboard event for editing the description

function kbevt () {

  document.getElementById("input").addEventListener("keyup", function (){
     descript[currentCarcardIndex] = inventory[currentCarcardIndex].description

      // console.log(currentCarcard)
      descript[currentCarcardIndex] = document.getElementById("input").value;

      document.getElementById("descript"+[currentCarcardIndex]).innerHTML= descript[currentCarcardIndex]


  })
}
