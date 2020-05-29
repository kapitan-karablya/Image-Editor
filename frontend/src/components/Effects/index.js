import React, { Component } from "react";
import "./style.css";
import EditField from "../EditField";
import Button from "../Button";
import loadImage from "../../helpers/index.js";

class Cut extends Component {
  async blur() {
    let response = await fetch("https://localhost:5001/api/blur?blurSize=5", {
      method: "GET",
      credentials: "include",
    });
    loadImage();
  }

  async blackAndWhite() {
    let response = await fetch("https://localhost:5001/api/discolor?isSepia=false", {
      method: "GET",
      credentials: "include",
    });
    loadImage();
  }

  async sepia() {
    let response = await fetch("https://localhost:5001/api/discolor?isSepia=true", {
      method: "GET",
      credentials: "include",
    });
    loadImage();
  }

  render() {
    return (
      <div className="rotate edit-menu">
        <nav id="effects-menu" className="menu-right">
          <div className="tools">
            <label className="title" style={{ marginBottom: "1vh" }}>
              Окрасить
            </label>
            <div onClick={this.sepia} className="button text_b">
              <div>Сепия</div>
            </div>
            <div onClick={this.blackAndWhite} className="button text_b">
              <div>Черно-белое</div>
            </div>
            <label className="title" style={{ paddingTop: "2vh" }}>
              Размытие
            </label>
            <div onClick={this.blur} className="button text_b">
              <div>Гауссово</div>
            </div>
            <div onClick={this.blur} className="button text_b">
              <div>Круговое</div>
            </div>
          </div>
        </nav>
        <EditField />
      </div>
    );
  }
}

export default Cut;
