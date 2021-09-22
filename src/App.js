import React from 'react';
import Home from './Pages/Home';
import Rooms from './Pages/Rooms';
import SigleRoom from './Pages/SigleRoom';
import Error from './Pages/Error';
import {Switch,Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import './App.css';


function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path = "/" component = {Home} />
                <Route exact path = "/rooms/" component = {Rooms} />
                <Route exact path = "/rooms/:slug" component = {SigleRoom} />
                <Route component = {Error} />
            </Switch>

        </>
    );
}

export default App;
