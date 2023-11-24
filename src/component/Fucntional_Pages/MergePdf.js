import { Heading } from '@chakra-ui/react'
import React from 'react'

function MergePdf() {
  return (
    <div className="funtional-body-wrapper">
    <form className="functional-form">
      <Heading className="text-center">Merge PDF</Heading>
      <br />
      <p className="Functional-text">
      Combine PDFs in the order you want with the easiest PDF merger available.
      </p>

      <input type="file" hidden id="uploadfile" />
      <label className="upload-btn" htmlFor="uploadfile">
        Merge PDF
      </label>
    </form>
  </div>
  )
}

export default MergePdf