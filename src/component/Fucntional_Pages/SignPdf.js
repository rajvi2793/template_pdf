////made modal with upload btn and selected file name
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Heading,Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

// function SignPdf() {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [templatePDf, setTemplatePDf] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     const pdfFile = event.target.files[0];
//     setPdfFile(pdfFile);
//     if (pdfFile) {
//       navigate(`/test1`, { state: { pdfFile: pdfFile } });
//     }
//   }
//   const handleInputUpload = (event) => {
//     const uploadedFile = event.target.files[0];
//     if (uploadedFile) {
//       setTemplatePDf(uploadedFile);
//     }
//   }
//   const openModal = () => {   setIsModalOpen(true); }
//   const closeModal = () => {
//     setIsModalOpen(false);
//   }
//   return (
//     <div className="functional-body-wrapper">
//       <form className="functional-form">
//         <Heading className="text-center">Sign PDF</Heading>
//         <br />
//         <p className="Functional-text">
//           Sign yourself or request electronic signatures from others.
//         </p>
//         <input type="file" hidden id="uploadfile" accept=".pdf" onChange={handleInputChange} />
//         <label className="upload-btn" htmlFor="uploadfile">
//           SIGN PDF
//         </label>
//         <Button colorScheme="teal" variant="solid" onClick={openModal}>
//           Create Template
//         </Button>
//       </form>
//       {/* Modal */}
//       <Modal isOpen={isModalOpen} onClose={closeModal} size="xl"> {/* Adjust size as needed */}
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Create Template</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//           <input type="file" hidden id="templatefile" accept=".pdf" onChange={handleInputUpload} />
//           <label className="temp-upload-btn" htmlFor="templatefile">
//             Select Template PDF
//           </label>
//           {templatePDf && (
//               <div>
//                 <Text>Selected PDF File: {templatePDf.name}</Text>
//               </div>
//             )}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }
// export default SignPdf;

// trying to make recipient box
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";


function SignPdf() {
  const [pdfFile, setPdfFile] = useState(null);
  const [templatePDf, setTemplatePDf] = useState(null);
  const [tempSign, setTempSign] = useState(null);
  
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const pdfFile = event.target.files[0];
    setPdfFile(pdfFile);
    if (pdfFile) {
      navigate(`/test1`, { state: { pdfFile: pdfFile } });
    }
  };

  const handleInputUpload = (event) => {
    const tempFile = event.target.files[0];
    setTemplatePDf(tempFile);
    if (tempFile) {
      navigate(`/template`,{state:{tempFile : tempFile}});
    }
  };

  const handleTempSignUpload=(event)=>{
    const tempSign= event.target.files[0];
    setTempSign(tempSign);
    if(tempSign){
      navigate(`/tempSign`,{state:{tempSign : tempSign}});
    }
  }

  
  return (
    <div className="functional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">Sign PDF</Heading>
        <br />
        <p className="Functional-text">
          Sign yourself or request electronic signatures from others.
        </p>

        <input
          type="file"
          hidden
          id="uploadfile"
          accept=".pdf"
          onChange={handleInputChange}
        />
        <label className="upload-btn" htmlFor="uploadfile">
          SIGN PDF
        </label>

        <input
          type="file"
          hidden
          id="templatefile"
          accept=".pdf"
          onChange={handleInputUpload}
        />
        <label className="upload-btn" htmlFor="templatefile">
          Create Template
        </label>

        <input
          type="file"
          hidden
          id="templateSignfile"
          accept=".pdf"
          onChange={handleTempSignUpload}
        />
        <label className="upload-btn" htmlFor="templateSignfile">
           Sign Template 
        </label>
      </form>
    </div>
  );
}

export default SignPdf;
