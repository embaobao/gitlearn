$("#loadBox").html('<div class="loading"><div class="inner one">	</div><div class="inner two"></div><div class="inner three"></div><p><small> Loading(CTE)...</small></p></div>');

function loadingShow(){
	$("#loadBox").fadeIn(1000, function() {});
}

function loadingHide(){
	$("#loadBox").fadeOut(1000, function() {});
}

$("#loadBox").hide();