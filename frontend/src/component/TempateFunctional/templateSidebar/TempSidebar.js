// import React from 'react';
// import {
//     Drawer,
//     DrawerBody,
//     DrawerCloseButton,
//     DrawerContent,
//     DrawerHeader,
//     DrawerOverlay,
//     Heading,
//     Tooltip
//   } from "@chakra-ui/react";
//   function TempSidebar({ isOpen, onClose, btnRef, recipientInitials }) {
//     // Limit the number of recipients to 4 in each row
//     const recipientsInRows = [];
//     for (let i = 0; i < recipientInitials.length; i += 4) {
//       recipientsInRows.push(recipientInitials.slice(i, i + 4));
//     }

//     return (
//       <>
//         <div className="inner-functional-container">
//           <div className="inner-functional-container-header">
//             <Heading>Template OPTION</Heading>
//           </div>
//           <div className="inner-functional-body">
//             {recipientsInRows.map((row, rowIndex) => (
//               <div key={rowIndex} style={{ display: "flex" }}>
//                 {row.map((recipient, index) => (
//                   <div key={index} style={{ marginRight: "8px" }}>
//                     <Tooltip hasArrow label={recipient.name} bg='gray.300' color='black'>
//                     <div
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         borderRadius: "50%",
//                         backgroundColor: recipient.color,
//                         fontSize: "18px",
//                         fontWeight: "bolder",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         margin:"5px",
//                       }}
//                     >
//                       {recipient.initial.toUpperCase()}
//                     </div>
//                     </Tooltip>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//           <Drawer
//             size="xs"
//             isOpen={isOpen}
//             placement="right"
//             onClose={onClose}
//             finalFocusRef={btnRef}
//           >
//             {/* ... Rest of your TempSidebar code ... */}
//           </Drawer>
//         </div>
//       </>
//     );
//   }

//   export default TempSidebar;

//now i'm trying to drag the initial letter circle on pdf image
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Tooltip,
  Button,
  useToast
} from "@chakra-ui/react";
import { useDragDropContext, DragDropProvider } from "../DragDropContext";
import { PDFDocument } from "pdf-lib";

function TempSidebar({ isOpen, onClose, btnRef, recipientInitials ,tempFile,tempSidebarRecipients,templateName}) {
  const { handleDragRecipient, handleDropRecipient } = useDragDropContext();
  const toast = useToast();

  const handleDragStart = (e, recipient) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(recipient));
    handleDragRecipient(recipient);
  };

  const recipientsInRows = [];
  for (let i = 0; i < recipientInitials.length; i += 4) {
    recipientsInRows.push(recipientInitials.slice(i, i + 4));
  }
  
  const handleTemplateDone = async () => {
    try{
    const existingPdfBytes = await tempFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const page = pages[0];
    const pageW = page.getWidth();
    const pageH = page.getHeight();
    const tempFname = tempFile.name;
  
    const existingTemplates = JSON.parse(localStorage.getItem("templateInfo")) || [];
    const newTemplate = {
      templateName: {templateName},
      tempFilename: {tempFname},
      pageWidth: {pageW},
      pageHeight: {pageH},
      tempSidebarRecipients: {tempSidebarRecipients},
    };
    existingTemplates.push(newTemplate);
    localStorage.setItem("templateInfo", JSON.stringify(existingTemplates));

    toast({
      title: "Template Saved",
      description: "The template has been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position:'top',
      variant:'top-accent'
    });}
    catch(error){
      console.error("Error saving template:", error);

      toast({
        title: "Error",
        description: "An error occurred while saving the template.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position:'top',
        variant:'top-accent'
      });
    }
  };
  return (
    <>
      <div className="inner-functional-container">
        <div className="inner-functional-container-header">
          <Heading>Template OPTION</Heading>
        </div>
        <div className="inner-functional-body">
          {recipientsInRows.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((recipient, index) => (
                <div key={index} style={{ marginRight: "8px" }}>
                  <Tooltip
                    hasArrow
                    label={recipient.name}
                    bg="gray.300"
                    color="black"
                  >
                    <div
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, recipient)}
                      onDragEnd={handleDropRecipient} 
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "1px solid",
                        fontSize: "18px",
                        fontWeight: "bolder",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "5px",
                      }}
                    >
                      {recipient.initial.toUpperCase()}
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
          ))}

      <Button size="lg"
          width="100%"
          border="4px groove"
          marginTop="20px"
          variant="outline"
          textColor="#053b50" onClick={handleTemplateDone}>Save and Send Template</Button>

        </div>
        <Drawer
          size="xs"
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
           {/* <DrawerOverlay /> */}
           <DrawerContent>
              <DrawerCloseButton/>
              <DrawerHeader>Template Option</DrawerHeader>
                <DrawerBody>
                
          {recipientsInRows.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((recipient, index) => (
                <div key={index} style={{ marginRight: "8px" }}>
                  <Tooltip
                    hasArrow
                    label={recipient.name}
                    bg="gray.300"
                    color="black"
                  >
                    <div
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, recipient)}
                      onDragEnd={handleDropRecipient} 
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "1px solid",
                        fontSize: "18px",
                        fontWeight: "bolder",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "5px",
                      }}
                    >
                      {recipient.initial.toUpperCase()}
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
          ))}

      <Button size="lg"
          width="100%"
          border="4px groove"
          marginTop="20px"
          variant="outline"
          textColor="#053b50" onClick={handleTemplateDone}>Save and Send Template</Button>

        
                </DrawerBody>
           </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default TempSidebar;
