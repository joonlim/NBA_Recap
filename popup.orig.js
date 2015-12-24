var title;
var url;

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

var init = function() {

	var date = new Date();

	var urlStart = "http://nba.cdn.turner.com/nba/big/channels/top_plays/";
	var urlEnd = ".nba_768x432_1404.mp4";

	var request;
	if(window.XMLHttpRequest)
	    request = new XMLHttpRequest();
	else
	    request = new ActiveXObject("Microsoft.XMLHTTP");

	while (true) {

		// manipulate date
		date.setDate(date.getDate() - 1);
		var day = date.getDate();
		var dayNum = day;
		if (dayNum.length == 1) {
			dayNum = "0" + dayNum;
		}
		var monthIndex = date.getMonth();
		var month = monthNames[monthIndex];
		var monthNum = String(Number.parseInt(monthIndex) + 1);
		if (monthNum.length == 1) {
			monthNum = "0" + monthNum;
		}
		var year = date.getFullYear();
		var titleStart = month + " " + day + ": Top ";

		// 2015/06/14/20150614-top10
		var urlDate = year + "/" + monthNum + "/" + dayNum + "/" + year + monthNum + dayNum + "-top";
		url = urlStart + urlDate + "10" + urlEnd;

		request.open('GET', url, false);
		request.send();
		if (request.status === 404) {
		    console.log(url + " failed.");

			// urlDate = year + "/" + 
			url = urlStart + urlDate + "5" + urlEnd;

			request.open('GET', url, false);
			request.send();
			if (request.status === 404) {
			    console.log(url + " failed.");
			    continue;
			} else {
				title = titleStart + "5";
				console.log(url + " success!");
				return;
			}
		} else {
			title = titleStart + "10";
			console.log(url + " success!");
			return;
		}
	}
}

$(function() {

	init();

	$("#title").text(title);

	$("#video-src").attr("src", url);
});
