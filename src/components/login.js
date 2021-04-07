import React from "react"
import decode from 'jwt-decode'
import "./login.css"

class LogInPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menu: !localStorage.getItem("user") ? this.loginMenu() : this.greetingMenu(),
            username: undefined,
            password: undefined
        }
        this.usernameInput = undefined
        this.passwordInput = undefined
    }

    onChangeUsername(e){
        this.setState({username: e.target.value})
    }

    onChangePassword(e){
        this.setState({password: e.target.value})
    }

    signUp(e){
        e.preventDefault()
        let that = this
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers,
            body: JSON.stringify({
                username: that.state.username,
                password: that.state.password
            })
        }).then(function(res){
            return res.text()
        }).then(function(text){
            const res = JSON.parse(text)
            if (res.err){
                alert(res.err)
            }else{
                let user = decode(res.token)
                localStorage.setItem('user', JSON.stringify(user))
                that.setState({menu: that.greetingMenu()})
                that.props.onLogin()
            }
        })
    }

    logIn(e){
        e.preventDefault()
        let that = this
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers,
            body: JSON.stringify({
                username: that.state.username,
                password: that.state.password
            })
        }).then(function(res){
            return res.text()
        }).then(function(text){
            const res = JSON.parse(text)
            if (res.err){
                alert(res.err)
            }else{
                let user = decode(res.token)
                console.log(user)
                localStorage.setItem('user', JSON.stringify(user))
                console.log(localStorage.getItem('user'))
                console.log(user)
                that.props.onLogin()
                that.setState({menu: that.greetingMenu()})
            }
        })
    }

    logOut(){
        localStorage.removeItem("user")
        this.props.onLogout()
        this.setState({menu: this.loginMenu()})
    }

    resetInput(){
        document.getElementById("username").value = ""
        document.getElementById("password").value = ""
    }

    openLoginMenu(e){
        e.preventDefault()
        this.setState({menu: this.loginMenu()})
        this.resetInput()
    }

    openSignUpMenu(e){
        e.preventDefault()
        this.setState({menu: this.signUpMenu()})
        this.resetInput()
    }

    greetingMenu(){
        return(
            <div id="authMenu">
                <h2>Welcome, {JSON.parse(localStorage.getItem("user")).username}</h2>
                <button onClick={this.logOut.bind(this)}>Log out</button>
            </div>
        )
    }

    loginMenu(){
        return(
            <div id="authMenu">
                <h3>Login</h3>
                <form onSubmit={this.logIn.bind(this)}>
                    <input type="text" onChange={this.onChangeUsername.bind(this)} placeholder="Username" id="username" required/>
                    <input type="password" onChange={this.onChangePassword.bind(this)} placeholder="Password" id="password" required/>
                    <input type="submit" value="Login" />
                </form>
                <p>Don't have an account?</p>
                <button onClick={this.openSignUpMenu.bind(this)}>Sign up</button>
            </div>
        )
    }

    signUpMenu(){
        return(
            <div id="authMenu">
                <h3>Sign Up</h3>
                <form onSubmit={this.signUp.bind(this)}>
                    <input type="text" onChange={this.onChangeUsername.bind(this)} placeholder="Username" id="username" required/>
                    <input type="password" onChange={this.onChangePassword.bind(this)} placeholder="Password" id="password" required/>
                    <input type="submit" value="Sign up" />
                </form>
                <p>Already have an account?</p>
                <button onClick={this.openLoginMenu.bind(this)}>Login</button>
            </div>
        )
    }

    render(){
        return(
            this.state.menu
        )
    }
}

export default LogInPage