import React, { PureComponent } from "react";
import "./style.css";

class EditedImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state ={
            imageUrl: ""
        }
    }
    
    imageUrl = "data:image/jpeg;base64,";
  async loadImage() {
    let response = await fetch("https://localhost:5001/api/getimage", {
      method: "GET",
      credentials: "include",
    });
    let text = "data:image/jpeg;base64,";
    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      text += await response.text();
      this.setState({
          imageUrl: text
      });
      
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }

  render() {
      this.loadImage();
    return (
      <div className="editedImage">
        <img
          style={{ backgroundImage: "url('/images/background.png')" }}
          src={this.state.imageUrl}
          alt="image1"
        />
      </div>
    );
  }
}

export default EditedImage;
