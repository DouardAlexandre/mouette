


var water;
var bird;
var pipes =[];
var clouds;
var pipe;
var mouette;
var sprite;
var particules;
var cloud;
var sky;
var parallax;
var wave;
var sea,sea2, sea3;

function preload() {

	sky = loadImage("images/sky.png");
	mouette = loadAnimation("images/mouette001.png", "images/mouette002.png", "images/mouette003.png");
	nuage = loadAnimation("images/cloud000.png", "images/cloud004.png");
	wave = loadImage("images/sea001.png");
	wave2 = loadImage("images/sea002.png");
	wave3 = loadImage("images/sea003.png");
	wave4 = loadImage("images/sea004.png");
	plant = loadImage("images/seaweed.png");
	
}

function setup() {

	createCanvas(1200, 600);
	water = new Water();
	clouds = new Group();
	plants = new Group();

	//sky scroll
	parallax = createSprite(0,0);
	parallax2 = createSprite(width,0);
	parallax.addImage(sky);
	parallax2.addImage(sky);

    //sea
    sea3 = createSprite(width,height/1.20);
    sea2 = createSprite(width,height/1.3);
    sea = createSprite(width,height/1.34);
    sea3.addImage(wave3);
    sea2.addImage(wave2);
    sea.addImage(wave);
    
    //seaweed
    var seaweed = createSprite(width,height/1.20);
    seaweed.addImage(plant);

    //assign sprite plant to plants
    for(var i = 0; i<5; i++) {
    	var seaweed = createSprite(width+random(3000),(height-random(height/5)), 148, 94);
    	seaweed.addImage(plant);
    	plants.add(seaweed);

    }
	//assign sprite cloud to clouds
	for(var i = 0; i<5; i++) {
		var spriteCloud = createSprite(width+random(2000), random(height/4), 172, 67);
		spriteCloud.addAnimation("default", nuage);
		//spriteCloud.scale = random(0.9);
		clouds.add(spriteCloud);
		
	}


	//pipes.push(pipe);
	
	//bird
	bird = new Bird();
	sprite = createSprite(bird.x, bird.y);
	sprite.addAnimation("default", mouette);
	//particules bird
	particules = new Particule();
	particules.setup();
	//opacity wave
	sea4 = createSprite(width,height/1.34);
	sea4.addImage(wave4);
}


function draw() {
	//background(52, 152, 219);
	water.update();
	water.show();
	drawSprites(clouds);

	//sky scroll
	parallax.position.x -= 1.5;
	parallax2.position.x -= 1.5;
	if(parallax.position.x === -width){
		parallax.position.x = 0;
		parallax2.position.x = width;
	}

    //sea waves
    sea.position.x -= 2;
    sea4.position.x -= 2;

    sea2.position.x -= 1.5;

    sea3.position.x -= 1.2;

    if(sea.position.x <= 0){
    	sea.position.x = width;
    }
    if(sea2.position.x <= 0){
    	sea2.position.x = width;  	
    }
    if(sea3.position.x <= 0){
    	sea3.position.x = width;  	
    }
    if(sea4.position.x <= 0){
    	sea4.position.x = width;  	
    }


    //seaweeds
    for(var i = 0; i < plants.length; i++) {
	 
	  	if(plants[i].position.x < -50) {
	  		plants[i].position.x = width;
	  	}
	  	if (sprite.position.y > water.y) {		
	  		plants[i].position.x -= 12;
	  	} else {
	  		  //move left
	  		plants[i].position.x -= 3;
	  	}
	  	
	  }
	//clouds
	for(var i = 0; i < clouds.length; i++) {
	    //move left
	    clouds[i].position.x -= 2.5;
	  	//overflow left
	  	if(clouds[i].position.x < -100) {
	  		clouds[i].position.x = width;
	  	}
	  	
	  }
	  bird.update();
	  drawSprites();
	//bird in water
	if(sprite.position.y > (water.y -20)) {
		particules.show();
		particules.update();
	//bird in sky	
} else {
	waterStream.Draw();
	waterStream.Step();
}
    
    if (mouseIsPressed) {
    	bird.down();
    	
    }else{
    	bird.up();
    }


}//end draw


