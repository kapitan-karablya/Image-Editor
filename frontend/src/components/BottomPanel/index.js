import React, {Component} from "react";
import './style.css';


class BottomPanel extends Component {
    render() {
        return (
            <div className='bottomPanel'>
                <div className='openImage bottomElem'>
                    <div><img src={"icons/folder.svg"} alt="folder"/></div>
                    <label>Открыть новое изображение</label>
                </div>
                <div className='downloadImage bottomElem' onClick={this.donwloadClickHandler}>
                    <div><img src={"icons/download.svg"} alt="download"/></div>
                    <label>Загрузить изображение</label>
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