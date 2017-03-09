$(document).ready(function() {
    
    History = {
        
        boardJs : undefined,
        rulesJs : undefined,
        undoStack : [],
        redoStack : [],
        
        
        init : function() {
            //History.boardJs = boardJs;
            //History.rulesJs = rulesJs;
        },
        
        addNew : function (boardState, move, color) {
            History.undoStack.push({"state" : boardState,
                                   "move" : move,
                                   "color" : color});
            History.redoStack = [];
            
            console.log("History add New " + boardState + ", " + move + " and clear redoStack");
            console.log("History add New undoSize " + History.getUndoSize() + ", redoSize " + History.getRedoSize());
        },
        
        undo : function () {
            if (History.undoStack.length > 0) {
                var prev = History.undoStack.pop();
                History.redoStack.push(prev); // push the undo step into redo stack, for backup
                
                console.log("History UNDO undoSize " + History.getUndoSize() + ", redoSize " + History.getRedoSize());
                
                return prev;
            }
            return null;
        },
        
        redo : function () {
            if (History.redoStack.length > 0) {
                var step = History.redoStack.pop();
                History.undoStack.push(step); // put back the redo step into undo stack
                
                console.log("History REDO undoSize " + History.getUndoSize() + ", redoSize " + History.getRedoSize());
                
                return step;
            }
            return null;
        },
        
        getUndoSize : function () {
            return History.undoStack.length;
        },
        
        getRedoSize : function () {
            return History.redoStack.length;
        },
        
    
    
        
        
        
        
        
    }; // end history
    
});