
function Water() {

    this.color 		= 'rgb(0,0,0)';		// Surface color
    this.nNodes 	= 30;				// Number of nodes
	this.kf			= 0.550;			// force transfer factor ( mouse interaction and surface )
    this.kp			= 0.300;			// Speed propagation factor
	this.kr			= 0.985;			// Force resistance factor
	this.wo			= 0;
	this.ho			= 0;
	this.lastColor	= undefined;
	this.dxNode		= 0;
	this.mouse		= { x:0 , y:0 , xo:undefined , yo:undefined , limit:50 }
	this.mouseX		= 0;
	this.mouseY		= 0;
	this.x			= new Array();
	this.y			= new Array();
	this.y0			= new Array();
	this.x0			= new Array();
	this.vy			= new Array();
	this.vx			= new Array();
	this.canvas		= document.getElementById('defaultCanvas0');
	//this.ctx		= this.canvas.getContext('2d');
  
	this.timer;
	}


Water.prototype = {

	init: function() {
		
		//this.resizeScreen();
		
		// reset nodes
		var n = this.nNodes;
		//var timer = 0;
		for (var n = 0; n <= this.nNodes; ++n)
			{	
            this.x[n]	= this.dxNode * n;
            this.y[n]	= this.ho/2;

            this.x0[n]	= this.x[n];
            this.y0[n]	= this.y[n];

		    this.vx[n]	= 5*Math.random()-2.5;
            this.vy[n]	= 5*Math.random()-2.5;
	        }

		this.timer = interval(function(self) { self.loop(); }, 30, this);


		$('#defaultCanvas0').bind('mousemove', { obj:this }, function(e) {
		  
			e.data.obj.mouseX = e.pageX;
			e.data.obj.mouseY = e.pageY;

			//action
			e.data.obj.action();
			});
	    },
		
	loop: function() {
	
		if (this.mouse.xo==undefined) { this.mouse.xo = this.mouseX;this.mouse.yo = this.mouseY; }

		var dx = this.mouseX - this.mouse.xo;
		var dy = this.mouseY - this.mouse.yo;
	
        this.mouse.x = Math.max( Math.min( dx, this.mouse.limit ), -this.mouse.limit );
        this.mouse.y = Math.max( Math.min( dy, this.mouse.limit ), -this.mouse.limit );

        this.nodeTransfer();
        this.nodeMove();
        this.nodeDraw();


        this.mouse.xo	= this.mouseX;
        this.mouse.yo	= this.mouseY;
		},


    nodeTransfer: function () {

		var n 	= 0;
		var dvx	= 0;
		var dvy	= 0;

        for (n=0;n<=this.nNodes;n++)
	        {
			// Node force propagation
			if		(n==0)				{ dvx = this.x[n + 1] - this.x[n];						dvy = this.y[n + 1] - this.y[n];						}
			else if	(n == this.nNodes)	{ dvx = this.x[n - 1] - this.x[n];						dvy = this.y[n - 1] - this.y[n];						}
			else						{ dvx = this.x[n + 1] + this.x[n - 1] - 2 * this.x[n];	dvy = this.y[n + 1] + this.y[n - 1] - 2 * this.y[n];	}

			// propagation factor
            dvy *= this.kp;
            dvx *= this.kp;
			
			// atenuation factor
            this.vx[n] = (this.vx[n] + dvx) * this.kr;
            this.vy[n] = (this.vy[n] + dvy) * this.kr;
			}
	    },

	nodeMove: function() {

		var n = 0;

        for (n=0;n<=this.nNodes;n++)
	        {
            this.y[n]	= this.y[n]	 + this.vy[n];
			
		
	
			
            this.vy[n]	= this.vy[n] + (this.y0[n] - this.y[n]) / 100;	// Force to return to the Y original position
			
            if (n != 0 && n!=this.nNodes)
	            {
                this.x[n]	= this.x[n]  + this.vx[n];
                this.vx[n]	= this.vx[n] + (this.x0[n] - this.x[n]) / 100;	// Force to return to the X original position
	            }
			else
				{
				this.vx[n] = 0;
				}
			}
	    },
		
    nodeDraw: function() {

		var n = 0;

		this.clearRect ( 0 ,0 , this.wo , this.ho );
		this.beginPath();
		this.fillStyle = 'rgb(1,1,1)';
		this.moveTo(this.x[0], this.ho);
		this.moveTo(this.x[0], this.y[0]);
        this.lineTo((this.x[0] + this.x[1]) / 2, (this.y[0] + this.y[1]) / 2 );

        for (n=1;n<this.nNodes;n++)
			this.quadraticCurveTo(this.x[n], this.y[n], (this.x[n] + this.x[n + 1]) / 2, (this.y[n] + this.y[n + 1]) / 2);

        this.lineTo(this.x[this.nNodes], this.y[this.nNodes] );
        this.lineTo(this.wo, this.ho);
        this.lineTo(0, this.ho);
		
		this.closePath();
	    this.stroke();
		
		this.fill();
		},

    action: function() {

		var c = this.getImageData(this.mouseX, this.mouseY, 1, 1).data;
		var newColor = c[0];

		if (this.lastColor==undefined)
			{
			this.lastColor = newColor;
			return;
			}

		if (this.lastColor != newColor) {

			var n			= 0;
			var closeNode	= Math.round(this.mouseX / this.dxNode);			// Closest node to our mouse interaction
			var yStrong		= Math.ceil(Math.abs(this.mouse.y)/20);		// Strong of the y movement
			var yNoise		= Math.abs(this.mouse.y / 8) + 3;			// Strong of the Random Noise movement proportional
	
			if (yStrong==0) return;
	
			for (n=0;n<=this.nNodes;n++)
				{
				var yRandNoise	= Math.random() * yNoise - yNoise/2;
				var nodeDist	= Math.abs(closeNode - n);
				
				var theta		= Math.max((yStrong - nodeDist) / yStrong, 0) * Math.PI - Math.PI/2;
				var yRange		= (Math.sin(theta) + 1)/2;
			 
				var dv			= this.kf * this.mouse.y * yRange + yRandNoise;
				
				this.vy[n]		= this.vy[n] + dv;
				this.vx[n]		= this.vx[n] + dv * (this.mouse.x / this.mouse.y) * 0.5;
				}
			}
		this.lastColor = newColor;
		},


	resizeScreen: function() {

		var n = 0;

		this.canvas.width  = window.innerWidth;
		this.canvas.height = window.innerHeight;

        this.wo			= window.innerWidth;
        this.ho			= window.innerHeight;
        this.dxNode		= this.wo / this.nNodes;

		for (n=0; n<=this.nNodes;n++)
			{
            this.x[n]	= this.dxNode * n;
            this.x0[n]	= this.dxNode * n;
			}
		}




	}


