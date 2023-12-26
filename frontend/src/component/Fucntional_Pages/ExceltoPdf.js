import { Heading } from "@chakra-ui/react";
import React from "react";

function ExceltoPdf() {
  return (
    <div className="funtional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">Excel To PDF</Heading>
        <br />
        <p className="Functional-text">
        Make EXCEL spreadsheets easy to read by converting them to PDF.
        </p>

        <input type="file" hidden id="uploadfile" />
        <label className="upload-btn" htmlFor="uploadfile">
          Convert Excel to PDF
        </label>
      </form>
    </div>
  );
}

export default ExceltoPdf;
