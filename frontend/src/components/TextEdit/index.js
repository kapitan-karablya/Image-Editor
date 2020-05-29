import React, {Component} from "react";
import './style.css'
import EditField from "../EditField";
import Button from "../Button";
import loadImage from "../../helpers/index.js";

const buttons = [
    {name: 'bold'},
    {name: 'italic'},
    {name: 'tracing'},
    {name: 'underline'},
];

class TextEdit extends Component {
    async writeTextBottom() {
        let response = await fetch("https://localhost:5001/api/writetext?text=превет&isBottom=true&fontSize=100", {
          method: "GET",
          credentials: "include",
        });
        loadImage();
      }

      async writeTextTop() {
        let response = await fetch("https://localhost:5001/api/WriteText?text=превет&isBottom=false&fontSize=100", {
          method: "GET",
          credentials: "include",
        });
        loadImage();
      }

    render() {
        return (
            <div className='rotate edit-menu'>
                <nav id='text-menu' className='menu-right'>
                    <div className='tools'>
                        <div className='button text_b'>
                            <div>Добавить текст</div>
                        </div>
                        <select className='button selector'>
                            <option>Arial</option>
                            <option>Times New Roman</option>
                            <option>California</option>
                        </select>
                    </div>
                    <div className='tools'>
                    <label>Положение</label>
                        <div className='buttons'>
                            <div onClick={this.writeTextTop} className='button position'><div>Сверху</div></div>
                            <div onClick={this.writeTextBottom} className='button position'><div>Снизу</div></div>
                        </div>
                    </div>
                    <div className='tools'>

                        <div className='text_prop'>
                            <div className='prop'>
                                <div>Цвет</div>
                                <select className='button selector color'>
                                    <option>Красный</option>
                                    <option>Желтый</option>
                                    <option>Зеленый</option>
                                </select>
                            </div>
                            <div className='prop'>
                                <div>Размер</div>
                                <input id="myText" type="number" className='button input'/>
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
