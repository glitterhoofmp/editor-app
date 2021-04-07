class Pen{
    
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.drawing = false
    }

    start(x, y){
        this.context.beginPath()
        this.context.moveTo(x, y)
        this.drawing = true;
    }

    stroke(x, y){
        if (this.drawing){
            this.context.lineTo(x, y)
            this.context.stroke()
        }
    }

    stop(){
        this.drawing = false;
    }
}

export default Pen