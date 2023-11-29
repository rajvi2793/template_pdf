import React from 'react';
import { Drawer, Heading,Button, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerBody } from "@chakra-ui/react";

function MultipleFileSidebar({isOpen,onClose,btnRef,genAllPdf}) {
  return (
    <>
    <div className="inner-functional-container">
      <div className="inner-functional-container-header">
        <Heading>Template Option</Heading>
      </div>
      <div className="inner-functional-body">
        

        <Button onClick={genAllPdf}> DOWNLOAD  </Button>
      </div>
      <Drawer
        size="xs"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerContent>
        <DrawerCloseButton/>
        <DrawerHeader>Sign Option</DrawerHeader>
              <DrawerBody>
              <Button onClick={genAllPdf}> DOWNLOAD  </Button>
              </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  </>
  )
}

export default MultipleFileSidebar