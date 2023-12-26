import { Heading } from "@chakra-ui/react";
import React from "react";

function PowerpointtoPdf() {
  return (
    <div className="funtional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">PowerPoint To PDF</Heading>
        <br />
        <p className="Functional-text">
          Make PPT and PPTX slideshows easy to view by converting them to PDF.
        </p>

        <input type="file" hidden id="uploadfile" />
        <label className="upload-btn" htmlFor="uploadfile">
          PPT To PDF
        </label>
      </form>
    </div>
  );
}

export default PowerpointtoPdf;
