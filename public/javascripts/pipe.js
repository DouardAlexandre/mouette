function Pipe() {
	//this.top = random(height/2);
	this.bottom = random(height/2);
	this.x = width;
	this.y = height;
	this.w = 40;
	this.speed = 4;
	//this.highlight = false;


	
	this.hits = function(bird) {
		/*if (bird.y < this.top || bird.y > height - this.bottom) {
			if(bird.x > this.x && bird.x < this.x + this.w) {
				this.highlight = true;
				return true;
			}
			return true;
		}
		this.highlight = false;
		return false;
	}
*/}
this.show = function() {
	push();
	fill(255);
		/*if(this.highlight) {
			fill(255, 0, 0);
		}*/
		//rect(this.x, 0, this.w,this.top);
		rect(this.x, this.y, this.w,this.bottom);
		noStroke();
		pop();
	}
	this.update = function() {
		this.x -= this.speed;
	}
	this.offscreen = function() {
		if(this.x < -this.w) {
			return true;
		} else {
			return false;
		}
	}
}