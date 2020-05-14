import React from "react";
import './style.css'
import {Link} from "react-router-dom";

const sidebarItemsOptions = [
    {text: 'folder', href: '/'},
    {text: 'rotate', href: '/rotate'},
    {text: 'cut', href: '/cut'},
    {text: 'text', href: '/text'},
];

function HideMenu(activeItem, prevItem) {
    console.log(activeItem);
    let elem = document.getElementById(activeItem + '-menu');
    let elemSize;
    if (activeItem !== 'folder')
        elemSize = elem.style.flexBasis;
    if (prevItem !== 'folder')
        document.getElementById(prevItem + '-menu').style.flexBasis = '0px';
    if (activeItem === 'folder')
        return;
    elemSize === '0px' ? elem.style.flexBasis = '20%' : elem.style.flexBasis = '0px';
}

function Sidebar() {
    const [activeItem, setActiveItem] = React.useState('folder');

    let prevItem = activeItem;

    window.onload = function () {
        document.getElementById(activeItem).style.backgroundColor = "#242C39";
    };

    const createClickHandler = (activeItem) => e => {
        e.preventDefault();
        document.getElementById(prevItem).style.backgroundColor = "#19202A";
        document.getElementById(activeItem).style.backgroundColor = "#242C39";
        if (prevItem === activeItem)
            HideMenu(activeItem, prevItem);
        prevItem = activeItem;
        setActiveItem(activeItem);
    };

    const sidebarItems = sidebarItemsOptions.map(item => <SidebarItem item={item} createClickHandler={createClickHandler}/>);

    return (
        <div className='sidebar'>
            {sidebarItems}
        </div>
    )
}

function SidebarItem({createClickHandler, item}) {
    const clickHandler = createClickHandler(item.text);

    return (
            <div
                className='menu-item'
                id={item.text}
                onClick={clickHandler}
            >
                <Link to={item.href}>
                    <div className='link'><img src={'icons/' + item.text + '.svg'} alt={item.text}/></div>
                </Link>

            </div>
    )
}

export default Sidebar




/*class LeftMenu extends Component {
    render() {
        let pages = [
            "folder",
            "rotate",
            "cut",
            "text"
        ];
        return (
            <div className="sidebar">
                {pages.map((value, index) => {
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
            <a href={url}><img src={'icons/'+ this.props.label + '.svg'} alt={this.props.label}/></a>
        </div>
    }

}

export default LeftMenu*/