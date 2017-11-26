function Water() {
	//this.x = 0;
	this.y = height/3;
	this.w = width;
	this.h = height - this.y;
	this.highlight = false;

	this.show = function() {
		fill(41, 128, 185);
		if(this.highlight) {
			//fill(26, 188, 156);
		}
		noStroke();
		rect(0, this.y, this.w, this.h);
		
	}



	this.hits = function(bird) {

	}

	this.update = function(pipes) {
		if (bird.y > water.y) {		
			this.highlight = true;
			//pipes.speed = 4;
			return true;
		}
		this.highlight = false;
		return false;	
	}// end update
}