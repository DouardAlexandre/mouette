var mouette; 
var sprite; 


function Bird() {

	this.y = 80;    
	this.x = 164;
	
	this.show = function() {


	}//ens show


	this.down = function() {
		sprite.velocity.y += 0.5;
		
	}

	this.up = function() {
		sprite.velocity.y -= 1;
	}


	this.update = function() {


		//limit up speed air resistance
		sprite.velocity.y *= 1;
		

		if (mouseIsPressed) {
			sprite.animation.changeFrame(1);
			sprite.rotation += 2.5;
			if(sprite.rotation>50){
				sprite.rotation = 50;
			} 	
			if(sprite.position.y > height-170){
				sprite.rotation -= 3.2;
				if(sprite.rotation<-10){
					sprite.rotation = -10;
				} 			
			}	
			if(sprite.position.y > height/2 && sprite.position.y < height-170 ){
				//sprite.rotation = 0;
				sprite.rotation += 5.5;
				if(sprite.rotation>40){
					sprite.rotation = 40;
				} 	
			}	

		}else{
			if(sprite.position.y < 80){
				sprite.animation.play();
				sprite.rotation = 0;
			} else {
				//sprite.animation.changeFrame(1);
				sprite.rotation = -30;
			}
			//spr.rotation = -40;
			//spr.rotation -= 1.3;

		}


        //block bottom
        if(sprite.position.y > height-10) {
        	sprite.position.y = height-10;
        	sprite.velocity.y = 0;
        }
		//block top
		if(sprite.position.y < 80) {
			sprite.position.y = 80;
			sprite.velocity.y = 0;
		}
		//if in water 
		if(sprite.position.y > height/2) {
			
			//velocity water
			sprite.velocity.y *= 0.8;


		/*	if (!mouseIsPressed && spr.position.y < water.y) {

				//spr.rotation = 1.3;

				
			}else if (mouseIsPressed && spr.position.y > water.y){
				spr.rotation -= 1.3;
			}else{
				//spr.rotation -= 1.3;
			}*/
		}

	}// end update
}// end Bird