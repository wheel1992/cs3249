$(document).ready(function() {
    
    DragDrop = {
        boardJs : undefined,
        rulesJs : undefined,
        historyJs : undefined,
        canvas : undefined,
        painter : undefined,
        bound  : undefined,
        offsetX  : 0,
        offsetY  : 0,
        startX : 0,
        startY : 0,
        isDragging : false, 
        minXValue : 0,
        minYValue : 0,
        maxXValue : 0,
        maxYValue : 0,
        cellSize : 0,
        selectedChecker : undefined,
        imageX : 0,
        imageY : 0,
        //beforeDragState : undefined,
        //prevBoardState : undefined,
        checkerRed : undefined,
        checkerBlack : undefined,
        kingCheckerRed : undefined,
        kingCheckerBlack : undefined,
        
        
        init : function (boardJs, rulesJs, canvas, maxWidth, maxHeight, cellSize, checkerRed, checkerBlack, kingCheckerRed, kingCheckerBlack){
            
            DragDrop.boardJs = boardJs;
            DragDrop.rulesJs = rulesJs;
            DragDrop.canvas = canvas;
            DragDrop.painter = canvas.getContext("2d"); // 
            DragDrop.bound = canvas.getBoundingClientRect();
            DragDrop.offsetX = DragDrop.bound.left;
            DragDrop.offsetY = DragDrop.bound.top;
            DragDrop.maxXValue = maxWidth;
            DragDrop.maxYValue = maxHeight;
            DragDrop.cellSize = cellSize;
            
            DragDrop.checkerRed = checkerRed;
            DragDrop.checkerBlack = checkerBlack;
            DragDrop.kingCheckerRed = kingCheckerRed;
            DragDrop.kingCheckerBlack = kingCheckerBlack;
            
            
            $(window).mousedown(function (e) {
                DragDrop.handleMouseDown(e);
            });
            
            $(window).mouseup(function (e) {
                DragDrop.handleMouseUp(e);
            });
            
            $(window).mousemove(function (e) {
                DragDrop.handleMouseMove(e);
            });
            
        },
        
        handleMouseDown : function (e) {
            e.preventDefault();
            e.stopPropagation();
          
            
            DragDrop.startX = parseInt(e.clientX - DragDrop.offsetX);
            DragDrop.startY = parseInt(e.clientY - DragDrop.offsetY);

            DragDrop.imageX = Convert.nearestSmallestXCoordinate(DragDrop.startX, DragDrop.cellSize);
            DragDrop.imageY = Convert.nearestSmallestYCoordinate(DragDrop.startY, DragDrop.cellSize);
            
            
            if (!DragDrop.isMouseWithinCanvas(DragDrop.startX, DragDrop.startY)) {
                // console.log("mousedown out of canvas")
                return false;
            }
            
            DragDrop.isDragging = DragDrop.hitImage(DragDrop.startX, DragDrop.startY, DragDrop.cellSize);
            
            if (DragDrop.isDragging) {
                DragDrop.selectedChecker = DragDrop.getBoardCheckerObj(DragDrop.startX, DragDrop.startY, DragDrop.cellSize);  
            }
            
            if (DragDrop.selectedChecker != null &&
               !DragDrop.isCorrectTurn(DragDrop.selectedChecker, DragDrop.whoseTurnNow())) {
                
                alert("Is " + DragDrop.whoseTurnNow() + " turn!. Not your turn!");
                DragDrop.selectedChecker = null;
                return false;
            }
            
            //DragDrop.saveState(DragDrop.painter);
            
        },
        
        handleMouseMove : function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            var mouseX = parseInt(e.clientX - DragDrop.offsetX);
            var mouseY = parseInt(e.clientY - DragDrop.offsetY);

            if (!DragDrop.isMouseWithinCanvas(mouseX, mouseY)) {
                //console.log("mousemove out of canvas")
                        
                
                // put back the checker to original position
                
                if (DragDrop.selectedChecker != null) {
                    DragDrop.restoreState(DragDrop.painter, myBoardState); // DragDrop.beforeDragState          
                }
                    
                DragDrop.isDragging = false;
                DragDrop.selectedChecker = null;
                
                return false;
            }
            
            
            
            if (DragDrop.isDragging) { // set dragging when there's a checker at the mouse location
                    
                // the original row of the selected checker
                var selectedRow = DragDrop.selectedChecker.row;
                // the original column of the selected checker
                var selectedCol = DragDrop.selectedChecker.col;


                // remove from previous row and column of the DRAGGING CHECKER
                var currentDraggingRow = Convert.toRow(DragDrop.startY, DragDrop.cellSize);
                var currentDraggingCol = Convert.toColumn(DragDrop.startX, DragDrop.cellSize);
                
                // redraw surrounding cells at initial x and y
                DragDrop.redrawAffectedCells(DragDrop.painter, 
                                            DragDrop.startX,
                                            DragDrop.startY, DragDrop.cellSize);
                
            
                // draw the new location of  the image
                
                var dx = mouseX - DragDrop.startX;
                var dy = mouseY - DragDrop.startY;
                
                DragDrop.imageX += dx;
                DragDrop.imageY += dy;
            
                // redraw surrounding cells at new x and y
                DragDrop.redrawAffectedCells(DragDrop.painter, 
                                            DragDrop.imageX,
                                            DragDrop.imageY, DragDrop.cellSize);
                
                
                DragDrop.displayImage(DragDrop.painter, 
                              DragDrop.selectedChecker.color,
                                    DragDrop.imageX, 
                                    DragDrop.imageY,
                                    DragDrop.cellSize,
                                    DragDrop.selectedChecker.isKing);
                // DragDrop.getSrcImage(DragDrop.selectedChecker.color)
                
                DragDrop.startX = mouseX;
                DragDrop.startY = mouseY;
            }
           
            
        },
        
        handleMouseUp : function (e) {
            e.preventDefault();
            e.stopPropagation();
        
            var wasDragging = DragDrop.isDragging;
            DragDrop.isDragging = false;
            
            var mouseX = e.clientX - DragDrop.offsetX;
            var mouseY = e.clientY - DragDrop.offsetY;

            if (!DragDrop.isMouseWithinCanvas(mouseX, mouseY)) {
                //console.log("mouseup out of canvas")
                
                // there's a selection on a checker in mouseDown
                if (DragDrop.selectedChecker != null) {
                    DragDrop.restoreState(DragDrop.painter, myBoardState);
                }
                
                return false;
            }
            
            var nearestX = Convert.nearestSmallestXCoordinate(mouseX, DragDrop.cellSize);
            var nearestY = Convert.nearestSmallestYCoordinate(mouseY, DragDrop.cellSize);
            
            //console.log("mouseup at " + nearestX + ", " + nearestY);
            
            if (DragDrop.selectedChecker != null &&
               DragDrop.isCorrectTurn(DragDrop.selectedChecker, DragDrop.whoseTurnNow())) {
                
                var currentTurn = DragDrop.whoseTurnNow();
                
                // update rules.js that checker is moved
                var result = DragDrop.rulesJs.makeMovement(DragDrop.selectedChecker, directionOf(DragDrop.whoseTurnNow()), directionOf(DragDrop.whoseTurnNow()), Convert.toRow(nearestY, DragDrop.cellSize), Convert.toColumn(nearestX, DragDrop.cellSize));
                
                
                DragDrop.selectedChecker = null;
                
                if (result == null) {
                    alert ("You have make a wrong move!");
                    DragDrop.restoreState(DragDrop.painter, myBoardState);
                    return false;
                }
                
                DragDrop.addHistory(prevBoardState, result, currentTurn);
                 
            }
            
        },
                
        getBoardCheckerObj : function (x, y, cellSize) {
            return DragDrop.boardJs.getCheckerAt(Convert.toRow(y, cellSize),
                                      Convert.toColumn(x, cellSize));
        },
        
        hitImage : function (x, y, cellSize) {
            return DragDrop.getBoardCheckerObj(x, y, cellSize) != null;
        },
        
        displayImage : function (painter, color, x, y, cellSize, isKing) {
            
            if (color == "red") {
                if (isKing) {
                    painter.drawImage(DragDrop.kingCheckerRed,
                            x,
                            y,
                            cellSize,
                            cellSize);
                }else {
                    painter.drawImage(DragDrop.checkerRed,
                            x,
                            y,
                            cellSize,
                            cellSize);
                }
                
            } else { // black
                
                if (isKing) {
                    painter.drawImage(DragDrop.kingCheckerBlack,
                            x,
                            y,
                            cellSize,
                            cellSize);
                } else {
                    painter.drawImage(DragDrop.checkerBlack,
                        x,
                        y,
                        cellSize,
                        cellSize);
                }

            }
        }, 
        
        redrawAffectedCells : function (painter, currentX, currentY, cellSize) { // redraw multiple cells
            // redraw 4 surrounding cells based on currentX and currentY
            // either singular cell or 4 cells
            var smallestX = Convert.nearestSmallestXCoordinate(currentX, cellSize); 
            var largestX = Convert.nearestLargestXCoordinate(currentX, cellSize);
            var smallestY = Convert.nearestSmallestYCoordinate(currentY, cellSize);
            var largestY = Convert.nearestLargestYCoordinate(currentY, cellSize);
            
            if (smallestX == largestX && smallestY == largestY) {
                DragDrop.redrawCell(painter, smallestX, smallestY, cellSize);
            } else {
                DragDrop.redrawCell(painter, smallestX, smallestY, cellSize); // top left
                DragDrop.redrawCell(painter, largestX, smallestY, cellSize); // top right
                DragDrop.redrawCell(painter, smallestX, largestY, cellSize); // bottom left
                DragDrop.redrawCell(painter, largestX, largestY, cellSize); // bottom right
            }
            
        },
        
        redrawCell : function (painter, x, y, cellSize) { // redraw one cell
            var row = Convert.toRow(y, cellSize);
            var col = Convert.toColumn(x, cellSize);
            
            
            if((row+col)%2 === 0)   
                painter.fillStyle = "#FFFFFF";
            else
                painter.fillStyle = "#a9a9a9";    
            
            painter.fillRect(col * cellSize,
                            row * cellSize,
                            cellSize,
                            cellSize); 
            
            // is there checker at this cell?
            var checker = DragDrop.boardJs.getCheckerAt(row, col);
            if (checker != null) {
                // if there's checker, display it!
                DragDrop.displayImage(painter,
                                        checker.color,
                                        x, y, 
                                        cellSize,
                                        checker.isKing);
            }
            
            

        }, 
        
        isMouseWithinCanvas : function (mouseX, mouseY) {
            return (mouseX >= DragDrop.minXValue && mouseX <= DragDrop.maxXValue &&
               mouseY >= DragDrop.minYValue && mouseY <= DragDrop.maxYValue);
        },
        
        whoseTurnNow : function () {
            return whoseTurn;
        },
        
        isCorrectTurn : function (selectedChecker, currentTurnColor) {
            return selectedChecker.color == currentTurnColor;
        },
        
        getSrcImage : function(color) {
            if (color === "black") {
                return "graphics/black-piece.png";
            } else {
                return "graphics/red-piece.png";
            }
        },
        
        addHistory : function (boardState, move, color) {
            History.addNew(boardState, move, color);
            
            if (History.getUndoSize() > 0) {
                enableButton("btnUndo");
                disableButton("btnRedo");
            }
        },
        
        saveState : function (painter) {
            // DragDrop.beforeDragState 
            myBoardState = painter.getImageData(0, 0, MAX_WIDTH, MAX_HEIGHT);
        },
        
        restoreState : function (painter, state) {
            if (state != null) {
                painter.putImageData(state, 0, 0);
                prevBoardState = state;
            }
        }
    
    
        
        
        
    };
    
    
}) // document ready



