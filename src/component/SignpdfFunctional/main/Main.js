import {
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import "./main.css";
import { AiFillSetting } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import Toolbar from "../toolbar/Toolbar";
import Sidebar from "../sidebar/Sidebar";
import { pdfjs } from "react-pdf";
// for single
import { generateThumbnails,handleThumbnailClick,getNonEmptyPixels, getCroppingRect,handleScroll ,generateSignedPdf,getDimensionsBasedOnScreenSize} from "./pdfUtils";
import DrawingOverlay from "../DrawingOverlay/DrawingOverlay";
import FunctionalSidebar from "../functionalSidebar/FunctionalSidebar";
import { ProgressBar } from  'react-loader-spinner';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const location = useLocation();
  const pdfFile = location.state?.pdfFile;  //for single file upload
  const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);
  const [drawingData, setDrawingData] = useState({});
  const [signatureSize, setSignatureSize] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [thumbnails, setThumbnails] = useState([]);
  const [mainContentUrls, setMainContentUrls] = useState([]);
  const pdfImageSize = { width: 0, height: 0 };
  const [isLoading, setIsLoading] = useState(true);

  const [positions, setpositions] = useState(
    Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
  );
  const mainContainerRef = useRef(null);
  const thumbnailContainerRef = useRef(null);
  const drawingBoardRef = useRef(null);

  // useEffect(() => {
  //   if (pdfFile) {
  //     generateThumbnails(pdfFile);
  //   }
  // }, [pdfFile]);
  useEffect(() => {
    if (pdfFile) {
      generateThumbnails(pdfFile).then(({ thumbnailUrls, contentUrls }) => {
        setNumPages(thumbnailUrls.length);
        setThumbnails(thumbnailUrls);
        setMainContentUrls(contentUrls);
        setIsLoading(false);
      }).catch((error) => {
        console.error("Error generating thumbnails:", error);
      });
    }
  }, [pdfFile]);
  
 
  
  const handleContainerScroll = (event) => {

    handleScroll(event, numPages, positions, pdfImageSize, thumbnailContainerRef, setCurrentPage, setpositions);
  };  
  // const handleThumbnailClick = (pageNumber) => {
  //   if (mainContainerRef.current) {
  //     const scrollableContainer = mainContainerRef.current;
  //     const containerHeight = scrollableContainer.scrollHeight;
  //     const pageHeight = containerHeight / numPages;
  //     const scrollToY = (pageNumber - 1) * pageHeight+3;
  //     scrollableContainer.scrollTo({ top: scrollToY, behavior: "smooth" });
  //   }
  //   setCurrentPage((prevPage) => {
  //     return pageNumber;
  //   });
  // };
  

  // const generateThumbnails = async (file) => {
  //   setIsLoading(true);
  //   const fileReader = new FileReader();
  //   fileReader.onload = async () => {
  //     const typedArray = new Uint8Array(fileReader.result);
  //     try {
  //       const pdf = await pdfjs.getDocument(typedArray).promise;
  //       setNumPages(pdf.numPages);
  //       const thumbnailUrls = [];
  //       const contentUrls = [];
  //       for (let i = 1; i <= pdf.numPages; i++) {
  //         const page = await pdf.getPage(i);
  //         const viewport = page.getViewport({ scale: 1.0 });
  //         const canvas = document.createElement("canvas");
  //         const context = canvas.getContext("2d");
  //         const scale = 1.0;
  //         canvas.width = viewport.width * scale;
  //         canvas.height = viewport.height * scale;
  //         const renderContext = {
  //           canvasContext: context,
  //           viewport: page.getViewport({ scale: scale }),
  //         };
  //         await page.render(renderContext).promise;
  //         const thumbnailUrl = canvas.toDataURL();
  //         thumbnailUrls.push(thumbnailUrl);

  //         const contentUrl = canvas.toDataURL("image/jpeg");
  //         contentUrls.push(contentUrl);
  //       }
  //       setThumbnails(thumbnailUrls);
  //       setMainContentUrls(contentUrls);
  //     } catch (error) {
  //       console.error("Error generating thumbnails:", error);
  //     }
  //     setIsLoading(false);
  //   };
  //   fileReader.readAsArrayBuffer(file);
  // };

  

  const handleTextDone=()=>{
    console.log("text function");
  }
  const handleImageDone = (imageFile) => {
    const updatedDrawingData = { ...drawingData };
    const uploadedImage = new Image();
    uploadedImage.src = imageFile;
    uploadedImage.onload = () => {
      const imageDimensions=getDimensionsBasedOnScreenSize();
      const imgmaxWidth = imageDimensions.maxWidth;
      const imgmaxHeight = imageDimensions.maxHeight;
      let newWidth = uploadedImage.width;
      let newHeight = uploadedImage.height;
      if (uploadedImage.width > imgmaxWidth || uploadedImage.height > imgmaxHeight) {
        if (uploadedImage.width / imgmaxWidth > uploadedImage.height / imgmaxHeight) {
          newWidth = imgmaxWidth;
          newHeight = (uploadedImage.height * imgmaxWidth) / uploadedImage.width;
        } else {
          newHeight = imgmaxHeight;
          newWidth = (uploadedImage.width * imgmaxHeight) / uploadedImage.height;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const context = canvas.getContext("2d");
      context.drawImage(uploadedImage, 0, 0, newWidth, newHeight);
      const resizedImageDataURL = canvas.toDataURL();
      updatedDrawingData[currentPage] = resizedImageDataURL;
      const updatedSignatureSizes = [...signatureSize];
      updatedSignatureSizes[currentPage - 1] = {
        width: newWidth,
        height: newHeight,
      };
      const updatedPositions = [...positions];
      updatedPositions[currentPage-1] = {
        x: 0,
        y: 0,
      };

      for (let i = 1; i <= numPages; i++) {
        if (i === currentPage) {
          updatedDrawingData[i] = resizedImageDataURL;
        } else if (updatedDrawingData[i]) {
          updatedDrawingData[i] = resizedImageDataURL;
        }
      }
      setDrawingData(updatedDrawingData);
      setIsDrawingModalOpen(false);
      setSignatureSize(updatedSignatureSizes);
      setpositions(updatedPositions);
    };
  };
  const handleDrawingDone = () => {
    if (drawingBoardRef.current.isEmpty()) {
      setIsDrawingModalOpen(false);
      return;   }
    const updatedDrawingData = { ...drawingData };
    const drawingDataURL = drawingBoardRef.current.toDataURL();
    const drawingImage = new Image();
    drawingImage.src = drawingDataURL;
    drawingImage.onload = () => {
      const nonEmptyPixels = getNonEmptyPixels(drawingImage);
      const croppingRect = getCroppingRect(nonEmptyPixels);
      const croppedDrawingImage = new Image();
      croppedDrawingImage.src = drawingDataURL;
      croppedDrawingImage.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = croppingRect.width;
        canvas.height = croppingRect.height;
        context.drawImage(croppedDrawingImage,croppingRect.x,croppingRect.y,croppingRect.width,croppingRect.height,0,0,croppingRect.width,croppingRect.height);
        const croppedDrawingDataURL = canvas.toDataURL();
        const updatedpositions = [...positions];
        updatedpositions[currentPage-1] = {
          x: 0,   y: 0,
        };
        setpositions(updatedpositions);
        for (let i = 1; i <= numPages; i++) {
          if (i === currentPage) {
            updatedDrawingData[i] = croppedDrawingDataURL;
          } else if (updatedDrawingData[i]) {
            updatedDrawingData[i] = croppedDrawingDataURL;
          }
        }
        setDrawingData(updatedDrawingData);
        setIsDrawingModalOpen(false);
        setSignatureSize(
          Array.from({ length: numPages }, () => ({
            width: croppingRect.width,
            height: croppingRect.height, }))
        );
      };
    };
  };
  const handleDrawingPadResize = (e, direction, ref, delta, position, index) => {
    const updatedSignatureSizes = [...signatureSize];
    updatedSignatureSizes[index] = {
      width: ref.offsetWidth,
      height: ref.offsetHeight,};
    const updatedPositions = [...positions];
    updatedPositions[index] = position;
    setSignatureSize(updatedSignatureSizes);
    setpositions(updatedPositions);
  };
  const handleDrawingPadDragStop = (e, data, pageIndex) => {
    const newpositions = [...positions];
    newpositions[pageIndex] = { x: data.x, y: data.y };
    setpositions(newpositions);
  };
//for single  
  const handleGenerateSignedPdf = async () => {
    generateSignedPdf(pdfFile, drawingData, positions, signatureSize, numPages);
  };

  return (
    <>
      {pdfFile  && (
        <div className="main-container">
          <div className="inner-container-main">
            <div className="inner-container-main-toolbar">
            <Toolbar numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} mainContainerRef={mainContainerRef}/>
            </div>
            <div className="inner_container_main_body">
              <div className="inner-container-main-body-sider">
                <Sidebar
                  thumbnails={thumbnails}
                  currentPage={currentPage}
                  // handleThumbnailClick={handleThumbnailClick}    
                  handleThumbnailClick={(pageNumber) => handleThumbnailClick(pageNumber, mainContainerRef, setCurrentPage,numPages)}
                  />
              </div>
             
              <div className="inner-container-main-body-content">
              
                <div className="pdf-viewer">
                  <div className="mypdfCenter">
                 
                    <div
                      className="scrollable-container "
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
                      {!isLoading && Array.from({ length: numPages }, (_, index) => (
                        <div className="page " key={index}>
                          <div className="pdf-page-container ">
                            <img
                              src={mainContentUrls[index]}
                              alt={`Page ${index + 1}`}
                              className="tmpid"
                              draggable="false"    />    
                            {drawingData[index + 1] && (
                                  <DrawingOverlay
                                  index={index}
                                  positions={positions}
                                  setpositions={setpositions}
                                  setSignatureSize={setSignatureSize}
                                  signatureSize={signatureSize}
                                  drawingData={drawingData}
                                  handleDrawingPadResize={handleDrawingPadResize}
                                  handleDrawingPadDragStop={handleDrawingPadDragStop}
                                  setDrawingData={setDrawingData}
                                  numPages={numPages}
                                  currentPage={currentPage}
                                />   
                                 )}
                          </div>
                        </div>   ))}
                    </div>
                  </div>
                </div>
                <div className="setting">
                  <AiFillSetting color="#053b50" className="setting-icon" onClick={onOpen} />
                </div>
              </div>
            </div>
          </div>
          {/*----------------------Functional SideBar------------------*/}
          <FunctionalSidebar
            isOpen={isOpen}
            onClose={onClose}
            btnRef={btnRef}
            setIsDrawingModalOpen={setIsDrawingModalOpen}
            isDrawingModalOpen={isDrawingModalOpen}
            handleGenerateSignedPdf={handleGenerateSignedPdf}
            drawingBoardRef={drawingBoardRef}
            numPages={numPages}
            handleDrawingDone={handleDrawingDone}
            drawingData={drawingData}
            currentPage={currentPage}
            setDrawingData={setDrawingData}
            handleImageDone={handleImageDone}
            handleTextDone={handleTextDone}
          />
        </div>
      )}
    </>
  );
}
export default Main;
