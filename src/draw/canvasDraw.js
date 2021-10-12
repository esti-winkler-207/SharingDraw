// import React from "react";
// import ReactDOM from "react-dom";
// import CanvasDraw from "react-canvas-draw";

// // import { useIsMobileOrTablet } from "./utils/isMobileOrTablet";


// function Draw() {
// //   const isMobOrTab = useIsMobileOrTablet();

//   return (
//     <div className="App">
//       {/* <h1>React-Canvas-Draw</h1>
//       <h3>A simple yet powerful canvas-drawing component for React</h3> */}
  
//       {/* <p>
//         <span role="img" aria-label="fingers pointing down">
//           👇👇👇👇
//         </span>{" "}
//         Use your {isMobOrTab ? "finger" : "mouse"} to draw{" "}
//         <span role="img" aria-label="fingers pointing down">
//           👇👇👇👇
//         </span>
//       </p> */}
//       <CanvasDraw
//         style={{
//           boxShadow:
//             "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.9)"
//         }}
//       />
//       {/* <p>
//         Like what you see? Play around in{" "}
//         <a href="https://codesandbox.io/s/6lv410914w">this CodeSandbox</a> & see
//         some more{" "}
//         <a href="https://embiem.github.io/react-canvas-draw/">Advanced Demos</a>
//         !
//       </p> */}
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Draw />, rootElement);
// export default Draw;


import React, { useState, useRef } from "react";

import CanvasDraw from "react-canvas-draw";
import DrawingTools from "./DrawingTools";

function Draw(props) {
  const canvasRef = useRef();
  const [paint,setPaint]=useState();
  const [brushRad, setBrushRad] = useState(5);
  const [color, setColor] = useState("#444");


  function savePaint(){
      setPaint(canvasRef);
    //   let image = new Image();
    //   image.src = paint.toDataURL();
      console.log(paint);
  }

  return (
    <div className="container">
              <div className="single-prompt-app App">
        {/* <Header handleClick={props.handleClick} selected={"Draw"} />
        <Intro /> */}
        <div className="mx-2">
          <DrawingTools
            brushRad={brushRad}
            setBrushRad={setBrushRad}
            color={color}
            setColor={setColor}
            canvasRef={canvasRef}
          />
          <CanvasDraw
            ref={canvasRef}
            canvasWidth={"300%"}
            canvasHeight={500}
            brushRadius={brushRad}
            brushColor={color}
          />
          <button onClick={savePaint}>save change</button>
        </div>
      </div>



      
    </div>

    






  );
}

export default Draw;

