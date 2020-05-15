import React, {Component} from "react";
import './style.css'
import EditField from "../EditField";


class Cut extends Component {
    render() {
        return (
            <div className='cut edit-menu'>
                <nav id='cut-menu' className='menu-right'>
                    <div className='rotate-tool'>
                        <label className='title'>Обрезать</label>
                        <label>Произвольно</label>
                        <div className='buttons f'>
                            <div className='buttonu y'><div className='ok'>957</div></div>
                            <img src={"icons/x.svg"} alt="x"/>
                            <div className='buttonu y'><div className='ok'>756</div></div>
                        </div>
                        <div className='buttonu save'><div className='oks'>Сохранять пропорции</div></div>
                    </div>
                    <div className='rotate-tool'>
                        <label>Фигурно</label>
                        <div className='buttons'>
                            <div className='buttonu'><img src={"icons/circle.svg"} alt="left"/></div>
                            <div className='buttonu'><img src={"icons/ellipse.svg"} alt="right"/></div>
                            <div className='buttonu'><img src={"icons/heart.svg"} alt="right"/></div>
                        </div>
                    </div>
                </nav>
                <EditField/>
            </div>
        )
    }
}

export default Cut