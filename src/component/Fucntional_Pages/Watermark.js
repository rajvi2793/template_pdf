import { Heading } from "@chakra-ui/react";
import React from "react";

function Watermark() {
  return (
    <div className="funtional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">Water Mark</Heading>
        <br />
        <p style={{ color: "#0275d8" }}>
          Stamp an image or text over your PDF in seconds. Choose the
          typography, transparency and position.
        </p>

        <input type="file" hidden id="uploadfile" />
        <label className="upload-btn" htmlFor="uploadfile">
          ADD WATERMARK
        </label>
      </form>
    </div>
  );
}

export default Watermark;
