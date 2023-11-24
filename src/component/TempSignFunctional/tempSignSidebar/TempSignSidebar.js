import React, { useEffect, useState } from 'react';
import { Drawer, Heading,Button, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { PDFDocument } from "pdf-lib";
import { useTemplateContext } from '../TemplateSelectContext';

function TempSignSidebar({ isOpen, onClose, btnRef, tempSign }) {
  const [templates, setTemplates] = useState([]);
  // const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { selectedTemplate, setTemplate } = useTemplateContext();

  useEffect(() => {
    const templateInfo = JSON.parse(localStorage.getItem("templateInfo"));
    
    if (templateInfo) {
      const { pageWidth,pageHeight,tempFilename, tempSidebarRecipients } = templateInfo;

      const fetchTemplates = async () => {
        const selectPdfBytes = await tempSign.arrayBuffer();
        const selectpdfDoc = await PDFDocument.load(selectPdfBytes);
        const selectpages = selectpdfDoc.getPages();
        const selpage = selectpages[0];
        const selectpageW = selpage.getWidth();
        const selectpageH = selpage.getHeight();

        if (
          templateInfo && tempFilename &&  pageWidth.pageW === selectpageW &&  pageHeight.pageH === selectpageH
        ) {
          setTemplates([templateInfo]);
        }
      };

      fetchTemplates();
    }
  }, [tempSign]);

  const handleTemplateClick=(selectTemplate)=>{
    setTemplate(selectTemplate);
  }

  return (
    <>
      <div className="inner-functional-container">
        <div className="inner-functional-container-header">
          <Heading>Template OPTION</Heading>
        </div>
        <div className="inner-functional-body">
          
          {templates && (
            <div>

              {templates.map((template, index) => (
                <>
                <Button key={index}
                onClick={() => handleTemplateClick(template)}
                >{template.templateName.templateName}</Button>
                </>
              ))}
              
            </div>
          )}

          <Button >
            DOWNLOAD
          </Button>
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
          <DrawerHeader>Template Option</DrawerHeader>
                <DrawerBody>
                  <Button>Download</Button>
                </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default TempSignSidebar;

