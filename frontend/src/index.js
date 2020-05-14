import React from 'react'
import {render} from "react-dom";
import './styles.css';
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Examples from "./components/Examples";
import EditField from "./components/EditField";
import {BrowserRouter, Switch, Route} from 'react-router-dom';


class App extends React.Component {
    render() {
        return (
            <div className="body">
                <Sidebar/>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/rotate' component={EditField}/>
                </Switch>

            </div>
        );
    }
}

export default App

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));