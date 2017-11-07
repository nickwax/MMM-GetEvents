var NodeHelper = require('node_helper');
var request = require('request');
var cheerio = require("cheerio");

module.exports = NodeHelper.create({
  start: function () {
    console.log('getEvents helper started...');
  },

	getInfo: function (url) {
		var self = this;
		var array = [];

		request(url, function (error, response, body) {
            if (!error) {
                var $ = cheerio.load(body);
                $('div.date').each(function(i, element){
					var name = $(this).prev();
					var date = $(this);
					array.push(name.text());
					array.push(date.text().trim());
				})
			}
		self.sendSocketNotification('DATA_RESULT', array);
	});

},

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_DATA') {
      this.getInfo(payload);
    }
  }

});
