import React, {Component} from "react";
import './style.css'
import EditField from "../EditField";
import Button from "../Button";


class Cut extends Component {
    render() {
        return (
            <div className='rotate edit-menu'>
                <nav id='text-menu' className='menu-right'>
                    <div className='tools'>
                        <label className='title' style={{marginBottom:"1vh"}}>Окрасить</label>
                        <div className='button text_b'>
                            <div>Степия</div>
                        </div>
                        <div className='button text_b'>
                            <div>Черно-белое</div>
                        </div>
                        <label className='title' style={{paddingTop:"2vh"}}>Размытие</label>
                        <div className='button text_b'>
                            <div>Гауссово</div>
                        </div>
                        <div className='button text_b'>
                            <div>Круговое</div>
                        </div>
                    </div>
                </nav>
                <EditField/>
            </div>
        )
    }
}

export default Cut