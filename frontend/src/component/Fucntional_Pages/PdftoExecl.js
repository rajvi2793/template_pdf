import { Heading } from '@chakra-ui/react'
import React from 'react'

function PdftoExecl() {
  return (
    <div className="funtional-body-wrapper">
    <form className="functional-form">
      <Heading className="text-center">PDF To Excel</Heading>
      <br />
      <p className="Functional-text">
      Pull data straight from PDFs into Excel spreadsheets in a few short seconds.
      </p>

      <input type="file" hidden id="uploadfile" />
      <label className="upload-btn" htmlFor="uploadfile">
        PDF to Excel
      </label>
    </form>
  </div>
  )
}

export default PdftoExecl