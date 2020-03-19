var $textAreas = $("textarea");
var $saveBtns = $(".saveBtn");
var $hours = $(".hour");

var today = moment().format("dddd, MMMM Do YYYY")
var hour = moment().hour();


var inputObj = JSON.parse(localStorage.getItem("inputObj") || "{}");


init();

// Set date on screen
$("#currentDay").text(today);


// for loop cycling through inputObj and assigning values to matching ids in buttons
for(i=0;i<9;i++){
    var currentObjVals = inputObj["saveBtn"+i];
    var saveBtnIds = $saveBtns[i].id;
    var textAreaIds = $textAreas[i];
    
    textAreaIds.textContent = currentObjVals;
}


// CHECK FOR LOCAL DATA
function init() {
    //get stored scores from localStorage
    var storedObj = JSON.parse(localStorage.getItem("userObj"));

    //if info retrieved from local, update local array
    if (storedObj !== null) {
        inputObj = Object.assign(storedObj, inputObj);
    } else {
        return;
    }   
   
};

// SAVE CURRENT TEXT OF INPUT FIELD
$saveBtns.on("click", function(){
    // element variable for text area of clicked button
    var textInput = $(this.previousElementSibling).val();
    console.log(textInput);
    // element variable for the id of the button clicked
    var buttonId = this.id;

    // update inputObj at matching key value
    inputObj[buttonId] = textInput;

    // stringify and save inputbObj locally after udpating
    localStorage.setItem("userObj", JSON.stringify(inputObj));
})




// check time vs textarea data-time
$.each(($textAreas), function() {
  var timeData = this.getAttribute("data-time");
  console.log(this)
    if (parseInt(timeData) === hour){
        console.log(hour);
        console.log(timeData);
        $(this).removeClass("past future");
        $(this).addClass("present");
    }
      
        
    if(timeData < hour){
        $(this).removeClass("present future");
        $(this).addClass("past");
        console.log(hour);
        console.log(timeData);
    }

    if(timeData > hour){
        $(this).removeClass("past present");
        $(this).addClass("future");
    }
    })

