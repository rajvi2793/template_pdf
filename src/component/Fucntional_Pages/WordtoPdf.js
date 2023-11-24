import { Heading } from "@chakra-ui/react";
import React from "react";

function WordtoPdf() {
  return (
    <div className="funtional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">Word To PDF</Heading>
        <br />
        <p className="Functional-text">
          Make DOC and DOCX files easy to read by converting them to PDF.
        </p>

        <input type="file" hidden id="uploadfile" />
        <label className="upload-btn" htmlFor="uploadfile">
          Word To PDF
        </label>
      </form>
    </div>
  );
}

export default WordtoPdf;
