require('../scss/style.scss');
let otherColumnChildren
const leftDiv = document.getElementById("left");
const rightDiv = document.getElementById("right");
const moveLeft = document.getElementById("left-button");
const moveRight = document.getElementById("right-button");
const className = document.getElementsByClassName("item");
const selectedItems = document.getElementsByClassName("selected");



//init function, which sorts objects on their position, assigns them to the left or rightcolumn objects and inserts HTML code onto the page
let widgetInit = () => {
    for (let key in twoColumnsObject){
        if (twoColumnsObject[key]['position'] === "right"){
            rightDiv.innerHTML += `<div class="item" id ="${key}">${twoColumnsObject[key].text}</div>`;

        }
        else {
            leftDiv.innerHTML += `<div class="item" id ="${key}">${twoColumnsObject[key].text}</div>`;		
        }
    };
    select();
    moveElements(moveLeft, rightDiv, "right");
    moveElements(moveRight, leftDiv, "left");
}

let select = () => {
    //adds click event listeners to every element with the class "item"
    Array.from(className).forEach(function(element) {
        element.addEventListener('click', (e) => {
            console.log("CLICK CLICK CLICK")
            //removes "selected class from all elements in the other column"
            if (e.target.parentNode.id === "right"){
                otherColumnChildren = leftDiv.children;
            }
            else {
                otherColumnChildren = rightDiv.children;
            };
            Array.from(otherColumnChildren).forEach(function(item){
                document.getElementById(item.id).classList.remove('selected');
            });
            //checks if ctrl key is beeing held
            //if it is you can add/remove the selected class from the elements with class "item"
            //if not, it removes the selected class from everything and gives it to one element
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

//Object constructor that can accept an object of any size as an argument.
function TwoColumns(items){
    for (let key in items){
        this[key] = items[key]
    }
};
//adds event listeners on move left and right buttons, which run a function that moves the items
function moveElements(button, newPosition, positionString){
     button.addEventListener('click', (e) => {
        Array.from(selectedItems).forEach(function(element) {
            let selected = document.getElementById(element.id);
            selected.parentNode.removeChild(selected);
            twoColumnsObject[element.id]["position"] = positionString;
            newPosition.innerHTML += `<div class="item" id ="${element.id}">${twoColumnsObject[element.id].text}</div>`
        })
        select();
        console.log(twoColumnsObject);
    })
    
}


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
    itemE: {
        text: "Item E",
        position: "right" 
    }
});


widgetInit();