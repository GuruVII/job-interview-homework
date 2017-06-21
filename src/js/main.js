require('../scss/style.scss');
let leftColumn = {}
let rightColumn = {}
const leftDiv = document.getElementById("left");
const rightDiv = document.getElementById("right");
const className = document.getElementsByClassName("item");



//init function, which sorts objects on their position, assigns them to the left or rightcolumn objects and inserts HTML code onto the page
let widgetInit = () => {
    for (let key in twoColumnsObject){
        if (twoColumnsObject[key]['position'] === "right"){
            console.log("R test")
            rightColumn[key] = twoColumnsObject[key]
            rightDiv.innerHTML += `<div class="item" id ="${key}">${rightColumn[key].text}</div>`

        }
        else {
            console.log("test")
            leftColumn[key] = twoColumnsObject[key]
            leftDiv.innerHTML += `<div class="item" id ="${key}">${leftColumn[key].text}</div>`			
        }
    }
    //looks for click on element with the class "item"
    Array.from(className).forEach(function(element) {
        element.addEventListener('click', (e) => {

            if (e.ctrlKey){
                document.getElementById(e.target.id).classList.toggle('selected')
            }
            else {
                Array.from(className).forEach(function(element) {
                element.classList.remove('selected')
                document.getElementById(e.target.id).classList.add('selected')
            })

            }            
        });
    });
}

var select = function() {
    console.log("id")
}

//Object constructor that can accept an object of any size as an argument.
function TwoColumns(items){
    for (let key in items){
        this[key] = items[key]
    }
};



let twoColumnsObject = new TwoColumns({
    itemA: {
        text: "Item A",
        position: "left"
    },
    itemB: {
        text: "Item B",
        position: "left"
    },
    itemC: {
        text: "Item C",
        position: "left"
    },
    itemD: {
        text: "Item D",
        position: "right"
    },
});


widgetInit();