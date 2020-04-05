class Brick{
    constructor(game){
        this.game = game
        this.dots = []
        this.data = []
        this.row = 0
        this.col = 4

        //create data
        this.createData()
        this.createDots()
    }

    createData(){
        let baseData = [
            [
                [x,x,x,x]
            ],
            [
                [x,x],
                [x,x]
            ],
            [
                [x,x,x],
                [_,x,_]
            ],
            [
                [_,x,x],
                [x,x,_]
            ],
            [
                [x,_],
                [x,_],
                [x,x]
            ],
            [
                [x,x,_],
                [_,x,x]
            ],
            [
                [_,x],
                [_,x],
                [x,x]
            ],
        ]
        let r = Math.floor(Math.random()*baseData.length)
        this.data = baseData[r]
    }
    canMoveLeft(){
        let canMoveLeft = true
        this.dots.forEach((dot) => {
            if (!dot.canMoveLeft())
                canMoveLeft = false
        })
        return canMoveLeft
    }

    moveLeft(){
        if (this.canMoveLeft()){
            this.col--
            this.dots.forEach((dot) => dot.moveLeft())
        }
    }    
    
    canMoveRight(){
        let canMoveRight = true
        this.dots.forEach((dot) => {
            if (!dot.canMoveRight())
                canMoveRight = false
        })
        return canMoveRight
    }

    moveRight(){
        if (this.canMoveRight()){
            this.col++
            this.dots.forEach((dot) => dot.moveRight())
        }
    }

    moveDown(){
        while(this.canFall()){
            this.fall()
        }
    }

    rotate(){
        let newData = []
        for(let col = 0; col < this.data[0].length; col++){
            let newRow = []
            for(let row = this.data.length - 1; row >= 0; row--){
                newRow.push(this.data[row][col])
            }
            newData.push(newRow)
        }

        let canRotate = true
        for(let row = 0; row < newData.length; row++){
            for(let col = 0; col < newData[0].length; col++){
                if ((newData[row][col] == x && 
                    !this.game.board.isEmptyCell(row + this.row, col + this.col)) ||
                    row + this.row >= NUM_ROWS ||
                    col + this.col >= NUM_COLS
                ){
                    canRotate = false
                }
            }
        }

        if(canRotate){
            this.data = newData
            this.createDots()
        }
    }

    canFall(){
        let canFall = true
        this.dots.forEach((dot) => {
            if (!dot.canFall())
                canFall = false
        })
        return canFall
    }

    fall(){
        if (this.canFall()){
            this.row++
            this.dots.forEach((dot) => dot.fall())
        } else {
            this.game.createNewBrick()
            this.appendToBoard()
            this.game.board.removeRows()
            
        }
    }

    appendToBoard(){
        this.dots.forEach((dot) => {
            this.game.board.data[dot.row][dot.col] = x
        })
    }

    createDots(){
        this.dots =  []
        for(let row = 0; row < this.data.length; row++){
            for(let col = 0; col < this.data[0].length; col++){
                if (this.data[row][col] == x){
                    let newDot = new Dot(this.game, row + this.row, col + this.col)
                    this.dots.push(newDot)
                }
            }
        }
    }

    draw(){
        this.dots.forEach((dot) => dot.draw())
    }
}