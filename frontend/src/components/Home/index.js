import React, { Component } from "react";
import "./style.css";
import Examples from "../Examples";
import loadImage from "../../helpers/index.js"

export let ima = loadImage();

export function updateImage(imageUrl){
    ima = imageUrl;
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
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

    //window.location.assign('http://localhost:3000/rotate')
  }

  upload() {
    let parsedImageUrl = this.state.imagePreviewUrl.split(",")[1];
    console.log(parsedImageUrl);
    fetch("https://localhost:5001/api/upload", {
      method: "PUT",
      body: parsedImageUrl,
      credentials: "include",
      mode: "cors",
    });
  }

  

  render() {
    let { imagePreviewUrl } = this.state;

    let $imagePreview = null;
    let isLoaded = false;
    loadImage().then(result => isLoaded = result);
    if (!isLoaded && imagePreviewUrl) {
      this.upload();
      ima = imagePreviewUrl;
      $imagePreview = <img src={imagePreviewUrl} alt="uploadedPhoto" />;
    } else {
      
    }
    return (
      <div className="home">
        <div className="download">
          <label>Загрузите изображение</label>
          <div className="dow_image">
            <label>
              <img src={"icons/folder.svg"} alt="folder" />
              <input type="file" onChange={(e) => this._handleImageChange(e)} />
            </label>
          </div>
          <label className="choose-label">или выберите из существующих</label>
        </div>
        <Examples />
      </div>
    );
  }

  static clickHandler(value) {
    ima = "images/" + value + ".webp";
  }
}

export default Home;
