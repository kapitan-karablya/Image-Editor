import React, {Component} from "react";
import './style.css'


class LeftMenu extends Component {
    render() {
        let menus = [
            "folder",
            "Cut"
        ];
        return (
            <div className="sidebar">
                {menus.map((value, index) => {
                    return<div key={index}><Link label = {value}/></div>
                })}
            </div>

        )
    }
}

class Link extends Component {
    render() {
        const url = "/" + this.props.label.toLowerCase().trim().replace(" ", "-");
        return <div className='button-elements'>
            <a href={url}><img src="/frontend/icons/folder.png" className="img-fluid" alt="Responsive image"/></a>
        </div>
    }

}

export default LeftMenu