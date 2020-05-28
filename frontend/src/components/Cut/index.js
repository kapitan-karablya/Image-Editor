import React, {Component} from "react";
import './style.css'
import EditField from "../EditField";


class Cut extends Component {
    render() {
        return (
            <div className='edit-menu'>
                <nav id='cut-menu' className='menu-right'>
                    <div className='tools'>
                        <label className='title'  style={{paddingBottom:"4vh"}}>Обрезать</label>
                        <label>Произвольно</label>
                        <div className='edit buttons'>
                            <input id="myText" type="number"  className='button size'/>
                            <div style={{width: "15%"}}>
                                <img style={{height: "100%", width: "100%"}} src={"icons/x.svg"} alt="x"/>
                            </div>
                            <input id="myText" type="number"  className='button size'/>
                        </div>
                        <div className='button save_proportion'>
                            <div>Сохранять пропорции</div>
                        </div>
                    </div>
                    <div className='tools'>
                        <label>Фигурно</label>
                        <div className='edit buttons'>
                            <div className='button cut_b'><img src={"icons/circle.svg"} alt="circle"/></div>
                            <div className='button cut_b'><img src={"icons/ellipse.svg"} alt="ellipse"/></div>
                            <div className='button cut_b'><img src={"icons/heart.svg"} alt="heart"/></div>
                        </div>
                    </div>
                </nav>
                <EditField/>
            </div>
        )
    }
}

export default Cut