class Ellipse{

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
        let center_x = (this.point.x + x) / 2
        let center_y = (this.point.y + y) / 2
        let radius_x = Math.abs(x - this.point.x) / 2
        let radius_y = Math.abs(y - this.point.y) / 2
        this.context.ellipse(center_x, center_y, radius_x, radius_y, 0, 0, 2 * Math.PI);
        this.context.stroke()
    }
}

export default Ellipse