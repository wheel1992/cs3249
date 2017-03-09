var drawArrow = function (context, x1, y1, x2, y2) {
        context.lineWidth = 2.5;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = '#FFFF00';
        context.stroke();

        var a = Math.PI / 8;
        var h = 12;
        var sa = Math.sin(a);
        var ca = Math.cos(a);
        context.fillStyle = '#FFFF00'; 
        context.save();
        context.translate(x2, y2);
        context.scale(h, h);
        context.rotate(-Math.atan2(x2 - x1, y2 - y1));
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(+sa, -ca);
        context.moveTo(0, 0);
        context.lineTo(-sa, -ca);
        context.quadraticCurveTo(0, -ca * (2 / 3), sa, -ca);
        context.fill();
        context.restore();
    };