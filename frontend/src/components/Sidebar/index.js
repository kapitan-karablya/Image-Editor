import React from "react";
import './style.css'
import {Link, NavLink} from "react-router-dom";

const sidebarItemsOptions = [
    {text: 'folder', href: '/home'},
    {text: 'rotate', href: '/rotate'},
    {text: 'cut', href: '/cut'},
    {text: 'text', href: '/text'},
];

function HideMenu(activeItem, prevItem) {
    let elem = document.getElementById(activeItem + '-menu');
    let elemSize;
    if (activeItem !== 'folder')
        elemSize = elem.style.width;
    if (prevItem !== 'folder')
        document.getElementById(prevItem + '-menu').style.width = '0px';
    if (activeItem === 'folder')
        return;
    elemSize === '0px' ? elem.style.width = '20%' : elem.style.width = '0px';
}

function Sidebar() {
    const [activeItem, setActiveItem] = React.useState('folder');

    let prevItem = activeItem;

    const createClickHandler = (activeItem) => e => {
        e.preventDefault();
        if (prevItem === activeItem)
            HideMenu(activeItem, prevItem);
        prevItem = activeItem;
        setActiveItem(activeItem);
    };

    const sidebarItems = sidebarItemsOptions.map(item => <SidebarItem item={item}
                                                                      createClickHandler={createClickHandler}/>);

    return (
        <div className='sidebar'>
            {sidebarItems}
        </div>
    )
}

function SidebarItem({createClickHandler, item}) {
    const clickHandler = createClickHandler(item.text);

    return (
        <div className='menu-item' onClick={clickHandler}>
            <NavLink activeClassName="active" to={item.href}>
                <div className='link'><img src={'icons/' + item.text + '.svg'} alt={item.text}/></div>
            </NavLink>
        </div>
    )
}

export default Sidebar