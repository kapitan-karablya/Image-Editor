import React, { Component } from "react";
import "./style.css";
import EditField from "../EditField";
import loadImage from "../../helpers/index.js";

class Rotate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 5,
    };
  }

  updateComponent() {
    setTimeout(() => {
      loadImage();
      setTimeout(() => {
        this.forceUpdate();
      }, 500);
    }, 5000);
  }

  async rotateLeft() {
    let response = await fetch("https://localhost:5001/api/rotate?angle=270", {
      method: "GET",
      credentials: "include",
    });
    this.updateComponent();
  }

  async rotateRight() {
    let response = await fetch("https://localhost:5001/api/rotate?angle=90", {
      method: "GET",
      credentials: "include",
    });
    loadImage();
  }

  async rotate() {
    if (document.getElementById("myText").value != null) {
      await fetch(
        "https://localhost:5001/api/rotate?angle=" +
          document.getElementById("myText").value,
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
      <div className="rotate edit-menu">
        <nav id="rotate-menu" className="menu-right">
          <div className="tools">
            <label>Повернуть на 90°</label>
            <div className="buttons">
              <div className="button" onClick={this.rotateLeft.bind(this)}>
                <img src={"icons/rotate-left.svg"} alt="left" />
              </div>
              <div className="button" onClick={this.rotateRight}>
                <img src={"icons/rotate-right.svg"} alt="right" />
              </div>
            </div>
          </div>
          <div className="tools">
            <label>Наклонить на</label>
            <div className="buttons">
              <input id="myText" type="number" className="button slant" />
              <div className="button" onClick={this.rotate}>
                <div>OK</div>
              </div>
            </div>
          </div>
          <div className="tools">
            <label>Отразить</label>
            <div className="buttons">
              <div className="button flip">
                <img src={"/icons/flip-horizontally.svg"} alt="horizontally" />
              </div>
              <div className="button flip">
                <img src={"icons/flip-vertical.svg"} alt="vertically" />
              </div>
            </div>
          </div>
        </nav>
        <EditField />
      </div>
    );
  }
}

export default Rotate;

/*<div className='rotate-tool'>
                        <label>Повернуть на 90°</label>
                        <div><img src={"icons/folder.svg"} alt="folder"/></div>
                        <div><img src={"icons/folder.svg"} alt="folder"/></div>
                    </div>
<div className='rotate-tool'>
    <label>Наклонить на</label>
<div></div>
<div>OK</div>
</div>
<div className='rotate-tool'>
<label>Отразить</label>
<div></div>
<div><img src={"icons/folder.svg"} alt="folder"/></div>
</div>*/
