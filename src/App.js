import logo from './logo.svg';
import './App.css';
import "./App.scss";
import Chat from "./chat/chat";
import Draw from './draw/canvasDraw';
import Process from "./process/process";
import Home from "./home/home";
import DrawTogether from "./draw/DrawTogether"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import io from "socket.io-client";
import ChatDraw from './chat/chatDraw';



const socket = io.connect('/');

function Appmain(props) {
  return (
    <React.Fragment>
      <div className="right">
        {/* <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        /> */}
         <ChatDraw
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />

        
      </div>
      {/* <div className="left">
        <Process />
      </div> */}
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
          {/* <Route path="/chat/:roomname/:username" component={Appmain} /> */}
          <Route path="/chatDraw/:roomname/:username" component={Appmain} />
        </Switch>
      </div>
    </Router>
  );
}



export default App;
