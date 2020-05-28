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
                        <div className='buttons'>
                            <input id="myText" type="number"  className='button size'/>
                            <div style={{width: "15%"}}>
                                <img style={{height: "100%", width: "100%"}} src={"icons/x.svg"} alt="x"/>
                            </div>
                            <input id="myText" type="number"  className='button size'/>
                        </div>
                    </div>
                    <div className='tools'>
                        <label>Пропорции</label>
                        <div className='buttons'>
                            <div className='button cut_b'><div>16:9</div></div>
                            <div className='button cut_b'><div>4:3</div></div>
                            <div className='button cut_b'><div>3:2</div></div>
                            <div className='button cut_b'><div>1:1</div></div>

                        </div>
                    </div>
                </nav>
                <EditField/>
            </div>
        )
    }
}

export default Cut