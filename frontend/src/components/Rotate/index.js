import React, { Component } from "react";
import "./style.css";
import EditField from "../EditField";

class Rotate extends Component {
  async rotateLeft() {
    console.log('ss')
    let response = await fetch("https://localhost:5001/api/rotate?angle=270", {
      method: "PUT",
      credentials: "include",
    });
    
  }

  async rotateRight() {
    console.log('ss')
    let response = await fetch("https://localhost:5001/api/rotate?angle=90", {
      method: "PUT",
      credentials: "include",
    });
    
  }

  render() {
    return (
      <div className="rotate edit-menu">
        <nav id="rotate-menu" className="menu-right">
          <div className="rotate-tool">
            <label>Повернуть на 90°</label>
            <div className="buttons">
              <div className="button" onClick={this.rotateLeft}>
                <img src={"icons/rotate-left.svg"} alt="left" />
              </div>
              <div className="button" onClick={this.rotateRight}>
                <img src={"icons/rotate-right.svg"} alt="right" />
              </div>
            </div>
          </div>
          <div className="rotate-tool">
            <label>Наклонить на</label>
            <div className="buttons">
              <div className="button"> </div>
              <div className="button">
                <div className="ok">OK</div>
              </div>
            </div>
          </div>
          <div className="rotate-tool">
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
