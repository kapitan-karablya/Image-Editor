import React, {Component} from "react";
import './style.css';

class EditedImage extends Component {
    render() {
        return (
            <div className='editedImage'>
                <img style={{backgroundImage: "url('/images/background.png')"}} src={"images/car.webp"} alt="image"/>
            </div>
        )
    }
}

export default EditedImage