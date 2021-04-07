import React from "react";

class Navigation extends React.Component{
    
    render(){
        let i = 0
        let list = []
        this.props.buttons.forEach(function(value, key){
            list[i] = <li key={i++}><button onClick={value}>{key}</button></li>
        })
        return(
            <nav>
                <ul>{list}</ul>
            </nav>
        )
    }
}

export default Navigation;