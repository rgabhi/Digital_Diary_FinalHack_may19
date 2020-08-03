setInterval(function(){
	circle();
},180);

var WW = $(window).width(),
	WH = $(window).height();
function circle(){
	var rand = _rand(10,200),
		left = _rand(-rand/2,WW-rand/2),
		top = _rand(-rand/2,WH-rand/2),
		circle = '<div class="circle" style="width:'+rand+'px;height:'+rand+'px;left:'+left+'px;top:'+top+'px;"></div>';
	
	$('body').append(circle);
}
function _rand(min,max){
	return Math.round(Math.random()*(max-min) + min);
}