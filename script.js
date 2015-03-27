/**
 * @author  tatocaster <tatocaster.me>
 * @description Random Walker
 */

'use strict';
(function(document,window){

	var Walker, draw;

	draw   = function(x1,y1,x2,y2,color){

		if(arguments.length < 5){
			console.error('Not enough parameters');
			return false;
		}

		var ctx = Walker.context;
		ctx.beginPath();
		ctx.strokeStyle = color || Walker.color;
		ctx.lineWidth = Walker.lineWidth;
		ctx.lineJoin = 'round';
	    ctx.lineCap = 'round';
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.closePath();
		ctx.stroke();
	}

	Walker = {
		color : "blue",
		x	: 0,
		y	: 0,
		lineWidth : 15,
		t : null,

		init : function(){

			var canvas, context;

			canvas = document.getElementById("canvas");
			context = canvas.getContext("2d");
			this.canvas = canvas;
			this.context = context;
			this.x = canvas.width / 2;
			this.y = canvas.height / 2;

			this.t = setInterval(function(){Walker.randomWalk()}, 20);

		},
		randomWalk : function(){

			var r,
			color,
			prev_x = this.x,
			prev_y = this.y;

			if( (this.x > 0 && this.x < this.canvas.width) && (this.y > 0  && this.y < this.canvas.height) ){

				r = this.getRandom(0,1);
				color = this.getRandomColor();

				// here we can control probability
				if(r < 0.3){
				  this.x++;
				}else if (r < 0.6){
				  this.x--;
				}else if (r < 0.8){
				  this.y++;
				}else{
				  this.y--;
				}
				draw(prev_x,prev_y,this.x,this.y,color);

				prev_x = this.x;
				prev_y = this.y;

			}else{
				clearInterval(this.t);
			}

		},

		getRandom : function (min, max) {
	  		return Math.random() * (max - min) + min;
		},

		getRandomColor : function() {
			// we can restrict letters and set warm colors and etc.
		    var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.floor(Math.random() * 16)];
		    }
		    return color;
		}

	};


	window.Walker = Walker;
})(document,window);

document.addEventListener("DOMContentLoaded", function(event) {
   Walker.init();
 });
