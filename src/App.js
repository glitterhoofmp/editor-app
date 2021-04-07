import React from "react";
import './App.css'
import Content from "./components/content"
import Navigation from "./components/navigation"
import MainPage from "./components/main_page";
import Tutorials from "./components/tutorials";
import Editor from "./components/editor";
import Contacts from "./components/contacts"
import AdminPage from "./components/admin"
import LogInPage from "./components/login"

class App extends React.Component{  
  constructor(props){
    super(props)
    this.state = {
      content : <MainPage />
    }
    this.openMainPage = this.openMainPage.bind(this)
    this.openTutorials = this.openTutorials.bind(this)
    this.openEditor = this.openEditor.bind(this)
    this.openContacts = this.openContacts.bind(this)
    this.openAdminPgage = this.openAdminPgage.bind(this)
    this.openLogInPage = this.openLogInPage.bind(this)
    this.navButtons = new Map([
      ["Main page", this.openMainPage],
      ["Tutorials", this.openTutorials],
      ["Editor", this.openEditor],
      ["Contacts", this.openContacts],
      ["Login", this.openLogInPage]
    ])
    if(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).isAdmin){
      this.navButtons.set("Admin", this.openAdminPgage)
    }
  }

  openAdminPgage(){
    this.setState({content: <AdminPage />})
  }

  openMainPage(){
    this.setState({content: <MainPage />})
  }

  openTutorials(){
    this.setState({content: <Tutorials />})
  }

  openEditor(){
    this.setState({content: <Editor  />})
  }

  openContacts(){
    this.setState({content: <Contacts />})
  }

  openLogInPage(){
    this.setState({content: <LogInPage onLogin={this.onLogin.bind(this)} onLogout={this.onLogout.bind(this)} />})
  }

  onLogin(){
    console.log("aad")
    if(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).isAdmin){
      console.log("dadaw")
      this.navButtons.set("Admin", this.openAdminPgage)
    }
    this.openLogInPage()
  }

  onLogout(){
    this.navButtons.delete("Admin")
    this.openLogInPage()
  }

  render() {
    return (
      <div>
        <Navigation buttons={this.navButtons}/>
        <Content content={this.state.content} />
      </div>
    )
  }
}

export default App;
