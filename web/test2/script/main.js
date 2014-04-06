var scrollBar, player, map, eventList;


$(function () {
	initModules();

	scrollBar = new ScrollBar();
	player = new Player();
	map = new Map();
	eventList = new EventList();

	scrollBar.on('drag',      function () { player.setTimeIndex(scrollBar.getTimeIndex()); })
	scrollBar.on('dragStart', function () { player.stop(); })
	scrollBar.on('dragEnd',   function () { player.stop(); })

	player.on('change', function () { scrollBar.setTimeIndex(player.getTimeIndex()); })
	player.on('change', function () { $('#infoText').html(formatDate(player.getTimeStamp())); })
	player.on('change', function () { map.redraw(); })
	player.on('change', function () { eventList.redraw(); })

	player.on('start', function () { $('#playPauseButtons').addClass(   'paused'); })
	player.on('stop',  function () { $('#playPauseButtons').removeClass('paused'); })

	$('#playButton' ).click(function () { player.start(); })
	$('#pauseButton').click(function () { player.stop();  })

	player.start();
})

function formatDate(value) {
	var d = new Date(value);
	d = ''+
		d.getDate() + '.' +
		(d.getMonth()+1) + '.' +
		d.getFullYear() + '<br>' +
		d.getHours() + ':' +
		(100+d.getMinutes()).toFixed().substr(1);
	return d;
}


function formatTime(value) {
	var d = new Date(value);
	d = ''+
		d.getHours() + ':' +
		(100+d.getMinutes()).toFixed().substr(1) + ':' +
		(100+d.getSeconds()).toFixed().substr(1);
	return d;
}