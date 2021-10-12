import "./chat.scss";
import { to_Decrypt, to_Encrypt,to_Decrypt_pic } from "../aes.js";
import { process } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import CanvasDraw from "react-canvas-draw";
import DrawingTools from "../draw/DrawingTools";
//gets the data from the action object and reducers defined earlier
function ChatDraw({ username, roomname, socket }) {
  
  // const [color,setColor]=useState("#ffc600");
  const [width,setWidth]=useState(400);
  const [height,setHeight]=useState(400);
  const [lazyRadius,setLazyRadius]=useState(10);
  const [brushRadius,setBrushRadius]=useState(12);
  const [saveableCanvas,setSaveableCanvas] =useState();
  const [loadableCanvas,setLoadableCanvas] =useState([]);
  const [picture,setPicture]= useState([]);
  const [showHistoryCanvas,setShowHistoryCanvas]=useState(false);
  const canvasRef = useRef();
  const [brushRad, setBrushRad] = useState(5);
  const [color, setColor] = useState("#444");
  const [messages,setMessages]=useState([]);

  const dispatch = useDispatch();
  
  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      //decypt the message
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
      let drawObg=messages.reduce((i)=>i.text);
    
     });
  }, [socket]);




  return (
    <div className="chat">
      <div className="user-name">
        <h2>
          {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
        </h2>
      </div>
      
        <div className="tools">
          <button
            onClick={() => {
              setShowHistoryCanvas(true);
              localStorage.setItem(
                "savedDrawing",
                saveableCanvas.getSaveData()
              );
              // let storage=localStorage.getItem("savedDrawing")
              // const ans= to_Encrypt(storage)
              // console.log(ans);
              // socket.emit("drawing",ans);
              // storage="";
              if (saveableCanvas) {
                //encrypt the message here
                const ans = to_Encrypt(saveableCanvas.getSaveData());
                console.log(ans);
                socket.emit("chat", ans);
                //setText("");
              }
             

            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              saveableCanvas.clear();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              saveableCanvas.undo();
            }}
          >
            Undo
          </button>
     
        </div>
        <div className="">
        <DrawingTools
            brushRad={brushRad}
            setBrushRad={setBrushRad}
            color={color}
            setColor={setColor}
            canvasRef={canvasRef}
          /></div>
        <CanvasDraw
          ref={canvasDraw => (setSaveableCanvas(canvasDraw), canvasRef)}
          canvasWidth={width}
          canvasHeight={height}
          brushRadius={brushRad}
          brushColor={color}
        />
        { showHistoryCanvas ?
        <div className="draw-history">
          Drawing history
          <br/>
          <span onClick={()=>setShowHistoryCanvas(false)}>X</span>
        <CanvasDraw
          disabled
          hideGrid
          ref={canvasDraw=>(setPicture(canvasDraw))}
          saveData={localStorage.getItem("savedDrawing")}
        /></div> :null }
    </div> 
  );
}
export default ChatDraw;
