let classifier
const options = { probabilityThreshold: PRECISION }


async function setup() {
    classifier = await ml5.soundClassifier('SpeechCommands18w', options);
    classifier.classify(gotResult)
}
setup();


function gotResult(error, results) {
    if (error) {
        console.error(error)
    }
    let command = results[0].label
    console.log(command)
    switch(command){
        case 'left':
        g.brick.moveLeft() 
        break
        case 'right':
        g.brick.moveRight() 
        break
        case 'up':
        g.brick.rotate()
        break
        case 'down':
        g.brick.moveDown()
        break
    }
}