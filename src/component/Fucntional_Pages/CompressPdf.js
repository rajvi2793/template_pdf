import { Heading } from "@chakra-ui/react";
import React from "react";
import "./functional.css";

function CompressPdf() {
  return (
    <div className="funtional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">Compress PDF</Heading>
        <br />
        <p className="Functional-text">
          This is a simple react app to compress pdf files. It uses the html
        </p>

        <input type="file" hidden id="uploadfile" />
        <label className="upload-btn" htmlFor="uploadfile">
          Compress PDF
        </label>
      </form>
    </div>
  );
}

export default CompressPdf;
