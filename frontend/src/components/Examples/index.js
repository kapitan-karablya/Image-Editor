import React, {Component} from "react";
import './style.css'

class Examples extends Component {
    render() {

        return (
            <div className="img-area">
                <div className="img-examples">
                    <img className="arrows" src={"icons/left-arrow.svg"} alt="folder"/>
                    <div className="image"><img src={"images/flowers.webp"} alt="folder"/></div>
                    <div className="image"><img src={"images/cat.webp"} alt="folder"/></div>
                    <div className="image"><img src={"images/car.webp"} alt="folder"/></div>
                    <img className="arrows" src={"icons/right-arrow.svg"} alt="folder"/>
                </div>
            </div>
        )
    }
}

export default Examples