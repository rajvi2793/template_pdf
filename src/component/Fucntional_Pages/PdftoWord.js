import { Heading } from '@chakra-ui/react'
import React from 'react'

function PdftoWord() {
  return (
    <div className="funtional-body-wrapper">
    <form className="functional-form">
      <Heading className="text-center">PDF To Word</Heading>
      <br />
      <p className="Functional-text">
      Easily convert your PDF files into easy to edit DOC and DOCX documents. The converted WORD document is almost 100% accurate.

      </p>

      <input type="file" hidden id="uploadfile" />
      <label className="upload-btn" htmlFor="uploadfile">
        PDF To Word
      </label>
    </form>
  </div>
  )
}

export default PdftoWord