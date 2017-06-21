require('../scss/style.scss');
let leftColumn = {}
let rightColumn = {}
const leftDiv = document.getElementById("left");
const rightDiv = document.getElementById("right");

//init function, which 
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
    console.log(leftColumn);
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
