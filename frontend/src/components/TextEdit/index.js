import React, {Component} from "react";
import './style.css'
import EditField from "../EditField";

class Rotate extends Component {
    render() {
        return (
            <div className='rotate edit-menu'>
                <nav id='rotate-menu' className='menu-right'>
                    <div className='tools text_t'>
                        <div className='button text_b'><p>Добавить текст</p></div>
                        <div className='button text_b'>Выберите шрифт</div>
                        <div className='text_prop'>
                            <div className='prop'>
                                <label>Цвет</label>
                                <div className='button'></div>
                            </div>
                            <div className='prop'>
                                <label>Цвет</label>
                                <div className='button'>s</div>
                            </div>
                        </div>

                    </div>
                    <div className='tools'>
                        <label>Эффекты</label>
                        <div className='buttons'>
                            <div className='button param'><img src={"/icons/bold.svg"} alt="bold"/></div>
                            <div className='button param'><img src={"icons/italic.svg"} alt="italic"/></div>
                            <div className='button param'><img src={"icons/tracing.svg"} alt="tracing"/></div>
                            <div className='button param'><img src={"icons/underline.svg"} alt="underline"/></div>

                        </div>
                    </div>

                </nav>
                <EditField/>
            </div>
        )
    }
}

export default Rotate
