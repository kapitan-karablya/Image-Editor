import React, {Component} from "react";
import './style.css'
import EditField from "../EditField";


class TextEdit extends Component {
    render() {
        return (
            <div className='text edit-menu'>
                <nav id='text-menu' className='menu-right'>
                    <div className='underconstruction'><img src={"/images/underconstruction.png"} alt="horizontally"/></div>
                </nav>
                <EditField/>
            </div>
        )
    }
}

export default TextEdit