class Game {
    constructor(){
        this.canvas = null
        this.context = null
        this.init()
    }

    init(){
        this.score = 0
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
        this.canvas.width = GAME_WIDTH
        this.canvas.height = GAME_HEIGHT
        
        //create new board
        this.board = new Board(this)
        this.createNewBrick()

        //start game loop
        this.loop()

        //get keyboard
        this.listenKeyBoard()

        //start game
        this.startGame()
    }

    startGame(){
        setInterval(() => {
            this.brick.fall()
        }, GAME_SPEED)
    }

    createNewBrick(){
        this.brick = new Brick(this)
    }

    listenKeyBoard(){
        document.addEventListener('keydown', (event) => {
            console.log(event.code)
            switch(event.code){
                case 'ArrowLeft': case 'Numpad4': 
                    this.brick.moveLeft() 
                break
                case 'ArrowRight': case 'Numpad6':
                    this.brick.moveRight() 
                break
                case 'ArrowUp': case 'Numpad8':
                    this.brick.rotate()
                break
                case 'ArrowDown': case 'Numpad2':
                    this.brick.moveDown()
                break
            }
        })
    }

    loop(){
        if(this.checkGameOver()){
            alert("GAME OVER!")
            location.reload()
        }
        this.updateScore()
        this.draw()
        setTimeout(() => this.loop(), 30)
    }

    checkGameOver(){
        let gameOver = false
        for(let col = 0; col < NUM_COLS; col++){
            if (!this.board.isEmptyCell(0,col)){
                gameOver = true
                break
            }
        }
        return gameOver
    }

    updateScore(){
        document.getElementById('score').value = this.score
    }

    clrScr(){
        this.context.fillStyle ='#ffffff'
        this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    }
    draw(){
        this.clrScr()
        this.board.draw()
        this.brick.draw()
    }
}

var g = new Game()