import React, {Component} from "react";
import './style.css'

class ImageField extends Component {
    render() {
        return (
            <div className="main">
                <div className='download'>
                    <p><img src={"icons/folder.svg"} alt="folder"/></p>
                </div>
            </div>
        )
    }
}

export default ImageField