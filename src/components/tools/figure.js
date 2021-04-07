import Rectangle from "./rectangle"
import Ellipse from "./elipse"

class Figure{

    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.drawing = false
        this.point = {
            x: 0,
            y: 0
        }
        this.tools = {
            rectangle: new Rectangle(canvas, context),
            ellipse: new Ellipse(canvas, context)
        }
        this.tool = this.tools.ellipse
    }

    start(x, y){
        this.painting = this.canvas.toDataURL()
        let img = new Image()
        img.src = this.painting
        this.context.drawImage(img, 0, 0)
        this.tool.start(x, y)
        this.drawing = true
    }

    stroke(x, y){
        if(this.drawing){
            let img = new Image()
            img.src = this.painting
            this.context.clearRect(0, 0, 2000, 800)
            this.context.drawImage(img, 0, 0)
            this.tool.stroke(x, y)
        }
    }

    stop(){
        this.drawing = false
    }

    choseEllipse(){
        this.tool = this.tools.ellipse
    }

    choseRectangle(){
        this.tool = this.tools.rectangle
    }
}

export default Figure