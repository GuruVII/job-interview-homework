require('../scss/style.scss');
let twoColumnsObject
let otherColumnChildren
const leftDiv = document.getElementById("left");
const rightDiv = document.getElementById("right");
const moveLeft = document.getElementById("left-button");
const moveRight = document.getElementById("right-button");
const className = document.getElementsByClassName("item");
const selectedItems = document.getElementsByClassName("selected");

//Object constructor that can accept an object of any size as an argument.
function TwoColumns(items){
    for (let key in items){
        this[key] = items[key]
    }
    this.GetItemPosition = (item) => {
        console.log(`The current item position of ${this[item].text} is ${this[item].position}`);
        return this[item].position;
    }
    this.Save = () => {
        let save = JSON.stringify(this);
        localStorage.setItem("save", save);
        alert("State saved!")
    }
    this.Restore = () => {
        localStorage.setItem("save", null);
        alert("Defaults restored")
        location.reload();
        
    }
};


//init function, which creates the object, sorts objects inside the object on their position, assigns them to the left or right column objects and inserts HTML code onto the page
let widgetInit = () => {
    if (localStorage.getItem("save") != "null"){
        twoColumnsObject = new TwoColumns(JSON.parse(localStorage.getItem("save")));
    } else {
        twoColumnsObject = new TwoColumns({
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
    }
    for (let key in twoColumnsObject){
        //checks every property of the twoColumnsObject to see, if it is an object
        if (typeof twoColumnsObject[key] == "object"){
            if (twoColumnsObject[key]['position'] === "right"){
                rightDiv.innerHTML += `<div class="item" id ="${key}">${twoColumnsObject[key].text}</div>`;

            } else {
                leftDiv.innerHTML += `<div class="item" id ="${key}">${twoColumnsObject[key].text}</div>`;      
            }
        }
    };
    select();
    moveElements(moveLeft, rightDiv, "right");
    moveElements(moveRight, leftDiv, "left");
    saveOrDefault("Save");
    saveOrDefault("Restore");
}

let select = () => {
    //adds click event listeners to every element with the class "item"
    Array.from(className).forEach(function(element) {
            //removes the event listener in case it was placed on the element twice.
            element.removeEventListener('click', selectFunction);
            element.addEventListener('click', selectFunction);
    });
}

let selectFunction = (e) => {
    let selectedDiv = document.getElementById(e.target.id)
    //removes "selected class from all elements in the other column"
    if (e.target.parentNode.id === "right"){
        otherColumnChildren = leftDiv.children;
    } else {
        otherColumnChildren = rightDiv.children;
    };
    Array.from(otherColumnChildren).forEach(function(item){
        document.getElementById(item.id).classList.remove('selected');
    });
    //checks if ctrl key is beeing held    
    if (e.ctrlKey){
        selectedDiv.classList.toggle('selected')
    } else {
        Array.from(className).forEach(function(element) {
            //this serves almost the same purpose as a classList.toggle, which cannot work in this case
            if (selectedDiv.classList.contains('selected') == true){
                selectedDiv.classList.remove('selected');
            } else {
                element.classList.remove('selected');
                selectedDiv.classList.add('selected');
            }
        })
    }             
}




//adds event listeners on move left and right buttons, which run a function that deletes the item in the first column
//and adds it in the other. It also changes the position in the twoColumnsObject
//in the end it runs a function that adds event listeners to the newlycreated buttons
let moveElements = (button, newPosition, positionString) =>{
    let selected
    button.addEventListener('click', (e) => {
        //checks if there are any items in the column with the selected class
        if (selectedItems.length > 0){
            Array.from(selectedItems).forEach(function(element) {
                selected = document.getElementById(element.id);
                selected.parentNode.removeChild(selected);
                twoColumnsObject[element.id]["position"] = positionString;
                newPosition.innerHTML += `<div class="item" id ="${element.id}">${twoColumnsObject[element.id].text}</div>`
                twoColumnsObject.GetItemPosition(element.id);
                select();
            })
        } else {
            let currentPosition 
            if (positionString == "right"){
                currentPosition = "left";
            } else {
                currentPosition = "right";
            }
            alert(`You have not selected any items in the ${currentPosition} column. 
                Please select an item and try again`)
        }
            })
    
}

let saveOrDefault = (action) => {
    document.getElementById(action).addEventListener('click', twoColumnsObject[action])
}

widgetInit();