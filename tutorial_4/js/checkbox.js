
$(document).ready(function() {

    var boardSize = 8;
    var sizePieceSqure = 30;
    
    c = document.getElementById("myBoard"); // Getting Canvas html object
    ctx = c.getContext("2d"); // Getting Painter
    for(var i = 0; i < boardSize; i++)
    {
        for(var j = 0; j < boardSize; j++)
        {
            /*
            if((i+j)%2 === 0)   
                ctx.fillStyle = "#FFFFFF"; // Setting painter’s color
            else
                ctx.fillStyle = "#a9a9a9";
            */
            
            var remainder = (i + j) % 4;
            
            if (remainder == 0) {
                ctx.fillStyle = "#FFFFFF"; // white
            } else if (remainder == 1) {
                ctx.fillStyle = "#a9a9a9"; // grey
            } else if (remainder == 2) {
                ctx.fillStyle = "#0000ff"; // blue
            } else {
                ctx.fillStyle = "#ffff00"; // yellow
            }
            
        // ctx.fillRect(x, y, width, height);
        ctx.fillRect(i*sizePieceSqure,
                     j*sizePieceSqure,
                     sizePieceSqure,
                     sizePieceSqure);

        }
    }
 
 
}) // document ready
 

