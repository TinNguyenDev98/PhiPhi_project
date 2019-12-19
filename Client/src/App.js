import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home_PC from "./Components/PC/Home_PC";
import Home_SP from "./Components/SP/Home_SP"
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
 return (
    <Router>
        <Route exact path="/" component={Home_PC} />
        <Route  path="/sp" component={Home_SP} />
    </Router>
 )
};

export default App;
