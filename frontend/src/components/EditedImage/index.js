import React, {Component} from "react";
import './style.css';
import {ima} from "../Home";
import loadImage from "../../helpers/index.js"

class EditedImage extends Component {

    componentWillMount(){
        loadImage();
    }

    render() {
        
        return (
            <div className='editedImage'>
                <img style={{backgroundImage: "url('/images/background.png')"}} src={ima} alt="image1"/>
            </div>
        )
    }

}

export default EditedImage