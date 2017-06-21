/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	__webpack_require__(1);
	var twoColumnsObject = void 0;
	var otherColumnChildren = void 0;
	var leftDiv = document.getElementById("left");
	var rightDiv = document.getElementById("right");
	var moveLeft = document.getElementById("left-button");
	var moveRight = document.getElementById("right-button");
	var className = document.getElementsByClassName("item");
	var selectedItems = document.getElementsByClassName("selected");

	//Object constructor that can accept an object of any size as an argument.
	function TwoColumns(items) {
	    var _this = this;

	    for (var key in items) {
	        this[key] = items[key];
	    }
	    this.GetItemPosition = function (item) {
	        console.log("The current item position of " + _this[item].text + " is " + _this[item].position);
	        return _this[item].position;
	    };
	    this.Save = function () {
	        var save = JSON.stringify(_this);
	        localStorage.setItem("save", save);
	        alert("State saved!");
	    };
	    this.Restore = function () {
	        localStorage.setItem("save", null);
	        alert("Defaults restored");
	        location.reload();
	    };
	};

	//init function, which creates the object, sorts objects inside the object on their position, assigns them to the left or right column objects and inserts HTML code onto the page
	var widgetInit = function widgetInit() {
	    if (localStorage.getItem("save") != "null" && undefined) {
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
	    for (var key in twoColumnsObject) {
	        //checks every property of the twoColumnsObject to see, if it is an object
	        if (_typeof(twoColumnsObject[key]) == "object") {
	            if (twoColumnsObject[key]['position'] === "right") {
	                rightDiv.innerHTML += "<div class=\"item\" id =\"" + key + "\">" + twoColumnsObject[key].text + "</div>";
	            } else {
	                leftDiv.innerHTML += "<div class=\"item\" id =\"" + key + "\">" + twoColumnsObject[key].text + "</div>";
	            }
	        }
	    };
	    select();
	    moveElements(moveLeft, rightDiv, "right");
	    moveElements(moveRight, leftDiv, "left");
	    saveOrDefault("Save");
	    saveOrDefault("Restore");
	};

	var select = function select() {
	    //adds click event listeners to every element with the class "item"
	    Array.from(className).forEach(function (element) {
	        //removes the event listener in case it was placed on the element twice.
	        element.removeEventListener('click', selectFunction);
	        element.addEventListener('click', selectFunction);
	    });
	};

	var selectFunction = function selectFunction(e) {
	    var selectedDiv = document.getElementById(e.target.id);
	    //removes "selected class from all elements in the other column"
	    if (e.target.parentNode.id === "right") {
	        otherColumnChildren = leftDiv.children;
	    } else {
	        otherColumnChildren = rightDiv.children;
	    };
	    Array.from(otherColumnChildren).forEach(function (item) {
	        document.getElementById(item.id).classList.remove('selected');
	    });
	    //checks if ctrl key is beeing held    
	    if (e.ctrlKey) {
	        selectedDiv.classList.toggle('selected');
	    } else {
	        Array.from(className).forEach(function (element) {
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
	var moveElements = function moveElements(button, newPosition, positionString) {
	    var selected = void 0;
	    button.addEventListener('click', function (e) {
	        //checks if there are any items in the column with the selected class
	        if (selectedItems.length > 0) {
	            Array.from(selectedItems).forEach(function (element) {
	                selected = document.getElementById(element.id);
	                selected.parentNode.removeChild(selected);
	                twoColumnsObject[element.id]["position"] = positionString;
	                newPosition.innerHTML += "<div class=\"item\" id =\"" + element.id + "\">" + twoColumnsObject[element.id].text + "</div>";
	                twoColumnsObject.GetItemPosition(element.id);
	                select();
	            });
	        } else {
	            var currentPosition = void 0;
	            if (positionString == "right") {
	                currentPosition = "left";
	            } else {
	                currentPosition = "right";
	            }
	            alert("You have not selected any items in the " + currentPosition + " column. \n                Please select an item and try again");
	        }
	    });
	};

	var saveOrDefault = function saveOrDefault(action) {
	    document.getElementById(action).addEventListener('click', twoColumnsObject[action]);
	};

	widgetInit();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);