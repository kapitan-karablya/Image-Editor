import React, { Component } from "react";
import "./style.css";

class BottomPanel extends Component {
  render() {
    return (
      <div className="bottomPanel">
        <div className="openImage bottomElem">
          <div>
            <img src={"icons/folder.svg"} alt="folder" />
          </div>
          <label>Открыть новое изображение</label>
        </div>
        <div
          className="downloadImage bottomElem"
          onClick={this.downloadClickHandler}
        >
          <div>
            <img src={"icons/download.svg"} alt="download" />
          </div>
          <label>Загрузить изображение</label>
        </div>
      </div>
    );
  }

  async downloadClickHandler() {
    let response = await fetch("https://localhost:5001/api/getjpeg", {
      method: "GET",
      credentials: "include"
    })
    let text = "data:image/jpeg;base64,";
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        text += await response.text();
        window.open(text);
        console.log(text);
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
  }
}

export default BottomPanel;
