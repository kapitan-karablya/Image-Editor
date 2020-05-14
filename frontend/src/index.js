import React from 'react'
import {render} from "react-dom";
import './styles.css';
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Cut from "./components/Cut";
import Rotate from "./components/Rotate";
import {BrowserRouter, Switch, Route} from 'react-router-dom';


class App extends React.Component {
    render() {
        return (
            <div className="body">
                <Sidebar/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/rotate' component={Rotate}/>
                    <Route path='/cut' component={Cut}/>
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