import React from "react";
import "./tutorials.css"

class Tutorials extends React.Component{
    render(){
        return (
            <div>
                <div id="search">
                    <input type="text" placeholder="Search Tutorials"/>
                    <button>Search</button>
                </div>
                <section id="grid">
                    <article>
                        <div>Web user interface prototyping</div>
                        <button>Read</button>
                    </article>
                    <article>
                        <div>How to create a stunning business card</div>
                        <button>Read</button>
                    </article>
                    <article>
                        <div>Creating beautiful professional presentation</div>
                        <button>Read</button>
                    </article>
                    <article>
                        <div>Creating great twitter header images</div>
                        <button>Read</button>
                    </article>
                    <article>
                        <div>Creating typographic logo</div>
                        <button>Read</button>
                    </article>
                    <article>
                        <div>What are iconic logos and how to create one</div>
                        <button>Read</button>
                    </article>
                    <article>
                        <div>Designing custom T-Shirt image ready for print</div>
                        <button>Read</button>
                    </article>
                    <article>
                        <div>Drawing tree vector graphic</div>
                        <button>Read</button>
                    </article>
                    <article>
                        <div>Creating a watermark in vectr</div>
                        <button>Read</button>
                    </article>
                </section>
            </div>
        )
    }
}

export default Tutorials;