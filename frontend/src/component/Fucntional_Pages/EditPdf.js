import { Heading } from "@chakra-ui/react";
import React from "react";

function EditPdf() {
  return (
    <div className="funtional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">Edit PDF</Heading>
        <br />
        <p className="Functional-text">
          Add text, images, shapes or freehand annotations to a PDF document.
          Edit the size, font, and color of the added content.
        </p>

        <input type="file" hidden id="uploadfile" />
        <label className="upload-btn" htmlFor="uploadfile">
          Edit PDF
        </label>
      </form>
    </div>
  );
}

export default EditPdf;
