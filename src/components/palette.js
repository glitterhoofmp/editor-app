import React from "react";

class Palette extends React.Component{

    render(){
        let colors = []
        for (var r = 0, max = 4; r <= max; r++) {
            for (var g = 0; g <= max; g++) {
                for (var b = 0; b <= max; b++) {
                    let style = {
                        backgroundColor: "rgb(" + Math.round(r * 255 / max) + ", "
                        + Math.round(g * 255 / max) + ", "
                        + Math.round(b * 255 / max) + ")"
                    }

                    colors[r * 25 + g * 5 + b] = <div key={r * 25 + g * 5 + b} className="button" onClick={this.props.changeColor} style={style}></div>                    
                }
            }
        }
        return (
            <div>{colors}</div>
        )
    }
}

export default Palette;