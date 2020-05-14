import React, {Component} from "react";
import './style.css'
import Examples from "../Examples";

class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className='download'>
                    <label>Загрузите изображение</label>
                    <p><img src={"icons/folder.svg"} alt="folder"/></p>
                    <label className="choose-label">или выберите из существующих</label>
                </div>
                <Examples/>
            </div>
        )
    }
}

export default Home