import React from "react";
import "./main_page.css";

class MainPage extends React.Component{
    
    render(){
        return (
            <main className="main_page">
                <article className="main_article">
                    <h1>Vector Graphic Softwave</h1>
                    <div>Vectr is a free graphics software used to create vector graphics easily and intuitively.
                         It's a simple yet powerful web and desktop cross-platform tool to bring your designs into reality.</div>
                </article>
                <article className="article_1">
                    <h1>Quick to Learn, Easy to Use</h1>
                    <div>Get started immediately without the massive learning curve. 
                         Vectr’s intuitive tools let you focus on what truly matters - creating beautiful graphic designs.</div>
                </article>
                <article className="article_2">
                    <h1>Scale designs to any size without losing clarity</h1>
                    <div>Unlike raster graphics, vector graphics are always crisp and clean. 
                         Create blur-free logos, presentations, cards, brochures, website mockups, or any 2D graphic with Vectr.</div>
                    <img src={require("./images/diferent.png")} alt="diferent"/>
                </article>
                <article className="article_3">
                    <h1>Cross Platform</h1>
                    <div>Use Vectr on the web, or download to your desktop.
                         We'll automatically save and sync your work in real-time, across all platforms.</div>
                    <img src={require("./images/awfwafw.png")} alt="additioanl"/>
                </article>
                <article className="article_4">
                    <h1>Free Forever</h1>
                    <div>Vectr’s basic graphics editor is free forever. 
                         In the future, we'll keep the lights on with a pro account and built-in marketplace.</div>
                    <img src={require("./images/wadafwa.png")} alt="additioanl"/>
                </article>
            </main>
        )
    }
}

export default MainPage;