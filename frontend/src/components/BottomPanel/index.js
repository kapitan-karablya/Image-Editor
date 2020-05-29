import React, {Component} from "react";
import './style.css';
import {NavLink} from "react-router-dom";


class BottomPanel extends Component {
    render() {
        return (
            <div className='bottomPanel'>
                <div className="undo-redo" >
                    <div><img src={"icons/undo.svg"} alt="folder"/></div>
                </div>
                <NavLink className="home-nav" to={'/home'}>
                <div className='openImage bottomElem'>
                    <div><img src={"icons/folder.svg"} alt="folder"/></div>
                    <label>Открыть новое изображение</label>
                </div></NavLink>
                <div className="undo-redo" >
                    <div><img src={"icons/redo.svg"} alt="folder"/></div>
                </div>
            </div>
        )
    }

    async donwloadClickHandler(){
        let resposne = await fetch("https://localhost:5001/api/getjpeg", {
            method: 'GET',
            credentials: 'include'
        });
        let text = "";
        if (resposne.ok){
            text += await resposne.text();
            console.log(text);
        }
    }
}


export default BottomPanel