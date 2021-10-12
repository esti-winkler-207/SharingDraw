import React from "react";
import { SliderPicker } from "react-color";

export default function DrawingTools(props) {
  return (
    <>
      <div className="row mb-4 mx-auto">
        <div className="col mr-auto">

        </div>
        <div className="col ml-auto">
          <label className="mr-md-2" htmlFor="Brush Radius">
            Brush Size:
          </label>
          <input
            type="range"
            name="Brush Radius"
            min="1"
            max="20"
            value={props.brushRad}
            onChange={(e) => props.setBrushRad(e.target.value)}
          />
        </div>
      </div>
      <SliderPicker
        color={props.color}
        onChangeComplete={(color) => props.setColor(color.hex)}
      />
    </>
  );
}
