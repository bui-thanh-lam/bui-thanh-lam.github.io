class Board{
    constructor(game){
        this.game = game
        this.data = [
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_]
        ]
    }

    isFullRow(row){
        let isFullRow = true
        for(let col = 0; col < NUM_COLS; col++){
            if (this.isEmptyCell(row, col)){
                isFullRow = false
                break
            }
        }
        return isFullRow
    }

    removeRow(row){
        this.data.splice(row, 1)
        this.data.unshift([_,_,_,_,_,_,_,_,_,_])
        this.createDots()
    }

    removeRows(){
        let row = NUM_ROWS - 1
        while(row >= 0){
            if(this.isFullRow(row)){
                this.removeRow(row)
                this.game.score++
            } else {
                row-- 
            }
   
        }

    }

    isEmptyCell(row, col){
        return this.data[row][col] == _
    }

    createDots(){
        this.dots =  []
        for(let row = 0; row < NUM_ROWS; row++){
            for(let col = 0; col < NUM_COLS; col++){
                if (this.data[row][col] == x){
                    let newDot = new Dot(this.game, row, col)
                    this.dots.push(newDot)
                }
            }
        }
    }

    draw(){
        this.createDots()
        this.dots.forEach((dot) => dot.draw())
    }
}