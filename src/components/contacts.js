import React from "react"
import "./contacts.css"

class Contacts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: undefined,
            organization: undefined,
            type: "Press",
            text: undefined,
            file: undefined
        };
        this.inputFile = React.createRef()
    }

    handleSubmit(e){
        e.preventDefault()
        e.persist()
        const formData = new FormData()
        formData.append('name', this.state.name);
        formData.append('organization', this.state.organization)
        formData.append('type', this.state.type)
        formData.append('text', this.state.text)
        formData.append('file', this.state.file)
        fetch('http://localhost:5000/send_message', {
            method: 'POST',
            body: formData
        })
        .then((res) => {
            console.log(res)
            this.resetForm()
            alert("Message sent")
        }).catch(function(err){
            console.log(err)
        })
    }

    resetForm(){
        let form = document.getElementById("myForm")
        for (let i = 0; i < 5; i++){
            form[i].value = ""
        }
    }

    handleInputNameChange(e){
        this.setState({name: e.target.value});
    }

    handleInputOrganizationChange(e){
        this.setState({organization: e.target.value});
    }

    handleInputTypeChange(e){
        this.setState({type: e.target.value});
    }

    handleInputTextChange(e){
        this.setState({text: e.target.value});
    }

    handelInputFileChange(e){
        this.setState({file: this.inputFile.current.files[0]})
    }

    render(){
        return(
            <div id="contacts">
                <section id="info" >
                    <div>If you want to contact us, write a message. We will answer within a week</div>
                    <img src={require("./images/message.png")} />
                </section>
                <section id='message'>
                    <h1>Write message</h1>
                    <form ref='myForm' id='myForm' onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text" placeholder="Name" name="name" onChange={this.handleInputNameChange.bind(this)} required /><br/>
                        <input type="text" placeholder="Organization" name="organization" onChange={this.handleInputOrganizationChange.bind(this)} required /><br/>
                        <select placeholder="Type" name="type" onChange={this.handleInputTypeChange.bind(this)} required>
                            <option value="press">Press</option>
                            <option value="partnership">Partnership</option>
                            <option value="other">Other</option>
                        </select><br/><br/>
                        <textarea name="text" placeholder="Text" id="text" onChange={this.handleInputTextChange.bind(this)} required /><br/><br/>
                        <input ref={this.inputFile} type="file" name="file" id="file" onChange={this.handelInputFileChange.bind(this)} multiple required /><br/><br/>
                        <input type='submit' value='Send' />
                    </form>     
                </section>
            </div>
        )
    }
}

export default Contacts