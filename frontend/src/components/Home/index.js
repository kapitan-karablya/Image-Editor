import React, {Component} from "react";
import './style.css'
import Examples from "../Examples";

export let ima = "images/flowers.webp";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {file: "", imagePreviewUrl: ""};
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
        };

        reader.readAsDataURL(file);

        let parsedImageUrl = this.state.imagePreviewUrl;
        //window.location.assign('http://localhost:3000/rotate')


        let response = fetch("https://localhost:5001/api/upload", {
            method: "PUT",
            body: parsedImageUrl,
        }).then(response => console.log(response))

    }

    render() {
        let {imagePreviewUrl} = this.state;
        console.log(imagePreviewUrl);
        let $imagePreview = null;
        if (imagePreviewUrl) {
            ima = imagePreviewUrl;
            $imagePreview = <img src={imagePreviewUrl} alt="uploadedPhoto"/>;
        } else {
            $imagePreview = (
                <div className="previewText">Please select an Image for Preview</div>
            );
        }
        return (
            <div className="home">
                <div className="download">
                    <label>Загрузите изображение</label>
                    <div className="dow_image">
                        <label>
                            <img src={"icons/folder.svg"} alt="folder"/>
                            <input type="file" onChange={(e) => this._handleImageChange(e)}/>
                        </label>
                    </div>
                    <label className="choose-label">или выберите из существующих</label>
                </div>
                <Examples/>
            </div>
        );
    }
    upload() {
    }

    static clickHandler(value) {
        ima = 'images/' + value + '.webp';
    }
}

export default Home