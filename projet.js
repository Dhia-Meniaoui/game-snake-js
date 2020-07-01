window.onload = function (){

var delay= 100;
var ctx ;
var canvaswidth =900;
var canvasheight =420;
var applee;
var gameover=false;

var snakee;
var block =30;

int();


/* ******************************************************************** */

   function int (){
	var canvas =document.createElement('canvas');
	canvas.style.position = "absolute";
	canvas.style.left = "50px";
	canvas.style.right = "100px";
    canvas.style.top = "50px";
	canvas.width = canvaswidth;
	canvas.height =canvasheight;
	canvas.style.border = "1px solid white" ;
	document.body.appendChild(canvas);
	ctx = canvas.getContext('2d');
	
snakee= new snake([[6,4],[5,4],[4,4]],"right");

applee=new apple([5,8]);

    refrecheConavase();




}
              

/* ******************************************************************** */

   function refrecheConavase(){
   
     
     snakee.advance();
     if (snakee.controle()) {
     
}
     
 
     else{
     	     
       if (snakee.ate(applee)) {
       applee.setnewpos();
       snakee.manger=true;
       }

        
	ctx.clearRect(0,0, canvaswidth, canvasheight);
	applee.drow();
	snakee.draw();
     setTimeout(refrecheConavase,delay);

}
   }

/* ******************************************************************** */

     function drawblock(ctx,position){
      var x= position[0]*block;
      var y= position[1]*block; 
      ctx.fillRect(x,y,30,30);
  }

/* ******************************************************************** */


















   function snake(body,direction){

     this.body =body ;
     this.manger=false;
     this.direction =direction;
                     /* --------------------------- */


     this.setnd =function(newdr){   	
     	var allowdr;
     	switch(this.direction){
     		case "right":
     		case "left":
     		allowdr=["up","down"];
     		break;
     		case "up":
     		case "down":
     		allowdr=["right","left"];
     		break;
     		  default :
    throw("Invalid Direction");

     	}
     	if(allowdr.indexOf(newdr)> -1){
     		this.direction=newdr;
     	}
     };
                     /* --------------------------- */



     this.draw =function(){
       // ctx.save();
        ctx.fillStyle ="#ff0000";
        for(var i=0; i< this.body.length;i++){
        	drawblock(ctx,this.body[i]);
        }
        //ctx.restore();
     };
                  /* --------------------------- */

     this.advance = function(){
         var nextpos= this.body[0].slice();
         switch (this.direction){
         	case "right":nextpos[0]++;
         	break;
         	case "left" :nextpos[0]--;
         	break;
         	case "down":nextpos[1]++;
         	break;
         	case "up":nextpos[1]--;
         	break;
         	  default :
    throw("Invalid Direction");


         }
         this.body.unshift(nextpos);
         if(this.manger ===false){
         this.body.pop();}
         else{
         	this.manger=false;
         }


     };

                  /* --------------------------- */


     this.controle = function(){
     	var head = this.body[0];
     	var rest = this.body.slice(1);
     	var xhead = head[0];
     	var yhead = head[1];
     	var xMax= canvaswidth/block;
     	var yMax= canvasheight/block;
        var collision =false ;

      if((xhead ===xMax || xhead+1===0)||(yhead ===yMax || yhead+1===0)) 
        {
             collision =true;gameover=true;
        }
          for(var i=0;i<rest.length;i++){
        if (xhead===rest[i][0] &&yhead===rest[i][1] ) 
        {
             collision =true;gameover=true;
        }	
       }
      return collision;
     }; 

                  /* --------------------------- */

    this.ate = function(a){
    	var head = this.body[0];

        if((head[0]===a.position[0] && head[1]===a.position[1] ) )
        	{return true;}
         else { return false;}
        
    };

 }

 function restore(){
        	snakee=new   snake([[6,4],[5,4],[4,4]],"right");

applee=new apple([5,8]);

    refrecheConavase();
  };

 









/* ******************************************************************** */

function apple(position){

   this.position=position;
   this.drow =function(){
    //ctx.save();
    ctx.fillStyle = "#33cc33";
    ctx.beginPath();
    var radius =block/2;
    var x= this.position[0]*block +radius;
    var y= this.position[1]*block +radius;
    ctx.arc(x,y,radius,0,Math.PI*2,true);
    ctx.fill();
    //ctx.restore();
   };
   this.setnewpos = function(){
     var  position0= Math.round(Math.random()*(30-1));
     var  position1= Math.round(Math.random()*(14-1));
         this.position=[position0,position1];
   }


}

/* ******************************************************************** */










/* ******************************************************************** */

document.onkeydown = function handlekeydown(e){
var key = e.keyCode;
var newdirection;  
switch (key){
	case 37:
    newdirection ="left"; 
    break;
    case 38:
    newdirection ="up";
    break;
    case 39:
    newdirection ="right";
    break;
    case 40:
    newdirection ="down";
    break;
    case 32:
    restore();
    return;
    default :
    return;}
   snakee.setnd(newdirection);
}








}  