import { Heading } from "@chakra-ui/react";
import React from "react";

function SplitPdf() {
  return (
    <div className="funtional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">Split PDF</Heading>
        <br />
        <p className="Functional-text">
          Separate one page or a whole set for easy conversion into independent
          PDF files.
        </p>
        <input type="file" hidden id="uploadfile" />
        <label className="upload-btn" htmlFor="uploadfile">
          SPLIT PDF
        </label>
      </form>
    </div>
  );
}

export default SplitPdf;
