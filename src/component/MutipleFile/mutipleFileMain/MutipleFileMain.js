import React, { useState, useEffect,useRef } from 'react';
import {
  Box,
  Heading,
  Select,
  VStack,
  Button,
  Input,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { AiFillSetting } from "react-icons/ai";
import { ProgressBar } from "react-loader-spinner";
import Toolbar from "../../SignpdfFunctional/toolbar/Toolbar";
import Sidebar from "../../SignpdfFunctional/sidebar/Sidebar";
import MultipleFileSidebar from '../multipleFileSidebar/MultipleFileSidebar';
import {
    generateThumbnails,
    handleScroll,
    handleThumbnailClick,
    getNonEmptyPixels,
    getCroppingRect,
  } from "../../SignpdfFunctional/main/pdfUtils";
  import DrawingModalComponent from "../../SignpdfFunctional/DrawingModalComponent/DrawingModalComponent";
  import { PDFDocument } from "pdf-lib";


function MutipleFileMain() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showSelectedFilesDropdown, setShowSelectedFilesDropdown] = useState(false);
  const [selectedFileInDropdown, setSelectedFileInDropdown] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const btnRef = React.useRef();
  const [thumbnails, setThumbnails] = useState([]);
  const [mainContentUrls, setMainContentUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mainContainerRef = useRef(null);
  const [positions, setPositions] = useState(
    Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
  );
  const thumbnailContainerRef = useRef(null);
  const drawingBoardRef = useRef(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [drawingData, setDrawingData] = useState({});
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [pdfImageSize, setPdfImageSize] = useState({ width: 0, height: 0 });
  const [pdfImageRect, setpdfImageRect] = useState({ width: 0, height: 0 });
  const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);

  useEffect(() => {
    // Fetch template names from local storage
    const storedTemplates = JSON.parse(localStorage.getItem('templateInfo')) || [];
    setTemplates(storedTemplates);

    // Open the modal when the component loads
    onOpen();
    
  }, [onOpen]);

  const handleContainerScroll = (event) => {
    handleScroll(
      event,
      numPages,
      positions,
      pdfImageSize,
      thumbnailContainerRef,
      setCurrentPage,
      setPositions
    );
    const pdfImage = document.querySelector(".tmpid");
    const pdfImageRect = pdfImage.getBoundingClientRect();
    const mypdfImage = new Image();
    mypdfImage.src = mainContentUrls[0];
    mypdfImage.onload = () => {
      setPdfImageSize({
        width: mypdfImage.width,
        height: mypdfImage.height,
      });
  
      setpdfImageRect({
        width: pdfImageRect.width,
        height: pdfImageRect.height,
      });
    };
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(Array.from(files));
    
  };

  const handleContinue = () => {
    // Add your logic for handling the continue button click
    setShowSelectedFilesDropdown(true);
        
    onClose();
    const selectedTemplateObject = templates.find(
        (template) => template.templateName.templateName === selectedTemplate
      );
      setSelectedTemplate(selectedTemplateObject);

      const finalFile = selectedFiles[0];  
      if (finalFile) {
        generateThumbnails(finalFile)
          .then(({ thumbnailUrls, contentUrls }) => {
            setNumPages(thumbnailUrls.length);
            setThumbnails(thumbnailUrls);
            setMainContentUrls(contentUrls);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error generating thumbnails:", error);
          });
      }
      
  };

  const handleDropdownChange = (e) => {
    const changeFile = e.target.value;
    const finalFile = selectedFiles.find((file) => file.name === changeFile);
    
    setSelectedFileInDropdown(finalFile);
  
    if (finalFile) {
      generateThumbnails(finalFile)
        .then(({ thumbnailUrls, contentUrls }) => {
          setNumPages(thumbnailUrls.length);
          setThumbnails(thumbnailUrls);
          setMainContentUrls(contentUrls);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error generating thumbnails:", error);
        });
    }
  };
  

  const openDrawingModal = (recipient) => {
    setSelectedRecipient(recipient);
    setIsDrawingModalOpen(true);
  };
  
  const handleDrawingDone = () => {
    if (drawingBoardRef.current.isEmpty() || selectedRecipient === null) {
      setIsDrawingModalOpen(false);
      return;
    }
    if (selectedRecipient) {
      const { pagePositions, size, email } = selectedRecipient;
      const pageIndex = Object.keys(pagePositions)[0];
      const position = pagePositions[pageIndex][0];
      const drawingDataURL = drawingBoardRef.current.toDataURL();
      const updatedDrawings = { ...drawingData };
      const drawingImage = new Image();
      drawingImage.src = drawingDataURL;
      drawingImage.onload = () => {
        const nonEmptyPixels = getNonEmptyPixels(drawingImage);
        const croppingRect = getCroppingRect(nonEmptyPixels);

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = croppingRect.width;
        canvas.height = croppingRect.height;
        context.drawImage(
          drawingImage,
          croppingRect.x,
          croppingRect.y,
          croppingRect.width,
          croppingRect.height,
          0,
          0,
          croppingRect.width,
          croppingRect.height
        );

        const croppedDrawingDataURL = canvas.toDataURL();
        if (!updatedDrawings[email]) {
          updatedDrawings[email] = [];
        }
        updatedDrawings[email] = [croppedDrawingDataURL];
        setDrawingData(updatedDrawings);
        setIsDrawingModalOpen(false);
      
      };
    }
  };

  const handleImageDone = (imgfile) => {
    if (selectedRecipient === null) {
      setIsDrawingModalOpen(false);
      return;
    }
    if (selectedRecipient) {
      const { pagePositions, size, email } = selectedRecipient;
      const pageIndex = Object.keys(pagePositions)[0]; // Assuming there's only one pagePosition
      const position = pagePositions[pageIndex][0];

      const updatedDrawingData = { ...drawingData };
      const uploadedImage = new Image();
      uploadedImage.src = imgfile;
      uploadedImage.onload = () => {
        const imgmaxWidth = size.width;
        const imgmaxHeight = size.height;
        let newWidth = uploadedImage.width;
        let newHeight = uploadedImage.height;
        if (
          uploadedImage.width > imgmaxWidth ||
          uploadedImage.height > imgmaxHeight
        ) {
          if (
            uploadedImage.width / imgmaxWidth >
            uploadedImage.height / imgmaxHeight
          ) {
            newWidth = imgmaxWidth;
            newHeight =
              (uploadedImage.height * imgmaxWidth) / uploadedImage.width;
          } else {
            newHeight = imgmaxHeight;
            newWidth =
              (uploadedImage.width * imgmaxHeight) / uploadedImage.height;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const context = canvas.getContext("2d");
        context.drawImage(uploadedImage, 0, 0, newWidth, newHeight);
        const resizedImageDataURL = canvas.toDataURL();
        if (!updatedDrawingData[email]) {
          updatedDrawingData[email] = [];
        }
        updatedDrawingData[email] = [resizedImageDataURL];
        setDrawingData(updatedDrawingData);
        setIsDrawingModalOpen(false);
      };
    }
  };

  const handleTextDone = () => {};

  const genAllPdf = async () => {
    if (!selectedTemplate) {
      console.error("No template selected.");
      return;
    }
    selectedFiles.forEach( async (myfile)=>{
    const pdfBytes = await myfile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const element = document.querySelector('.tmpid'); 
    const styles = window.getComputedStyle(element);
    const widthWithPaddingAndMargin = parseFloat(styles.width); 
    const heightWithPaddingAndMargin = parseFloat(styles.height);
  
    selectedTemplate.tempSidebarRecipients.tempSidebarRecipients.forEach(async (recipient) => {
      const pageIndex = Object.keys(recipient.pagePositions)[0];
      const position = recipient.pagePositions[pageIndex][0];
        const pageWidth = pages[0].getWidth();
        const pageHeight = pages[0].getHeight();
      
      const adjustedWidth = (parseFloat(recipient.size.width) / pdfImageSize.width) * pdfImageRect.width * (pageWidth / widthWithPaddingAndMargin);
      const adjustedHeight = (parseFloat(recipient.size.height) / pdfImageSize.height) * pdfImageRect.height * (pageHeight / heightWithPaddingAndMargin);
      const adjustedLeft = (position.x / pdfImageSize.width) * pdfImageRect.width * (pageWidth / widthWithPaddingAndMargin);
      const tryTop= (position.y / pdfImageSize.height) *pdfImageRect.height;
      const yRatio= pageHeight/heightWithPaddingAndMargin;
      const adjustedTop= (heightWithPaddingAndMargin - tryTop - parseFloat(recipient.size.height) ) * yRatio;

      const drawingDataURLs = drawingData[recipient.email] || [];
      for (const drawingDataURL of drawingDataURLs) {
        const [, base64Data] = drawingDataURL.split("base64,");
        const drawingImageBytes = new Uint8Array(atob(base64Data).split("").map((char) => char.charCodeAt(0)));
        const drawingImage = await pdfDoc.embedPng(drawingImageBytes);
        
        pages[pageIndex].drawImage(drawingImage, {
          x: adjustedLeft,
          y: adjustedTop,
          width: adjustedWidth,
          height: adjustedHeight,
        });
      }
    });
  
    const modifiedPdfBytes = await pdfDoc.save();
    const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
      type: "application/pdf",
    });
  
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(modifiedPdfBlob);
    downloadLink.download = "signed_pdf.pdf";
    downloadLink.click();
  })
  };

  return (
    <>
      <Modal isOpen={isOpen} size={'lg'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" mb={2}>
              Select a Template:
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          
            <VStack spacing={4} align="stretch">
            <Flex alignItems="center">
                  <Input
                    type="text"
                    id="recipientName"
                    placeholder="Recipient Name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Recipient Email"
                    id="recipientEmail"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </Flex>
              {/* <Box>
                <Select
                  placeholder="Choose a template"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.templateName.templateName}>
                      {template.templateName.templateName}
                    </option>
                  ))}
                </Select>
              </Box> */}
              <Box>
  <Select
    placeholder="Choose a template"
    value={selectedTemplate}
    onChange={(e) => setSelectedTemplate(e.target.value)}
  >
    {templates.map((template) => {
     const isTemplateMatched =
     template.tempSidebarRecipients.tempSidebarRecipients.some(
       (recipient) =>
         recipient.name === recipientName &&
         recipient.email === recipientEmail
     );

      return isTemplateMatched ? (
        <option
          key={template.id}
          value={template.templateName.templateName}
        >
          {template.templateName.templateName}
        </option>
      ) : null;
    })}
  </Select>
</Box>

              <Box>
                <Heading size="sm" mb={3}>
                  Select Multiple Files:
                </Heading>
                <Flex>
                <Input type="file" multiple onChange={handleFileChange} /></Flex>
                {selectedFiles.length > 0 && (
                  <Text mt={2} fontSize="sm">
                    Selected Files: {selectedFiles.map((file) => file.name).join(', ')}
                  </Text>
                )}
              </Box>

              <Button
                colorScheme="teal"
                size="md"
                isDisabled={!selectedTemplate || selectedFiles.length === 0}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {showSelectedFilesDropdown && (
        <>
        <Box>
        <Select
  size={'sm'}
  value={selectedFileInDropdown ? selectedFileInDropdown.name : ''}
  onChange={handleDropdownChange}
>
  {selectedFiles.map((file, index) => (
    <option key={index} value={file.name}>
      {file.name}
    </option>
  ))}
</Select>

        </Box>
        
          <div className="main-container">
            <div className="inner-container-main">
              <div className="inner-container-main-toolbar">
                <Toolbar
                  numPages={numPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  mainContainerRef={mainContainerRef}
                />
              </div>
              <div className="inner_container_main_body">
                <div className="inner-container-main-body-sider">
                  <Sidebar
                    thumbnails={thumbnails}
                    currentPage={currentPage}
                    handleThumbnailClick={(pageNumber) =>
                      handleThumbnailClick(
                        pageNumber,
                        mainContainerRef,
                        setCurrentPage,
                        numPages
                      )
                    }
                  />
                </div>

                <div className="inner-container-main-body-content">
                  <div className="pdf-viewer">
                    <div className="mypdfCenter">
                      <div
                        className="scrollable-container"
                        ref={mainContainerRef}
                        onScroll={handleContainerScroll}
                      >
                        {isLoading && (
                          <div className="loading-container">
                            <ProgressBar
                              height={60}
                              width={80}
                              ariaLabel="progress-bar-loading"
                              wrapperStyle={{}}
                              wrapperClass="progress-bar-wrapper"
                              borderColor="#053b50"
                              barColor="#026179"
                            />
                          </div>
                        )}

                        {!isLoading &&
                          Array.from({ length: numPages }, (_, index) => (
                            <div className="page" key={index}>
                              <div className="pdf-page-container">
                                <img
                                  src={mainContentUrls[index]}
                                  alt={`Page ${index + 1}`}
                                  className="tmpid"
                                  draggable="false"
                                />

                                {showSelectedFilesDropdown && selectedTemplate &&
                                  selectedTemplate.tempSidebarRecipients.tempSidebarRecipients.map(
                                    (recipient, recipientIndex) => {
                                      const pageIndex = Object.keys(
                                        recipient.pagePositions
                                      )[0];
                                      
                                      const position =
                                        recipient.pagePositions[pageIndex][0];

                                      const isSelected =
                                        recipient.email ===
                                        selectedRecipient?.email;
                                      const isCurrentRecipient =
                                        recipient.name === recipientName &&
                                        recipient.email === recipientEmail;
                                      const isDisabled =
                                        !isCurrentRecipient && !isSelected;

                                      if (parseInt(pageIndex) === index) {
                                        const adjustedLeft = (position.x / pdfImageSize.width) *pdfImageRect.width;
                                        const adjustedTop =(position.y / pdfImageSize.height) *pdfImageRect.height;
                                        const adjustedWidth = (parseFloat(recipient.size.width) /pdfImageSize.width) *pdfImageRect.width;
                                        const adjustedHeight =(parseFloat(recipient.size.height) / pdfImageSize.height) *pdfImageRect.height;
                                        
                                        return (
                                          
                                          <div
                                            className="signRecipientBox"
                                            key={recipientIndex}
                                            onClick={() => {
                                              if (!isDisabled) {
                                                openDrawingModal(recipient);
                                                setSelectedRecipient(recipient);
                                              }
                                            }}
                                            style={{
                                              border: "2px groove #000",
                                              boxSizing: "border-box",
                                              position: "absolute",
                                              left: adjustedLeft,
                                              top: adjustedTop,
                                              width: adjustedWidth,
                                              height: adjustedHeight,
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              textShadow: "1px 1px 1px #122",
                                              textAlign: "center",
                                              opacity: isDisabled ? 0.5 : 1,
                                              pointerEvents: isDisabled  ? "none": "auto",
                                            }}
                                          >
                                            {drawingData[recipient.email] ? (
                                              drawingData[recipient.email].map(
                                                (
                                                  drawingDataURL,
                                                  drawingIndex
                                                ) => (
                                                  <Tooltip
                                                    hasArrow
                                                    label={recipient.name}
                                                    bg="gray.300"
                                                    color="black"
                                                  >
                                                    <img
                                                      key={drawingIndex}
                                                      src={drawingDataURL}
                                                      alt={`Drawing ${drawingIndex}`}
                                                    />
                                                  </Tooltip>
                                                )
                                              )
                                            ) : (
                                              <span>{recipient.name}</span>
                                            )}
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="setting">
                    <AiFillSetting  color="#053b50"   className="setting-icon" onClick={onOpen} />
                  </div>
                </div>
              </div>
            </div>
            <MultipleFileSidebar
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
              selectedFileInDropdown={selectedFileInDropdown}
              genAllPdf={genAllPdf}
            />

            <DrawingModalComponent
              isDrawingModalOpen={isDrawingModalOpen}
              setIsDrawingModalOpen={setIsDrawingModalOpen}
              drawingBoardRef={drawingBoardRef}
              handleDrawingDone={handleDrawingDone}
              handleImageDone={handleImageDone}
              handleTextDone={handleTextDone}
            />
          </div>

        
        </>
      )}

    </>
  );
}

export default MutipleFileMain;
