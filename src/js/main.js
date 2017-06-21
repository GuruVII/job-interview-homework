require('../scss/style.scss');
let otherColumnChildren
const leftDiv = document.getElementById("left");
const rightDiv = document.getElementById("right");
const moveLeft = document.getElementById("left-button");
const moveRight = document.getElementById("right-button");
const className = document.getElementsByClassName("item");
const selectedItems = document.getElementsByClassName("selected");



//init function, which sorts objects inside the object on their position, assigns them to the left or rightcolumn objects and inserts HTML code onto the page
let widgetInit = () => {
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
}

let select = () => {
    //adds click event listeners to every element with the class "item"
    Array.from(className).forEach(function(element) {
            element.addEventListener('click', (e) =>{
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
                document.getElementById(e.target.id).classList.toggle('selected')
            } else {
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
    this.getItemPosition = function(item){
        console.log(this[item].position);
    }
    this.Save = function(){
        let save = JSON.stringify(this);
        localStorage.setItem("saved", save);
    }
};
//adds event listeners on move left and right buttons, which run a function that deletes the item in the first column
//and adds it in the other. It also changes the position in the twoColumnsObject
//in the end it runs a function that adds event listeners to the newlycreated buttons
function moveElements(button, newPosition, positionString){
    let selected
    button.addEventListener('click', (e) => {
        if (selectedItems.length > 0){
            Array.from(selectedItems).forEach(function(element) {
                selected = document.getElementById(element.id);
                selected.parentNode.removeChild(selected);
                twoColumnsObject[element.id]["position"] = positionString;
                newPosition.innerHTML += `<div class="item" id ="${element.id}">${twoColumnsObject[element.id].text}</div>`
                twoColumnsObject.getItemPosition(element.id)
                //this adds an event listener that adds Selected clas upon clicking the item
                selected.addEventListener('click', (e) => {
                    if (positionString == "right"){
                        otherColumnChildren = leftDiv.children;
                    } else {
                        otherColumnChildren = rightDiv.children;
                    }
                    Array.from(otherColumnChildren).forEach(function(item){
                        document.getElementById(item.id).classList.remove('selected');
                    });
                    if (e.ctrlKey){
                        document.getElementById(e.target.id).classList.toggle('selected')
                    } else {
                        Array.from(className).forEach(function(element) {
                            element.classList.remove('selected')
                            document.getElementById(e.target.id).classList.add('selected')
                        })
                    }
                })
            })


            select();

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