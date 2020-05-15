import React, {Component} from "react";
import './style.css'
import EditField from "../EditField";


class Cut extends Component {
    render() {
        return (
            <div className='cut edit-menu'>
                <nav id='cut-menu' className='menu-right'>
                    <div className='underconstruction'><img src={"/images/underconstruction.png"} alt="horizontally"/></div>
                </nav>
                <EditField/>
            </div>
        )
    }
}

export default Cut