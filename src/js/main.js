require('../scss/style.scss');
let leftColumn = []
let rightColumn = []
const leftDiv = document.getElementById("left");
const rightDiv = document.getElementById("right");

let widgetInit = () => {
	for (let key in twoColumnsObject){
		if (twoColumnsObject[key]['position'] === "right"){
			rightColumn.push(twoColumnsObject[key])
		}
		else {
			leftColumn.push(twoColumnsObject[key])			
		}
	}
	createColumns();
}

let createColumns = () => {
	leftColumn.forEach(function(currentValue){
		leftDiv.innerHTML += `<div class="item">${currentValue.text}</div>`
	});
	rightColumn.forEach(function(currentValue){
		rightDiv.innerHTML += `<div class="item">${currentValue.text}</div>`
	});
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
