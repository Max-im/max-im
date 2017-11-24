function tabs(){
	var element = document.getElementsByClassName('tab');
	// console.log(element.length);
	var i = 0;
	var div = document.getElementsByClassName('content');
	for(i; i < element.length; i++){
		console.log(element[i].className);

		if(element[i].className == 'tab active'){
			div[i].style.display = 'block';
		}
	}
}



function delClass(){
	var element = document.getElementsByClassName('tab');
	var j = 0;
	var div = document.getElementsByClassName('content');
	for(j; j < element.length; j++){
		element[j].className = element[j].className.replace(" active", "");
		div[j].style.display = 'none';
	} 
}

function setActive(){
	delClass();
	this.classList.add('active');
	tabs();
}

var button1 = document.getElementById('t1');
var button2 = document.getElementById('t2');
var button3 = document.getElementById('t3');

button1.addEventListener('click', setActive);
button2.addEventListener('click', setActive);
button3.addEventListener('click', setActive);







var showingTooltip;

document.onmouseover = function(e) {
	var target = e.target;

	var tooltip = target.getAttribute('data-tooltip');
	if (!tooltip) return;
	
	var tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltip;
    document.body.appendChild(tooltipElem);

    var coords = target.getBoundingClientRect();

    // var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    // var left = 350;
    // if (left < 0) left = 0; // не вылезать за левую границу окна

    var top = coords.top - tooltipElem.offsetHeight + 35;
    if (top < 0) { // не вылезать за верхнюю границу окна
    	top = coords.top + target.offsetHeight + 5;
    }

    tooltipElem.style.left = 350 + 'px';
    tooltipElem.style.top = top + 'px';

    showingTooltip = tooltipElem;
};

document.onmouseout = function(e) {

    if (showingTooltip) {
        document.body.removeChild(showingTooltip);
        showingTooltip = null;
    }

};

