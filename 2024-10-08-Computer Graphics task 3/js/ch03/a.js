"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var direction = 1;
var speed = 50;

function changeDir(){
	direction *= -1;
}

function initRotSquare(){
	canvas = document.getElementById( "rot-canvas" );
	gl = canvas.getContext("webgl2");
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	var vertices = new Float32Array([
		 0,  0.5,  0,
		-0.5, -0.5,  0,
		 0.5, -0.5,  0,
		// 0, -1,  0
	]);

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation( program, "theta" );

	document.getElementById( "speedcon" ).onchange = function( event ){
		speed = 100 - event.target.value;
	}

	renderSquare();
}
function onKeyup(){
	if(event.which==87){
		if(speed>0){
			speed-=10;
			document.getElementById( "speedcon" ).value=100-speed;
		}
	}
	else if(event.which==83){
		if(speed<100){
			speed+=10;
			document.getElementById( "speedcon" ).value=100-speed;
		}
	}
	else if(event.which==68){
			direction=-1;
		}
	else if(event.which==65){
			direction=1;
		}	
	}
function renderSquare(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += direction * 0.1;
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 3 );

	// update and render
	setTimeout( function(){ requestAnimFrame( renderSquare ); }, speed );
}