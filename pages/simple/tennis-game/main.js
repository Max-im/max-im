(function(){
	
	
	const theCanvas = document.getElementById('canvasEl');
	const ctx = theCanvas.getContext("2d");
	
	const w = 800;
	const h = 600;
	const fps = 60;
	let showWinWindow = false;
	

	const score = {
		first: 0,
		second: 0,
		winScore: 3
	}
	
	const players = {
		height: 100,
		first: 100,
		second: 120,
		secondSpeed: 3
	}
	
	const ball = {
		x: 50,
		y: 50,
		speedX: 4,
		speedY: 2
	}
	

	if(theCanvas && theCanvas.getContext){
		
		theCanvas.width = w;
		theCanvas.height = h;

		if(ctx){
			
			setInterval(
				function(){
					drawAll();
					moveBall();
					cpuPlayerHandle();
					checkScore();
				},
				1000 / fps
			);




		}
	}

	document.addEventListener( 'keydown', movePlayer );
	theCanvas.addEventListener( 'mousemove', mouseControl );
	theCanvas.addEventListener( 'click', restart );


	function mouseControl(e){
        const shiftY = e.pageY - getCoord(theCanvas).top - players.height / 2;
        players.first = shiftY;
	}


	function getCoord(elem){
		const box = elem.getBoundingClientRect();
		return {
            top: box.top + pageYOffset,
        }
	}

	function cpuPlayerHandle() {
		if( ball.y < players.second ){
			players.second -= players.secondSpeed;
		}
		if( ball.y > players.second + players.height / 2 ){
			players.second += players.secondSpeed;
		}
		
	}

	function restart(){
		if(!showWinWindow) return;
		score.first = 0;
		score.second = 0;
		showWinWindow = false;
	}

	function movePlayer(e){
		const key = e.keyCode;
		let playerSpeed = 15;
		if( key !== 40 && key !== 38 ) return;
		
		// the top
		if( key === 40 || players.first <= 0 - players.height / 2 ){
			players.first += playerSpeed;
		}

		// the bottom
		if( key === 38 || players.first >= h + players.height / 2 ){
			players.first -= playerSpeed;
		}
	}

	function checkScore(){
		// first player lost the score
		if( ball.x <= 0 ){
			if( ball.y < players.first / 1.2 || ball.y > ( players.first + players.height) * 1.2 ){
				score.first++;
				ballReset();
			}
			else{
				let deltaY = ball.y - ( players.first + players.height / 2 );
				ball.speedY = deltaY * 0.35;
			}
		}

		// second player lost the score
		if( ball.x >= w ){
			if( ball.y < players.second /1.2 || ball.y > (players.second + players.height) *1.2){
				score.second++;
				ballReset();
			}
			else{
				let deltaY = ball.y - ( players.second + players.height / 2 );
				ball.speedY = deltaY * 0.35;
			}
		}



		// check winer score
		if( score.first >= score.winScore || score.second >= score.winScore ){
			showWinWindow = true;
		}
	}

	function ballReset(){
		ball.x = w / 2;
		ball.y = 0;
		ball.speedY = 2;
		ball.speedX *= -1;
	}

	function moveBall(){
		if(showWinWindow) {
			return;
		}

		// width handle
		if( ball.x > w || ball.x < 0){
			ball.speedX *= -1;
		}
		ball.x += ball.speedX;		

		// height handle
		if( ball.y > h || ball.y < 0){
			ball.speedY *= -1;
		}
		ball.y += ball.speedY;		
	}



	function drawAll(){

		// draw winer window
		if(showWinWindow) {
			drawRect({ sX: 0, sY: 0, fX: w,	fY: h, color: 'black' });
			const winer = score.first >= score.winScore ? 'RIGHT' : 'LEFT';
			drawText({ x: 100, y: 100, el: `The winer is ${winer} player!` });

			drawText({ x: 100, y: 200, el: `click for restart` });
			ballReset();
			return;
		}

		// draw the field
		drawRect({ sX: 0, sY: 0, fX: w,	fY: h, color: 'black' });

		// draw middle line
		for(let i = 0; i < h ; i += 20){
			drawRect({ sX: w/2-1, sY: 10, fX: 2, fY: i, color: 'white' });
		}

		// draw first player
		drawRect({ sX: 0, sY: players.first, fX: 10, fY: players.height, color: 'white' });
	
		// draw second player
		drawRect({ sX: w-10, sY: players.second, fX: 10, fY: players.height, color: 'white' });

		// draw the ball
		drawCircle({ x: ball.x, y: ball.y, radius: 10, color: 'white' });

		// draw first player score
		drawText({ x: 100, y: 100, el: score.first });
		

		// draw second player score
		drawText({ x: w - 100, y: 100, el: score.second });

	}


	function drawRect(obj){
		ctx.fillStyle = obj.color;
		ctx.fillRect(obj.sX, obj.sY, obj.fX, obj.fY);	
	}

	function drawCircle(obj){
		ctx.beginPath();
		ctx.fillStyle = obj.color;
		ctx.arc(obj.x, obj.y, obj.radius, Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
	}

	function drawText(obj){
		ctx.fillStyle = '#fff';
		ctx.font = '30px Arial';
		ctx.fillText(obj.el, obj.x, obj.y);
	}

})();

