'use strict';
(function(){
	
	
	// variables
	// ==================================================

	const theCanvas = document.getElementById('canvasEl');
	const ctx = theCanvas.getContext("2d");
	
	const main = {
		w: 800,
		h: 600,
		fps: 30
	}

	const paddle = {
		x: 10,
		y: 520,
		w: 100,
		h: 10,
		gap: 80
	}

	const ball = {
		x: 300,
		y: 300,
		r: 10,
		speedX: 3,
		speedY: 7
	}


	const bricks = {
		w: 80,
		h: 20,
		gap: 2,
		col: 10,
		row: 10,
		amount: 0
		
	}

	const bricksArr = new Array(bricks.col * bricks.row );

	let shiftX = 0;	
	let shiftY = 0;	


	// run start
	// ==================================================

	if(theCanvas && theCanvas.getContext){
		theCanvas.width = main.w;
		theCanvas.height = main.h;

		if(ctx){
			setInterval(
				function(){
					drawAll();
					moveBall();
				},
				1000 / main.fps
			);
			brickInit();

			theCanvas.addEventListener('mousemove', movePaddle)
		}
	}

	
	// functions
	// ==================================================


	function drawAll(){
		// draw field
		drawRect(0,0, main.w,main.h, 'black');

		// draw the paddle
		drawRect(paddle.x, paddle.y, paddle.w, paddle.h, 'white');

		// draw the ball
		drawCircle(ball.x, ball.y, ball.r, 'white')


		drawBricks();


	}

	// function debug(txt, x, y, color){
	// 	ctx.fillStyle = color;
	// 	ctx.fillText(txt, x, y);
	// }

	function movePaddle(e){
		shiftX = e.pageX - getCoord(theCanvas).left ;
		shiftY = e.pageY - getCoord(theCanvas).top;
		paddle.x = shiftX - paddle.w/2;

		function getCoord(elem){
			const box = elem.getBoundingClientRect();
			return {
            	left: box.left + pageXOffset,
            	top: box.top + pageYOffset
        	}
		}
	}


	function moveBall(){
		
		// left handle
		if( ball.x <= 0 && ball.speedX < 0.0){
			ball.speedX *= -1;
		}

		// right handle
		if(ball.x >= main.w && ball.speedX > 0.0){
			ball.speedX *= -1;
		}

		// top handle
		if(ball.y <=0 && ball.speedY < 0.0){
			ball.speedY *= -1;
		}
		
		// bottom handle
		if(ball.y >= main.h){
			ballReset();
		}


		// handle paddle with the ball
		biteTheBall();

		destroyBricks(); 

		ball.x += ball.speedX;
		ball.y += ball.speedY;
	}


	function biteTheBall () {
		if( ball.x < paddle.x + paddle.w &&
			ball.x > paddle.x &&
			ball.y >= paddle.y &&
			ball.y < paddle.y +paddle.h
		){
			ball.speedY *= -1;

			const center = paddle.x + paddle.w / 2;
			const ballDistFromPaddleCenter = ball.x - center;
			ball.speedX = ballDistFromPaddleCenter * .25;
		}

		if( bricks.amount === 0 ) {
			brickInit();
		}
	}



	function colRowToIndex(row, col){
		return row + bricks.col * col;	
	}

	function isBrickAtRowCol (col, row) {
		if(col >= 0 && col < bricks.col &&
			row >= 0 && row < bricks.row){
			const bricksCoord = colRowToIndex(col, row);
			return bricksArr[bricksCoord];
		}
		else{
			return false;
		}
	}
	
	function destroyBricks(){
		const brickCol = Math.floor(ball.x / bricks.w);
		const brickRow = Math.floor(ball.y / bricks.h);
		const brickUnderBall = colRowToIndex(brickCol, brickRow);
		// debug(brickCol+', '+brickRow+'-'+brickUnderBall, shiftX, shiftY, 'white');

		if( brickCol >= 0 && brickCol < bricks.col &&
			brickRow >= 0 && brickRow < bricks.row){

			if(isBrickAtRowCol(brickCol, brickRow)){
				bricksArr[brickUnderBall] = false;
				
				bricks.amount--;

				const prevBallX = ball.x - ball.speedX;
				const prevBallY = ball.y - ball.speedY;
				const prevBrickCol = Math.floor(prevBallX / bricks.w);
				const prevBrickRow = Math.floor(prevBallY / bricks.h);
				let bothTestFailed = true;


				if(prevBrickCol !== brickCol){
					if(isBrickAtRowCol(prevBrickCol, brickRow) === false ){
						ball.speedX *= -1;
						bothTestFailed = false;
					}
				}
				if(prevBrickRow !== brickRow){
					if(isBrickAtRowCol(brickCol, prevBrickRow) === false ){
						ball.speedY *= -1;
						bothTestFailed = false;
					}
				}
				if(bothTestFailed){
					ball.speedX *= -1;
					ball.speedY *= -1;
					
				}
			}
		}
	}



	function ballReset(){
		ball.x = 300;
		ball.y = 300;
		ball.speedX = 3;
		ball.speedY = 7;
	}

	function brickInit(){
		let i = 0;
		
		for( ; i < bricksArr.length ; i++ ){
			if(Math.random() >.5){
				bricksArr[i] = true;
				bricks.amount++;
			}
			else{
				bricksArr[i] = false;
			}
		}
	}


	

	function drawBricks(){
		for(let j = 0 ; j < bricks.row; j++ ){

			for ( let i = 0 ; i < bricks.col ; i++ ){
				const index = colRowToIndex(i,j)
				if(bricksArr[index]){
					drawRect(bricks.w * i, bricks.h * j, bricks.w - bricks.gap, bricks.h - bricks.gap, 'red' )
				}
			}
		}
	}


	function drawRect(x, y, w, h, color){
		ctx.fillStyle = color;
		ctx.fillRect(x,y, w,h);
	}


	function drawCircle(w,h,r,color){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(w,h,r,0,Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
	}



})();

