import React from "react"
import "./images.css"

class ImagesPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            images: []
        }
        this.inputImage = React.createRef()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.editImage = this.editImage.bind(this)
    }

    b64toBlob(b64Data, contentType='', sliceSize=512){
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
      
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
          
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    componentDidMount(){
        let that = this
        fetch("http://localhost:5000/get_images",{
            method: 'POST',
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            body: JSON.stringify({
                owner: JSON.parse(localStorage.getItem('user')).username
            })
        })
        .then(function(res){
            return res.text()
        }).then(function(text){
            that.setState({images: JSON.parse(text)})
            for(let i = 0; i < that.state.images.length; i++){
                let blob = that.b64toBlob(that.state.images[i].file.file, that.state.images[i].file.contentType);

                let images = that.state.images
                images[i].file = URL.createObjectURL(blob)
                that.setState({images: images})
            }
        })
    }

    handleInputChange(){
        let that = this
        const formData = new FormData()
        formData.append('image', this.inputImage.current.files[0])
        formData.append('owner', JSON.parse(localStorage.getItem('user')).username)
        fetch('http://localhost:5000/upload_image', {
            method: 'POST',
            body: formData
        }).then((res) => {
            return res.text()
        }).then(function(text){
            that.setState({images: JSON.parse(text)})
            for(let i = 0; i < that.state.images.length; i++){
                let blob = that.b64toBlob(that.state.images[i].file.file, that.state.images[i].file.contentType);

                let images = that.state.images
                images[i].file = URL.createObjectURL(blob)
                that.setState({images: images})
            }
        })
        this.inputImage.current.value = ''
    }

    deleteImage(e){
        let that = this
        fetch('http://localhost:5000/delete_image', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: e.target.id,
                owner: JSON.parse(localStorage.getItem('user')).username
            })
        }).then((res) => {
            return res.text()
        }).then(function(text){
            that.setState({images: JSON.parse(text)})
            for(let i = 0; i < that.state.images.length; i++){
                let blob = that.b64toBlob(that.state.images[i].file.file, that.state.images[i].file.contentType);

                let images = that.state.images
                images[i].file = URL.createObjectURL(blob)
                that.setState({images: images})
            }
        })
    }

    editImage(e){
        let imageInfo = {
            width: this.state.images[e.target.id].width,
            height: this.state.images[e.target.id].height,
            image: this.state.images[e.target.id].file,
            id: this.state.images[e.target.id]._id
        }
        this.props.editImage(imageInfo)
    }

    backToEditor(){
        this.props.onBack()
    }

    render(){
        let list = []
        for(let i = 0; i < this.state.images.length; i++){
            list[i] = <ul key={this.state.images[i]._id}>
                          <li><h3>Id: {this.state.images[i]._id}</h3></li>
                          <li>Width: {this.state.images[i].width}</li>
                          <li>Height: {this.state.images[i].height}</li>
                          <li><img src={this.state.images[i].file} /></li>
                          <button onClick={this.deleteImage} id={this.state.images[i]._id}>Delete</button>
                          <button onClick={this.editImage} id={i}>Edit</button>
                      </ul>
        }
        return(
            <div id="imagesList">
                <input type="file" name="image" accept="image/*" ref={this.inputImage} onChange={this.handleInputChange} required /><br/>
                <button onClick={this.backToEditor.bind(this)}>Back</button>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default ImagesPage