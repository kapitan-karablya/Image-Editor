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
                <div className='downloadImage bottomElem'>
                    <div><img src={"icons/download.svg"} alt="download"/></div>
                    <label>Загрузить изображение</label>
                </div>
            </div>
        )
    }
}


export default BottomPanel