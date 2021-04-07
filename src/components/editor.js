import React from "react";
import "./editor.css"
import Palette from "./palette"
import Pen from "./tools/pen"
import Figure from "./tools/figure";
import ImagesPage from "./images"

class Editor extends React.Component{
    constructor(props){
        super(props)
        this.painting = <img/>
        this.canvasRef = React.createRef();
        this.canvasContainerRef = React.createRef();
        this.draw = this.draw.bind(this)
        this.tools = {
            pen: undefined,
            figure: undefined
        }
        this.state = {
            imagesPageIsOpen: false,
        }
        this.canvas = {
            width: 2000,
            height: 800,
            image: undefined,
            image_id: undefined
        }
        this.tool = undefined
        this.changeColor = this.changeColor.bind(this)
        this.chosePen = this.chosePen.bind(this)
        this.choseEllipse = this.choseEllipse.bind(this)
        this.choseRectangle = this.choseRectangle.bind(this)
        this.startDrawing = this.startDrawing.bind(this)
        this.draw = this.draw.bind(this)
        this.stopDrawing = this.stopDrawing.bind(this)
        this.openImagesPage = this.openImagesPage.bind(this)
        this.openImage = this.openImage.bind(this)
        this.saveImage = this.saveImage.bind(this)
    }

    componentDidMount() {
        this.context = this.canvasRef.current.getContext("2d")
        this.context.lineCap = "round";
        this.context.lineWidth = 8;
        this.tools = {
            pen: new Pen(this.canvasRef.current, this.context),
            figure: new Figure(this.canvasRef.current, this.context),
        }
        this.tool = this.tools.pen
    }

    componentDidUpdate(){
        if (!this.state.imagesPageIsOpen){
            this.context = this.canvasRef.current.getContext("2d")
            this.context.lineCap = "round";
            this.context.lineWidth = 8;
            this.tools = {
                pen: new Pen(this.canvasRef.current, this.context),
                figure: new Figure(this.canvasRef.current, this.context),
            }
            this.tool = this.tools.pen
            if (this.canvas.image !== undefined){
                this.context.drawImage(this.canvas.image, 0, 0)
            }
        }
    }

    openEditor(){
        this.setState({
            imagesPageIsOpen: false
        })
    }

    saveImage(){
        if (!localStorage.getItem('user')){
            alert('You must log in')
        }else{
            let that = this
            let image = this.canvasRef.current.toDataURL()
            image = image.substring(image.indexOf(',') + 1)
            fetch('http://localhost:5000/save_image', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    image: image,
                    id: that.canvas.image_id,
                    contentType: "image/png",
                    owner: JSON.parse(localStorage.getItem("user")).username
                })
            }).then((res) => {
                console.log(res)
            })
        }
    }

    openImage(imageInfo){
        let img = new Image()
        img.src = imageInfo.image
        img.id = imageInfo.id
        this.canvas = {
            width: imageInfo.width,
            height: imageInfo.height,
            image: img,
            image_id: img.id
        }
        this.openEditor()
    }

    changeColor(e){
        e.preventDefault();
        this.context.strokeStyle = e.target.style.backgroundColor;
    }

    startDrawing(e){
        e.persist()
        let x = e.clientX - (this.canvasRef.current.offsetLeft - this.canvasContainerRef.current.scrollLeft);
        let y = e.clientY - (this.canvasRef.current.offsetTop - this.canvasContainerRef.current.scrollTop);
        this.tool.drawing = true
        this.tool.start(x, y)
    }

    draw(e){
        e.persist()
        if (e.buttons > 0){
            let x = e.clientX - (this.canvasRef.current.offsetLeft - this.canvasContainerRef.current.scrollLeft);
            let y = e.clientY - (this.canvasRef.current.offsetTop - this.canvasContainerRef.current.scrollTop);
            this.tool.stroke(x, y)
        }
    }

    stopDrawing(){
        this.tool.stop()
    }

    chosePen(){
        this.tool = this.tools.pen
    }

    choseRectangle(){
        this.tool = this.tools.figure
        this.tool.choseRectangle()
    }

    choseEllipse(){
        this.tool = this.tools.figure
        this.tool.choseEllipse()
    }

    openImagesPage(){
        if (!localStorage.getItem('user')){
            alert('You must log in')
        }
        else{
            this.setState({imagesPageIsOpen: true})
        }
    }

    render(){
        if (this.state.imagesPageIsOpen){
            return(
                <ImagesPage onBack={this.openEditor.bind(this)} editImage={this.openImage}/>
            )
        }
        return (
            <div id="editor">
                <section id="tools">
                    <h3>Tools</h3>
                    <div id="buttons">
                        <button onClick={this.choseRectangle}><img src={require("./images/rectangle.png")} alt="rounded rectangle" /></button>
                        <button onClick={this.choseEllipse}><img src={require("./images/elipse.png")} alt="elipse" /></button>
                        <button onClick={this.chosePen}><img src={require("./images/pencil_tool.png")} alt="pencil tool" /></button>
                    </div>
                </section>
                <section id="canvas" onScroll={this.changeCanvasPosition} ref={this.canvasContainerRef}>
                    <canvas width={this.canvas.width} height={this.canvas.height} ref={this.canvasRef} onMouseDown={this.startDrawing} onMouseMove={this.draw} onMouseUp={this.stopDrawing} onMouseOut={this.stopDrawing}></canvas>
                </section>
                <header>
                    <button onClick={this.saveImage}>Save</button>
                    <button onClick={this.openImagesPage}>Open</button>
                </header>
                <section id="palette">
                    <Palette canvasRef={this.canvasRef} changeColor={this.changeColor} />
                </section>
            </div>
        )
    }
}

export default Editor;