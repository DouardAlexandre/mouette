
var waterStream;
function Particule() {
 /* this.x = bird.x;
 this.y = bird.y;*/
  /*this.x = bird.x;
  this.y = bird.y;*/

  this.setup = function() {
    //createCanvas(400, 400);
    var object =
    {
      name: "test",
      colors: ["white"],
      lifetime: 90,
      angle: [200,300],
      size: [2,4],
      speed: 2,
      //ecart
      speedx: 0.25,
        //40 at .1 probability/step
        //then 200 steps at 10 particles/step
        rate: [15,0.5],
        x: 0.5,
        y: 0.5
      };
      waterStream = new Fountain(null, object);
    }


    this.show = function() {


      waterStream.Draw();
      var thisx = sprite.position.x -15;
      var thisy = sprite.position.y +20;
      waterStream.CreateN( thisx, thisy , 190);  
      waterStream.Step();
      

    }

    this.update = function() {
      push();
      particules.show();
      pop();


    }

  }

