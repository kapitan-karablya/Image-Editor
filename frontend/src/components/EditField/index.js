import React, {Component} from "react";
import './style.css';
import EditedImage from "../EditedImage";
import BottomPanel from "../BottomPanel";


class EditField extends Component {
    render() {
        return (
            <div className='editField'>
                <EditedImage/>
                <BottomPanel/>
            </div>
        )
    }
}

export default EditField