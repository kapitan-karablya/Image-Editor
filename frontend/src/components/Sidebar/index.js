import React from "react";
import './style.css'

const sidebarItemsOptions = [
    {text: 'folder'},
    {text: 'rotate'},
    {text: 'cut'},
    {text: 'text'},
];

function Sidebar() {
    const [activeItem, setActiveItem] = React.useState('folder');

    let prevItem = activeItem;

    window.onload = function() {
        document.getElementById(activeItem).style.backgroundColor = "#242C39";
    };

    const createClickHandler = (activeItem) => e => {
        e.preventDefault();
        document.getElementById(prevItem).style.backgroundColor = "#19202A";
        document.getElementById(activeItem).style.backgroundColor = "#242C39";
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
            <img src={'icons/' + item.text + '.svg'} alt={item.text}/>
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