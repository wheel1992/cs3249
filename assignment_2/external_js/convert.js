class Convert {
  
    static toXCoordinate(col, cellSize) {
        return col * cellSize;
    }
    
    static toYCoordinate(row, cellSize) {
        return row * cellSize;
    }
    
    static toColumn(x, cellSize) {
        return Convert.roundDown(x / cellSize);
    }
    
    static toRow(y, cellSize) {
        return Convert.roundDown(y / cellSize);
    }
    
    static roundDown(value) {
        return Math.floor(value);
    }
    
    static roundUp(value) {
        return Math.ceil(value);
    }
    
    static nearestSmallestXCoordinate(x, cellSize) {
        return Convert.roundDown(x / cellSize) * cellSize;
    }
    
    static nearestSmallestYCoordinate(y, cellSize) {
        return Convert.roundDown(y / cellSize) * cellSize;
    }
    static nearestLargestXCoordinate(x, cellSize) {
        return Convert.roundUp(x / cellSize) * cellSize;
    }
    
    static nearestLargestYCoordinate(y, cellSize) {
        return Convert.roundUp(y / cellSize) * cellSize;
    }
    
}