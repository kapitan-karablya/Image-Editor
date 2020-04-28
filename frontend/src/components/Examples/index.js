import React, {Component} from "react";
import './style.css'

class Examples extends Component {
    render() {
        let images = [
            "flowers",
            "cat",
            "car",
        ];
        return (
            <div className="img-area">
                <div className="img-examples">
                    <img className="arrows" src={"icons/left-arrow.svg"} alt="folder"/>
                    {images.map((value, index) => {
                        return (
                            <div className="image" key={index}>
                                <img src={'images/' + value + '.webp'} alt={value}/>
                            </div>
                        )
                    })}
                    <img className="arrows" src={"icons/right-arrow.svg"} alt="folder"/>
                </div>
            </div>
        )
    }
}

export default Examples