import React from 'react'
import {render} from "react-dom";
import './styles.css';
import LeftMenu from "./components/LeftMenu";
import Main from "./components/Main";
import Examples from "./components/Examples";



class App extends React.Component {
    render() {
        return (
                <div>
                    <header className="header">
                        <LeftMenu />
                    </header>
                    <Main/>
                    <Examples/>
                </div>
        );
    }
}

export default App

render(<App/>, document.getElementById('root'));