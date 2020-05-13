import React from 'react'
import {render} from "react-dom";
import './styles.css';
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
//import Examples from "./components/Examples";
import EditField from "./components/EditField";


class App extends React.Component {
    render() {
        return (
            <div className="body">
                <Sidebar/>
                <EditField/>
            </div>
        );
    }
}

export default App

render(<App/>, document.getElementById('root'));