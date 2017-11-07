'use strict';

Module.register("getEvents", {

	result: {},
defaults: {
	updateInterval: 60000,
	url: 'http://medora.com/do/events',
	numberOfEnt: 13
},

//get css styles
getStyles: function() {
	return ["getEvents.css"];
},

// start function runs after defaults
start: function() {
	this.getData();
	this.scheduleUpdate();
},

getDom: function() {
	var wrapper = document.createElement("div");
	var large = document.createElement("div");
	var table = document.createElement("table");
	table.className = "small";

	var NumofEnt = this.config.numberOfEnt * 2;
	var count = 0;
	var events = this.result;
	large.innerHTML += "<table>"
	for(var i = 0; i < NumofEnt; i+=2){
		var row = document.createElement("tr");
		var dateCell = document.createElement("td");
		var nameCell = document.createElement("td");
		row.className = "colors";
		dateCell.className = "DCell";
		nameCell.className = "NCell";
		nameCell.innerHTML = this.result[i];
		dateCell.innerHTML = this.result[i + 1];
		row.appendChild(nameCell);
		row.appendChild(dateCell);
		table.appendChild(row);
	}
	large.appendChild(table);
	large.innerHTML += "</table>"

	wrapper.appendChild(large);
	return wrapper;
},

//updates data everytime updateInterval's limit is reached
scheduleUpdate: function(delay) {
	var nextLoad = this.config.updateInterval;
	if (typeof delay !== "undefined" && delay >= 0) {
		nextLoad = delay;
}

	var self = this;
	setInterval(function() {
		self.getData();
	}, 	nextLoad);
},

//gets data from the node_helper.js file
getData: function () {
	var url = this.config.url;
	this.sendSocketNotification('GET_DATA', url);
},

//data returned from node helper is processed
socketNotificationReceived: function(notification, payload) {
	if (notification === "DATA_RESULT") {
		this.result = payload;
		this.updateDom(self.config.fadeSpeed);
	}
},

});
