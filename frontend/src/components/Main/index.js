import React, {Component} from "react";
import './style.css'

class Main extends Component {
    render() {
        return (
            <div className="container-fluid main">
                <div className='download'>
                    <label>Загрузите изображение</label>
                    <p><img src={"icons/folder.svg"} alt="folder"/></p>
                    <label>или выберите из существующих</label>
                </div>
            </div>

        )
    }
}

export default Main