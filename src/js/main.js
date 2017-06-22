require('../scss/style.scss');
let twoColumnsObject;
let otherColumnChildren;
const leftDiv = document.getElementById('left');
const rightDiv = document.getElementById('right');
const moveLeft = document.getElementById('left-button');
const moveRight = document.getElementById('right-button');
const className = document.getElementsByClassName('item');
const selectedItems = document.getElementsByClassName('selected');

//OBJECT CONSTRUCTOR that can accept an object of any size as an argument.
function TwoColumns(items) {
    for (let key in items) {
        this[key] = items[key];
    }
    this.GetItemPosition = (item) => {
        console.log(`The current item position of ${this[item].text} is ${this[item].position}`);
        return this[item].position;
    };
    this.Save = () => {
        let save = JSON.stringify(this);
        localStorage.setItem('save', save);
        alert('State saved!');
    };
    this.Restore = () => {
        localStorage.removeItem('save');
        alert('Defaults restored');
        location.reload();

    };
}


//INIT FUNCTION, which creates the object, sorts objects inside the object on their position, assigns them to the left or right column objects and inserts HTML code onto the page
const widgetInit = () => {
    if (localStorage.getItem('save') != undefined) {
        twoColumnsObject = new TwoColumns(JSON.parse(localStorage.getItem('save')));
    } else {
        twoColumnsObject = new TwoColumns({
            itemA: {
                text: 'Item A',
                position: 'left'
            },
            itemB: {
                text: 'Item B',
                position: 'left'
            },
            itemC: {
                text: 'Item C',
                position: 'left'
            },
            itemD: {
                text: 'Item D',
                position: 'right'
            },
            itemE: {
                text: 'Item E',
                position: 'right'
            }
        });
    }
    for (let key in twoColumnsObject) {
        //checks every property of the twoColumnsObject to see, if it is an object
        if (typeof twoColumnsObject[key] == 'object') {
            if (twoColumnsObject[key]['position'] === 'right') {
                rightDiv.innerHTML += `<div class="item" id ="${key}">${twoColumnsObject[key].text}</div>`;

            } else {
                leftDiv.innerHTML += `<div class="item" id ="${key}">${twoColumnsObject[key].text}</div>`;
            }
        }
    }
    select();
    //where it will move, id of current DIV and current position
    moveElements(moveLeft, rightDiv, 'right');
    moveElements(moveRight, leftDiv, 'left');
    addEventListenerForAction('Save');
    addEventListenerForAction('Restore');
};

const select = () => {
    //adds click event listeners to every element with the class "item"
    Array.from(className).forEach(function(element) {
        //removes the event listener in case it was placed on the element twice.
        element.removeEventListener('click', selectFunction);
        element.addEventListener('click', selectFunction);
    });
};

const selectFunction = (e) => {
    const selectedDiv = document.getElementById(e.target.id);
    //removes "selected class from all elements in the other column"
    if (e.target.parentNode.id === 'right') {
        otherColumnChildren = leftDiv.children;
    } else {
        otherColumnChildren = rightDiv.children;
    }
    Array.from(otherColumnChildren).forEach(function(item) {
        document.getElementById(item.id).classList.remove('selected');
    });
    //checks if ctrl key is beeing held
    if (e.ctrlKey) {
        selectedDiv.classList.toggle('selected');
    } else {
        Array.from(className).forEach(function(element) {
            //this serves almost the same purpose as a classList.toggle, which cannot work in this case
            if (selectedDiv.classList.contains('selected') == true) {
                selectedDiv.classList.remove('selected');
            } else {
                element.classList.remove('selected');
                selectedDiv.classList.add('selected');
            }
        });
    }
};




//adds event listeners on move left and right buttons, which run a function that deletes the item in the first column
//and adds it in the other. It also changes the position in the twoColumnsObject
//in the end it runs a function that adds event listeners to the newlycreated buttons
const moveElements = (button, newPosition, positionString) => {
    //we check if selectedItems exists and then check if what is inside is infact in selected in the correct column
    const errorCatching = () => {
        if (selectedItems[0] != undefined) {
            if (twoColumnsObject[selectedItems[0].id].position != positionString) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    button.addEventListener('click', () => {
        let selected;
        //an addition to the errorCatching function, we also check if there is anything in selectedItems
        if (errorCatching() && selectedItems.length > 0) {
            Array.from(selectedItems).forEach(function(element) {
                selected = document.getElementById(element.id);
                selected.parentNode.removeChild(selected);
                twoColumnsObject[element.id]['position'] = positionString;
                newPosition.innerHTML += `<div class="item" id ="${element.id}">${twoColumnsObject[element.id].text}</div>`;
                twoColumnsObject.GetItemPosition(element.id);
                select();
            });
        } else {
            let currentPosition;
            if (positionString == 'right') {
                currentPosition = 'left';
            } else {
                currentPosition = 'right';
            }
            alert(`You have not selected any items in the ${currentPosition} column. 
                Please select an item and try again`);
        }
    });

};
const addEventListenerForAction = (action) => {
    document.getElementById(action).addEventListener('click', twoColumnsObject[action]);
};

widgetInit();