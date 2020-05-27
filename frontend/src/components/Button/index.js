import React, {Component} from "react";
import './style.css'


class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {bold: false, border: "3px solid #19202A"};
    }

    clickHandler() {
        if (!this.state.bold)
            this.setState({bold: true});
        else this.setState({bold: false});
    }

    render() {
        if (this.state.bold)
            this.state.border = '3px solid #D1D7E4';
        else this.state.border = '3px solid #19202A';
        if (this.props.name != null) {
            return (
                <div className='button param' onClick={() => this.clickHandler()} style={{border: this.state.border}}>
                    <img src={'icons/' + this.props.name + '.svg'} alt={this.props.name}/>
                </div>)
        }
        return (
            <div></div>
        )
    }
}

export default Button