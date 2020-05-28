import React, {Component} from "react";
import './style.css'
import EditField from "../EditField";
import Button from "../Button";

const buttons = [
    {name: 'bold'},
    {name: 'italic'},
    {name: 'tracing'},
    {name: 'underline'},
];

class TextEdit extends Component {

    render() {
        return (
            <div className='rotate edit-menu'>
                <nav id='text-menu' className='menu-right'>
                    <div className='tools text_t'>
                        <div className='button text_b'>
                            <div>Добавить текст</div>
                        </div>
                        <select className='button selector'>
                            <option>Arial</option>
                            <option>Times New Roman</option>
                            <option>California</option>
                        </select>
                        <div className='button text_b'>
                            <div>Шрифт</div>
                        </div>
                        <div className='text_prop'>
                            <div className='prop'>
                                <div>Цвет</div>
                                <div className='button'>d</div>
                            </div>
                            <div className='prop'>
                                <div>Цвет</div>
                                <div className='button'>
                                    <div>s</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tools'>
                        <label>Эффекты</label>
                        <div className='buttons'>
                            {buttons.map(item => <Button name={item.name}/>)}
                        </div>
                    </div>
                </nav>
                <EditField/>
            </div>
        )
    }
}

export default TextEdit
