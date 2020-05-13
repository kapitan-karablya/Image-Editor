import React, {Component} from "react";
import './style.css';

class EditedImage extends Component {
    render() {
        return (
            <div className='editedImage'>
                <p><img src={"images/car.webp"} alt="image"/></p>
            </div>
        )
    }
}

export default EditedImage