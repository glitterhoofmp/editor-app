import React from "react"

class AdminPage extends React.Component{
    constructor(){
        super()
        this.state = {
            messages: []
        }
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
        fetch("http://localhost:5000/get_messages")
        .then(function(res){
            return res.text()
        }).then(function(text){
            that.setState({messages: JSON.parse(text)})

            for(let i = 0; i < that.state.messages.length; i++){

                let blob = that.b64toBlob(that.state.messages[i].file.file, that.state.messages[i].file.contentType);

                let messages = that.state.messages
                messages[i].file = URL.createObjectURL(blob)
                that.setState({messages: messages})
            }
        })
    }

    render(){
        let list = []
        for(let i = 0; i < this.state.messages.length; i++){
            list[i] = <ul key={this.state.messages[i]._id}>
                          <li><h3>Id: {this.state.messages[i]._id}</h3></li>
                          <li>Name: {this.state.messages[i].name}</li>
                          <li>Organization: {this.state.messages[i].organization}</li>
                          <li>Type: {this.state.messages[i].type}</li>
                          <li>Text: {this.state.messages[i].text}</li>
                          <li><a href={this.state.messages[i].file} download>File</a></li>
                      </ul>
        }

        return(
            <ul>
                {list}
            </ul>
        )
    }
}

export default AdminPage