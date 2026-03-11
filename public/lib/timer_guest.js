localStorage['item'] = 10;

timerW();

function timerW()
{
	var interval_to_save = setInterval(function () {
    localStorage['item']--;
    console.log(localStorage['item']);
    if (localStorage['item'] == 0) {
		clearInterval(interval_to_save);
		window.location.href = "/"; 
    }
}, 1000);
}