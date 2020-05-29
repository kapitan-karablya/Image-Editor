import React, { Component } from "react";
import "./style.css";
import EditField from "../EditField";
import loadImage from "../../helpers/index.js";

class Cut extends Component {
  async relationFirst() {
    let response = await fetch(
      "https://localhost:5001/api/crop?relation=16:9",
      {
        method: "GET",
        credentials: "include",
      }
    );
    loadImage();
  }

  async relationSecond() {
    let response = await fetch("https://localhost:5001/api/crop?relation=4:3", {
      method: "GET",
      credentials: "include",
    });
    loadImage();
  }

  async cut() {
    if (
      document.getElementById("first").value != null &&
      document.getElementById("second").value != null
    ) {
      let response = await fetch(
        "https://localhost:5001/api/crop?relation=none&startX=0&startY=0&stopX=" +
          document.getElementById("first").value +
          "&stopY=" +
          document.getElementById("second").value,
        {
          method: "GET",
          credentials: "include",
        }
      );
      loadImage();
    }
  }

  render() {
    return (
      <div className="edit-menu">
        <nav id="cut-menu" className="menu-right">
          <div className="tools">
            <label
              onClick={this.cut}
              className="title"
              style={{ paddingBottom: "4vh" }}
            >
              Обрезать
            </label>
            <label>Произвольно</label>
            <div className="buttons">
              <input id="first" type="number" className="button size" />
              <div style={{ width: "15%" }}>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src={"icons/x.svg"}
                  alt="x"
                />
              </div>
              <input id="second" type="number" className="button size" />
            </div>
          </div>
          <div className="tools">
            <label>Пропорции</label>
            <div className="buttons">
              <div onClick={this.relationFirst} className="button cut_b">
                <div>16:9</div>
              </div>
              <div onClick={this.relationSecond} className="button cut_b">
                <div>4:3</div>
              </div>
              <div className="button cut_b">
                <div>3:2</div>
              </div>
              <div className="button cut_b">
                <div>1:1</div>
              </div>
            </div>
          </div>
        </nav>
        <EditField />
      </div>
    );
  }
}

export default Cut;
