import React from 'react'
import {render} from "react-dom";
import './styles.css';
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Examples from "./components/Examples";



class App extends React.Component {
    render() {
        return (
                <div>
                    <header className="header">
                        <Sidebar />
                    </header>
                    <Main/>
                    <Examples/>
                </div>
        );
    }
}

export default App

render(<App/>, document.getElementById('root'));