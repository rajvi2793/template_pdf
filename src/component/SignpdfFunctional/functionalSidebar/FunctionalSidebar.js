import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";
import DrawingModalComponent from "../DrawingModalComponent/DrawingModalComponent"; 

function FunctionalSidebar({
  isOpen,
  onClose,
  isDrawingModalOpen,
  btnRef,
  setIsDrawingModalOpen,
  handleGenerateSignedPdf,
  drawingBoardRef,
  numPages, 
  handleDrawingDone, 
  drawingData,
  currentPage,
  setDrawingData,
  handleImageDone,
  handleTextDone
}) {
  return (
    <>
    <div className="inner-functional-container">
      <div className="inner-functional-container-header">
        <Heading>SIGNING OPTION</Heading>
      </div>
      <div className="inner-functional-body">
        <Button
          size="lg"
          width="100%"
          border="2px"
          variant="outline"
          textColor="#053b50"
          onClick={() => setIsDrawingModalOpen(true)}
        >
          Add Signature
        </Button>
        <DrawingModalComponent
          isDrawingModalOpen={isDrawingModalOpen}
          setIsDrawingModalOpen={setIsDrawingModalOpen}
          drawingBoardRef={drawingBoardRef} 
          numPages={numPages} 
          handleDrawingDone={handleDrawingDone}
          drawingData={drawingData}
          currentPage={currentPage}
          setDrawingData={setDrawingData}
          handleImageDone={handleImageDone}
          handleTextDone={handleTextDone}
        />
        <Button
          size="lg"
          width="100%"
          border="2px"
          variant="outline"
          textColor="#053b50"
          onClick={handleGenerateSignedPdf}
        >
        Download Sign Pdf
        </Button>
      </div>
      <Drawer
              size="xs"
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>SIGN PDF</DrawerHeader>
                <DrawerBody>
                  <Button variant="outline" color="#053b50" w="100%" mb={3} onClick={() => setIsDrawingModalOpen(true)}>
                    Add Signature
                  </Button>
                  <Button variant="outline"  color="#053b50" w="100%" onClick={handleGenerateSignedPdf}>Sign Pdf</Button>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
    </div>
    </>
  );}
export default FunctionalSidebar;
