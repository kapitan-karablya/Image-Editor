import React, {Component} from "react";
import './style.css';
import  {ima}  from "../Home";

class EditedImage extends Component {

    render() {
        let imagePreviewUrl = ima;
        console.log(imagePreviewUrl);
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} alt="uploadedPhoto"/>;
        } else {
            $imagePreview = (
                <div className="previewText">Please select an Image for Preview</div>
            );
        }
        return (
            <div className='editedImage'>
                <img style={{backgroundImage: "url('/images/background.png')"}} src={imagePreviewUrl} alt="image"/>
            </div>
        )
    }
}

export default EditedImage