var greenButton = document.getElementsByClassName('btn-success')[0];;
var blueButton = document.getElementsByClassName('btn-primary')[0];
var redButton = document.getElementsByClassName('btn-danger')[0];
var orangeButton = document.getElementsByClassName('btn-warning')[0];
var print = document.getElementsByClassName('hours')[0];
var firstTime;
var secondTime;
var additionalTime = 0;
var interval;
var pauseInterval;
var timeForPrint;
var result;

blueButton.style.display = 'none';


function getTheTime(){
	var dateObj = new Date();
	var out = dateObj.getTime();
	return out;
};

function greenButtonPress(){
	orangeButton.style.display = 'block';
	blueButton.style.display = 'inline-block';
	greenButton.style.display = 'none';
	interval = setInterval(startTimer, 1);
	clearInterval(pauseInterval);
	if(!firstTime){
		firstTime = getTheTime();
	}
	else{
		firstTime = firstTime + secondTime;
	}
}

function startTimer(){
	var	currentTime = getTheTime();
	timeForPrint = currentTime - firstTime;
	additionalTime2 = currentTime - firstTime;

	var milSec = timeForPrint%1000;
	if(milSec < 10 ){
		milSec = '00' + milSec;
	}else if(milSec < 100){
		milSec = '0' + milSec;
	}
	timeForPrint -= milSec;
	timeForPrint = timeForPrint /1000;
	var sec = timeForPrint%60;
	if(sec < 10){
		sec = '0' + sec;
	}
	timeForPrint -= sec;
	timeForPrint = timeForPrint / 60;
	var min = timeForPrint%60;
	if(min < 10){
		min = '0' + min;
	}
	timeForPrint -= min;
	timeForPrint = timeForPrint / 60;
	var hours = timeForPrint%24;
	if(hours < 10){
		hours = '0' + hours;
	}
	print.innerHTML = hours+':'+min + ':' + sec + ':' + milSec;

	result = print.innerHTML = hours+':'+min + ':' + sec + ':' + milSec;

};

function addResult(){
	var wrap = document.getElementsByClassName('forResult')[0];
	var p = document.createElement('p');
	p.innerHTML = result;
	p.className = 'result';
	wrap.appendChild(p);
}

function stopTimer(){
	orangeButton.style.display = 'none';
	firstTime = 0;
	clearInterval(interval);
	blueButton.style.display = 'none';
	greenButton.style.display = 'inline-block';
	print.innerHTML = '00:00:00:000';
	var wrap = document.getElementsByClassName('forResult')[0];
	var p = document.getElementsByClassName('result');
	while(p[0]){
		wrap.removeChild(p[0]);
	};
}


function blueButtonPress(){
	clearInterval(interval);
	blueButton.style.display = 'none';
	greenButton.style.display = 'inline-block';
	pauseInterval = setInterval(pauseTimer, 1);
	additionalTime = getTheTime();
}

function pauseTimer(){
	secondTime = getTheTime() - additionalTime;
}


greenButton.addEventListener('click', greenButtonPress);
blueButton.addEventListener('click', blueButtonPress);
redButton.addEventListener('click', stopTimer);
orangeButton.addEventListener('click', addResult);