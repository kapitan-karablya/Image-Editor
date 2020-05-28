import React from 'react'
import {render} from "react-dom";
import './styles.css';
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Cut from "./components/Cut";
import Effects from "./components/Effects";
import Rotate from "./components/Rotate";
import TextEdit from "./components/TextEdit";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Redirect from "react-router-dom/es/Redirect";
import loadImage from "./helpers/index.js";



class App extends React.Component {
    componentWillMount(){
        loadImage();
    }
    render() {
        
        return (
            <div className="body">
                <Sidebar/>
                <Switch>
                    <Redirect exact from = "/" to = "/home"/>
                    <Route exact path='/home' component={Home}/>
                    <Route path='/rotate' component={Rotate}/>
                    <Route path='/cut' component={Cut}/>
                    <Route path='/text' component={TextEdit}/>
                    <Route path='/effects' component={Effects}/>
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