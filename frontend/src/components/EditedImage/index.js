import React, {Component} from "react";
import './style.css';
import {ima} from "../Home";

class EditedImage extends Component {

    render() {
        return (
            <div className='editedImage'>
                <img style={{backgroundImage: "url('/images/background.png')"}} src={ima} alt="image"/>
            </div>
        )
    }
}

export default EditedImage