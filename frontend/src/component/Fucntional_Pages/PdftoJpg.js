import { Heading } from '@chakra-ui/react'
import React from 'react'

function PdftoJpg() {
  return (
    <di className="funtional-body-wrapper">
    <form className="functional-form">
      <Heading className="text-center">PDF to JPG</Heading>
      <br />
      <p className="Functional-text">
      Convert each PDF page into a JPG or extract all images contained in a PDF.
      </p>

      <input type="file" hidden id="uploadfile" />
      <label className="upload-btn" htmlFor="uploadfile">
        PDF To JPG
      </label>
    </form>
  </di>
  )
}

export default PdftoJpg