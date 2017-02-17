

    
    
    
    

$(document).ready(function() {

    var canvas = document.getElementById("smiley-canvas"); // Getting Canvas html object
    
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "yellow";
        ctx.beginPath(); 
        ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle 
        ctx.closePath();
        ctx.fill(); 
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "black";
        
        
        //ctx.moveTo(110,75);
        /*arc(x, y, radius, startAngle, endAngle, anticlockwise)*/
        //ctx.arc(75,75,35,0,Math.PI,false); // Mouth (clockwise) 
        ctx.moveTo(65,65);
        ctx.beginPath();
        ctx.arc(60,65,5,0,Math.PI*2,true); // Left eye 
        ctx.closePath();
        ctx.fill();
        
        ctx.moveTo(95,65); 
        ctx.beginPath();
        ctx.arc(90,65,5,0,Math.PI*2,true); // Right eye ctx.stroke();
        ctx.closePath();
        ctx.fill(); // draw!
        
        ctx.beginPath();
        ctx.arc(75,85, 26, Math.PI, 2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
        
        
    }
    
 
}) // document ready
 

