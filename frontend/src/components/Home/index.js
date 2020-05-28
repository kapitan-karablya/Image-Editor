import React, { Component } from "react";
import "./style.css";
import Examples from "../Examples";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
    this.upload();
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    let imagePreviewUrl = "";

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);

    
    
  }

  upload() {
    let parsedImageUrl = this.state.imagePreviewUrl.split(',')[1];
    console.log(parsedImageUrl);
    let response = fetch("https://localhost:5001/api/upload", {
      method: "PUT",
      body: parsedImageUrl,
      credentials: "include",
      mode: 'cors'
    });
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt="uploadedPhoto" />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div className="home">
        <div className="download">
          <form onSubmit={(e) => this._handleSubmit(e)}>
            <input
              className="fileInput"
              type="file"
              onChange={(e) => this._handleImageChange(e)}
            />
            <button
              className="submitButton"
              type="submit"
              onClick={(e) => this._handleSubmit(e)}
            >
              Upload Image
            </button>
          </form>
          <label>Загрузите изображение</label>
          <div>
            <img src={"icons/folder.svg"} alt="folder" />
          </div>
          <label className="choose-label">или выберите из существующих</label>
        </div>
        <Examples />
      </div>
    );
  }

  
}

export default Home;
