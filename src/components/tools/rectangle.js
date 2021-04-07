class Rectangle{

    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.point = {
            x: 0,
            y: 0
        }
    }

    start(x, y){
        this.point.x = x
        this.point.y = y
    }

    stroke(x, y){
        this.context.beginPath();
        this.context.strokeRect(this.point.x, this.point.y, x - this.point.x, y - this.point.y)
        this.context.stroke()
    }
}

export default Rectangle