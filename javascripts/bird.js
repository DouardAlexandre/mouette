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
			compteur.position.y = sprite.position.y;
			sprite.animation.changeFrame(1);
			//fall
			sprite.rotation += 3.2;
			//block fall angle
			if(sprite.rotation>66 ){
				sprite.rotation = 66;
			} 	
		
			//arrondi
			if( sprite.position.y > 560 && sprite.rotation >=41){
				
				sprite.rotation -= 3.9;
				

			}	
			

		}else{
			if(sprite.position.y < 80){
				sprite.animation.play();
				sprite.rotation = 0;
			} else {
				//sprite.animation.changeFrame(1);
				sprite.rotation = -40;
			}
			//spr.rotation = -40;
			//spr.rotation -= 1.3;

		}


        //block bottom
      /*  if(sprite.position.y > height-10) {
        	sprite.position.y = height-10;
        	sprite.velocity.y = 0;
        }*/
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