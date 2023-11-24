import { Heading } from "@chakra-ui/react";
import React from "react";

function PdftoPowerpint() {
  return (
    <div className="funtional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">PDF To PowerPoint</Heading>
        <br />
        <p className="Functional-text">
          Turn your PDF files into easy to edit PPT and PPTX slideshows.
        </p>

        <input type="file" hidden id="uploadfile" />
        <label className="upload-btn" htmlFor="uploadfile">
          PDF to PPT
        </label>
      </form>
    </div>
  );
}

export default PdftoPowerpint;
