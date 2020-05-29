import React, {Component} from "react";
import './style.css';
import {ima, updateImage} from "../Home";
import loadImage from "../../helpers/index.js"

class EditedImage extends Component {

    updateComponent(){
        setTimeout(() => this.forceUpdate(), 300);
    }

    componentWillMount(){
        loadImage();
        this.updateComponent();
    }

    update(){
        loadImage();
        this.updateComponent();
        console.log('ss')
    }

    render() {
        
        return (
            <div  className='editedImage'>
                <img onClick={this.update.bind(this)} style={{backgroundImage: "url('/images/background.png')"}} src={ima} alt="image1"/>
            </div>
        )
    }

}

export default EditedImage