import React, {Component} from "react";
import './style.css'
import Home from "../Home";
import {NavLink} from "react-router-dom";

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
                    <img className="arrows" src={"icons/left-arrow.svg"} alt="arrow"/>
                    {images.map((value, index) => {
                        return (
                            <div className="image" onClick={() => Home.clickHandler(value)}  key={index}>
                                <NavLink to={'/rotate'}>
                                <img src={'images/' + value + '.webp'} alt={value}/>
                                </NavLink>
                            </div>
                        )
                    })}
                    <img className="arrows" src={"icons/right-arrow.svg"} alt="arrow"/>
                </div>
            </div>
        )
    }
}

export default Examples