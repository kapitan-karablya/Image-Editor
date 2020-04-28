import React from 'react'
import {render} from "react-dom";
import './styles.css';
import LeftMenu from "./components/LeftMenu";


class App extends React.Component {
    render() {
        return (
                <div>
                    <header className="header">
                        <LeftMenu />
                    </header>
                </div>
        );
    }
}

export default App

render(<App/>, document.getElementById('root'));