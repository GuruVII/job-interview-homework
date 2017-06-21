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
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);
	var leftColumn = {};
	var rightColumn = {};
	var leftDiv = document.getElementById("left");
	var rightDiv = document.getElementById("right");

	var widgetInit = function widgetInit() {
	    for (var _key in twoColumnsObject) {
	        if (twoColumnsObject[_key]['position'] === "right") {
	            console.log("R test");
	            rightColumn[_key] = twoColumnsObject[_key];
	            rightDiv.innerHTML += "<div class=\"item\" id =\"" + _key + "\">" + rightColumn[_key].text + "</div>";
	        } else {
	            console.log("test");
	            leftColumn[_key] = twoColumnsObject[_key];
	            leftDiv.innerHTML += "<div class=\"item\" id =\"" + _key + "\">" + leftColumn[_key].text + "</div>";
	        }
	    }
	    console.log(leftColumn);
	};

	var createColumns = function createColumns() {
	    console.log(leftColumn);
	    leftColumn.forEach(function (currentValue) {
	        leftDiv.innerHTML += "<div class=\"item\" id =\"" + key + "\">" + key.text + "</div>";
	    });
	    rightColumn.forEach(function (currentValue) {
	        rightDiv.innerHTML += "<div class=\"item\">" + currentValue.text + "</div>";
	    });
	};

	//Object constructor that can accept an object of any size as an argument.
	function TwoColumns(items) {
	    for (var _key2 in items) {
	        this[_key2] = items[_key2];
	    }
	};

	var twoColumnsObject = new TwoColumns({
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
	    }
	});

	widgetInit();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);