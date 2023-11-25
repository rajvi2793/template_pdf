// import React,{useEffect,useState,useRef} from 'react';
// import { useLocation } from "react-router-dom";
// import { Button, useDisclosure } from "@chakra-ui/react";
// import {
//     generateThumbnails,
//     handleScroll,
//     handleThumbnailClick,
//   } from "../../SignpdfFunctional/main/pdfUtils";
// import { AiFillSetting } from "react-icons/ai";
// import { ProgressBar } from "react-loader-spinner";
// import Toolbar from "../../SignpdfFunctional/toolbar/Toolbar";
// import Sidebar from "../../SignpdfFunctional/sidebar/Sidebar";
// import TempSignSidebar from '../tempSignSidebar/TempSignSidebar';
// import { useTemplateContext } from '../TemplateSelectContext';

// function TempSignMain() {
//     const location = useLocation();
//     const tempSign = location.state?.tempSign;
//     const btnRef = React.useRef();
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [thumbnails, setThumbnails] = useState([]);
//   const [mainContentUrls, setMainContentUrls] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const mainContainerRef = useRef(null);
//   const thumbnailContainerRef = useRef(null);
//   const pdfImageSize = { width: 0, height: 0 };
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [positions, setPositions] = useState(
//     Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
//   );
//   const { selectedTemplate } = useTemplateContext();

//     useEffect(() => {
//         setIsModalOpen(true);
//         if (tempSign) {
//           generateThumbnails(tempSign)
//             .then(({ thumbnailUrls, contentUrls }) => {
//               setNumPages(thumbnailUrls.length);
//               setThumbnails(thumbnailUrls);
//               setMainContentUrls(contentUrls);
//               setIsLoading(false);
//             })
//             .catch((error) => {
//               console.error("Error generating thumbnails:", error);
//             });
//         }
//       }, [tempSign]);

//       const handleContainerScroll = (event) => {
//         handleScroll(
//           event,
//           numPages,
//           positions,
//           pdfImageSize,
//           thumbnailContainerRef,
//           setCurrentPage,
//           setPositions
//         );
//       };

//       const handleModalDone = () => {
//         setIsModalOpen(false);
//       };

//     return (
//         <>
//           {tempSign && (
//             <div className="main-container">
//               <div className="inner-container-main">
//                 <div className="inner-container-main-toolbar">
//                   <Toolbar
//                     numPages={numPages}
//                     currentPage={currentPage}
//                     setCurrentPage={setCurrentPage}
//                     mainContainerRef={mainContainerRef}
//                   />
//                 </div>
//                 <div className="inner_container_main_body">
//                   <div className="inner-container-main-body-sider">
//                     <Sidebar
//                       thumbnails={thumbnails}
//                       currentPage={currentPage}
//                       handleThumbnailClick={(pageNumber) =>
//                         handleThumbnailClick(
//                           pageNumber,
//                           mainContainerRef,
//                           setCurrentPage,
//                           numPages
//                         )
//                       }
//                     />
//                   </div>

//                   <div className="inner-container-main-body-content">
//                     <div className="pdf-viewer">
//                       <div className="mypdfCenter">
//                         <div
//                           className="scrollable-container"
//                           ref={mainContainerRef}
//                           onScroll={handleContainerScroll}
//                         >
//                           {isLoading && (
//                             <div className="loading-container">
//                               <ProgressBar
//                                 height={60}
//                                 width={80}
//                                 ariaLabel="progress-bar-loading"
//                                 wrapperStyle={{}}
//                                 wrapperClass="progress-bar-wrapper"
//                                 borderColor="#053b50"
//                                 barColor="#026179"
//                               />
//                             </div>
//                           )}
//                              {/* {!isLoading && Array.from({ length: numPages }, (_, index) => (
//                         <div className="page " key={index}>
//                           <div className="pdf-page-container ">
//                             <img
//                               src={mainContentUrls[index]}
//                               alt={`Page ${index + 1}`}
//                               className="tmpid"
//                               draggable="false"    />

//                             {  selectedTemplate.tempSidebarRecipients.tempSidebarRecipients.forEach((recipient, index) => {

//     Object.keys(recipient.pagePositions).forEach((pageIndex) => {
//         const position = recipient.pagePositions[pageIndex][0];
//         console.log(`Page Index: ${pageIndex}`);
//         console.log(position);
//         if(pageIndex===index){
//           <>
//             <div>hey</div>
//           </>
//         }
//         // console.log(`x: ${position.x}`);
//         // console.log(`y: ${position.y}`);
//     });
//     console.log("------------");
// })  }

//                           </div>
//                         </div>   ))} */}
//                         {!isLoading && Array.from({ length: numPages }, (_, index) => (
//   <div className="page" key={index}>
//     <div className="pdf-page-container">
//       <img
//         src={mainContentUrls[index]}
//         alt={`Page ${index + 1}`}
//         className="tmpid"
//         draggable="false"
//       />
//       {selectedTemplate && selectedTemplate.tempSidebarRecipients.tempSidebarRecipients.map((recipient, recipientIndex) => {
//         const pageIndex = Object.keys(recipient.pagePositions)[0]; // Assuming there's only one pagePosition
//         const position = recipient.pagePositions[pageIndex][0];
//         if (parseInt(pageIndex) === index) {
//           return (
//             <div
//               key={recipientIndex}
//               style={{
//                 border: '2px groove #000',
//                                             boxSizing: 'border-box',
//                                             position: 'absolute',
//                                             left: position.x,
//                                             top: position.y,
//                                             width: recipient.size.width,
//                                             height: recipient.size.height,
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             textShadow: '1px 1px 1px #122', textAlign: 'center'
//               }}
//             >
//               {recipient.name}
//               <br />
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>
//   </div>
// ))}

//                         </div>
//                       </div>
//                     </div>
//                     <div className="setting">
//                       <AiFillSetting
//                         color="#053b50"
//                         className="setting-icon"
//                         onClick={onOpen}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <TempSignSidebar
//                 isOpen={isOpen}
//                 onClose={onClose}
//                 btnRef={btnRef}
//                 tempSign={tempSign}
//               />
//             </div>
//           )}

//         </>
//       );
// }

// export default TempSignMain

/// applying sign on recipient box
// import React, { useEffect, useState, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Button, useDisclosure } from "@chakra-ui/react";
// import {
//   generateThumbnails,
//   handleScroll,
//   handleThumbnailClick,
//   getNonEmptyPixels, getCroppingRect,
// } from '../../SignpdfFunctional/main/pdfUtils';
// import { AiFillSetting } from 'react-icons/ai';
// import { ProgressBar } from 'react-loader-spinner';
// import Toolbar from '../../SignpdfFunctional/toolbar/Toolbar';
// import Sidebar from '../../SignpdfFunctional/sidebar/Sidebar';
// import TempSignSidebar from '../tempSignSidebar/TempSignSidebar';
// import { useTemplateContext } from '../TemplateSelectContext';
// import DrawingModalComponent from '../../SignpdfFunctional/DrawingModalComponent/DrawingModalComponent'; // Import the DrawingModalComponent

// function TempSignMain() {
//   const location = useLocation();
//   const tempSign = location.state?.tempSign;
//   const btnRef = React.useRef();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [thumbnails, setThumbnails] = useState([]);
//   const [mainContentUrls, setMainContentUrls] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const mainContainerRef = useRef(null);
//   const thumbnailContainerRef = useRef(null);
//   const drawingBoardRef = useRef(null);
//   const pdfImageSize = { width: 0, height: 0 };
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [positions, setPositions] = useState(Array.from({ length: numPages }, () => ({ x: 0, y: 0 })));
//   const { selectedTemplate } = useTemplateContext();
//   const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false); // State to control the drawing modal
//   const [selectedRecipient, setSelectedRecipient] = useState(null);
//   const [drawingData, setDrawingData] = useState({});

//   useEffect(() => {
//     setIsModalOpen(true);
//     if (tempSign) {
//       generateThumbnails(tempSign)
//         .then(({ thumbnailUrls, contentUrls }) => {
//           setNumPages(thumbnailUrls.length);
//           setThumbnails(thumbnailUrls);
//           setMainContentUrls(contentUrls);
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error generating thumbnails:', error);
//         });
//     }
//   }, [tempSign]);

//   const handleContainerScroll = (event) => {
//     handleScroll(
//       event,
//       numPages,
//       positions,
//       pdfImageSize,
//       thumbnailContainerRef,
//       setCurrentPage,
//       setPositions
//     );
//   };

//   const handleModalDone = () => {
//     setIsModalOpen(false);
//   };

//   // Function to open the drawing modal and set the selected recipient
//   const openDrawingModal = (recipient) => {
//     setSelectedRecipient(recipient);
//     setIsDrawingModalOpen(true);
//   };

//   // const handleDrawingDone = () => {
//   //   if (drawingBoardRef.current.isEmpty() || selectedRecipient === null) {
//   //     setIsDrawingModalOpen(false);
//   //     return;
//   //   }
//   //   if (selectedRecipient) {
//   //     const { pagePositions, size } = selectedRecipient;
//   //     const pageIndex = Object.keys(pagePositions)[0]; // Assuming there's only one pagePosition
//   //     const position = pagePositions[pageIndex][0];

//   //     const drawingDataURL = drawingBoardRef.current.toDataURL();

//   //     const drawingImage = new Image();
//   //     drawingImage.src = drawingDataURL;
//   //     drawingImage.onload = () => {
//   //       const nonEmptyPixels = getNonEmptyPixels(drawingImage);
//   //       const croppingRect = getCroppingRect(nonEmptyPixels);

//   //       const canvas = document.createElement("canvas");
//   //       const context = canvas.getContext("2d");
//   //       canvas.width = croppingRect.width;
//   //       canvas.height = croppingRect.height;
//   //       context.drawImage(
//   //         drawingImage,
//   //         croppingRect.x,
//   //         croppingRect.y,
//   //         croppingRect.width,
//   //         croppingRect.height,
//   //         0,
//   //         0,
//   //         croppingRect.width,
//   //         croppingRect.height
//   //       );

//   //       const croppedDrawingDataURL = canvas.toDataURL();
//   //       setDrawingData(croppedDrawingDataURL);

//   //       setIsDrawingModalOpen(false);
//   //     };
//   //   }
//   // };

//   const handleDrawingDone = () => {
//     if (drawingBoardRef.current.isEmpty() || selectedRecipient === null) {
//       setIsDrawingModalOpen(false);
//       return;
//     }
//     if (selectedRecipient) {
//       const { pagePositions, size ,email } = selectedRecipient;
//       const pageIndex = Object.keys(pagePositions)[0]; // Assuming there's only one pagePosition
//       const position = pagePositions[pageIndex][0];

//       const drawingDataURL = drawingBoardRef.current.toDataURL();
//       const updatedDrawings = { ...drawingData };
//       const drawingImage = new Image();
//       drawingImage.src = drawingDataURL;
//       drawingImage.onload = () => {
//         const nonEmptyPixels = getNonEmptyPixels(drawingImage);
//         const croppingRect = getCroppingRect(nonEmptyPixels);

//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = croppingRect.width;
//         canvas.height = croppingRect.height;
//         context.drawImage(
//           drawingImage,
//           croppingRect.x,
//           croppingRect.y,
//           croppingRect.width,
//           croppingRect.height,
//           0,
//           0,
//           croppingRect.width,
//           croppingRect.height
//         );

//         const croppedDrawingDataURL = canvas.toDataURL();
//         if (!updatedDrawings[email]) {
//           updatedDrawings[email] = [];
//         }
//         updatedDrawings[email].push(croppedDrawingDataURL);

//         setDrawingData(updatedDrawings);
//         setIsDrawingModalOpen(false);
//       };
//     }
//   };

//   // const genPdf=()=>{
//   //   let mypos=[...signPositions];
//   //   let mysize=[...signSize];
//   //   selectedTemplate &&
//   //   selectedTemplate.tempSidebarRecipients.tempSidebarRecipients.map(
//   //     (recipient, recipientIndex) => {
//   //       const pageIndex = Object.keys(recipient.pagePositions)[0];
//   //       const signPos=recipient.pagePositions[pageIndex][0];
//   //       // signaturePosition.push([{x: signPosition.x,y: signPosition.y}]);
//   //       // signatureSize.push([{width: recipient.size.width, height : recipient.size.height}]);
//   //       //  mypos=[...signPositions];
//   //       mypos[pageIndex]={
//   //         x:signPos.x,
//   //         y:signPos.y,
//   //       }

//   //       mysize[pageIndex]={
//   //         width:recipient.size.width,
//   //         height:recipient.size.height,
//   //       }
//   //     })

//   //     setSignPositions(mypos);
//   //     setSignSize(mysize);
//   //     console.log(signSize);

//   //     // console.log("pdf: " ,tempSign);
//   //     // console.log("signaturePosition: " ,mypos);
//   //     // console.log("signatureSize: " ,signatureSize);
//   //     // console.log("numPages: " ,numPages);
//   //     generateSignedPdf(tempSign,drawingData,signPositions,signSize,numPages);
//   // }

//   const handleImageDone=()=>{

//   }

//   const handleTextDone=()=>{

//   }

//   return (
//     <>
//       {tempSign && (
//         <div className="main-container">
//           <div className="inner-container-main">
//             <div className="inner-container-main-toolbar">
//               <Toolbar
//                 numPages={numPages}
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//                 mainContainerRef={mainContainerRef}
//               />
//             </div>
//             <div className="inner_container_main_body">
//               <div className="inner-container-main-body-sider">
//                 <Sidebar
//                   thumbnails={thumbnails}
//                   currentPage={currentPage}
//                   handleThumbnailClick={(pageNumber) =>
//                     handleThumbnailClick(pageNumber, mainContainerRef, setCurrentPage, numPages)
//                   }
//                 />
//               </div>

//               <div className="inner-container-main-body-content">
//                 <div className="pdf-viewer">
//                   <div className="mypdfCenter">
//                     <div
//                       className="scrollable-container"
//                       ref={mainContainerRef}
//                       onScroll={handleContainerScroll}
//                     >
//                       {isLoading && (
//                         <div className="loading-container">
//                           <ProgressBar
//                             height={60}
//                             width={80}
//                             ariaLabel="progress-bar-loading"
//                             wrapperStyle={{}}
//                             wrapperClass="progress-bar-wrapper"
//                             borderColor="#053b50"
//                             barColor="#026179"
//                           />
//                         </div>
//                       )}

//                       {!isLoading &&
//                         Array.from({ length: numPages }, (_, index) => (
//                           <div className="page" key={index}>
//                             <div className="pdf-page-container">
//                               <img
//                                 src={mainContentUrls[index]}
//                                 alt={`Page ${index + 1}`}
//                                 className="tmpid"
//                                 draggable="false"
//                               />

//                               {selectedTemplate &&
//                                 selectedTemplate.tempSidebarRecipients.tempSidebarRecipients.map(
//                                   (recipient, recipientIndex) => {
//                                     const pageIndex = Object.keys(recipient.pagePositions)[0];
//                                     const position = recipient.pagePositions[pageIndex][0];
//                                     const isSelected = recipient.email === selectedRecipient?.email; // Check if this recipient's email matches the selected recipient's email
//                                     if (parseInt(pageIndex) === index) {
//                                       return (
//                                         <div
//                                           key={recipientIndex}
//                                           onClick={() => {
//                                             openDrawingModal(recipient);
//                                             setSelectedRecipient(recipient); // Select this recipient when clicked
//                                           }}
//                                           style={{
//                                             border: '2px groove #000',
//                                             boxSizing: 'border-box',
//                                             position: 'absolute',
//                                             left: position.x,
//                                             top: position.y,
//                                             width: recipient.size.width,
//                                             height: recipient.size.height,
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             textShadow: '1px 1px 1px #122',
//                                             textAlign: 'center'
//                                           }}
//                                         >
//                                           {/* {isSelected ? (
//                         <img src={drawingData} alt=""  /> // Apply drawing data to the selected recipient
//                       ) : (
//                         recipient.name // Display recipient name for non-selected recipients
//                       )} */}
//                        {drawingData[recipient.email] && drawingData[recipient.email].map((drawingDataURL, drawingIndex) => (
//                                             <img key={drawingIndex} src={drawingDataURL} alt={`Drawing ${drawingIndex}`} />
//                                           ))}
//                                           {!drawingData[recipient.email] && isSelected && <img src={drawingData} alt="" />}
//                                           {!drawingData[recipient.email] && !isSelected && recipient.name}
//                                         </div>
//                                       );
//                                     }
//                                     return null;
//                                   }
//                                 )}

//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="setting">
//                   <AiFillSetting
//                     color="#053b50"
//                     className="setting-icon"
//                     onClick={onOpen}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <TempSignSidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} tempSign={tempSign}   />
//           {/* Render the DrawingModalComponent with the appropriate props */}
//           <DrawingModalComponent
//             isDrawingModalOpen={isDrawingModalOpen}
//             setIsDrawingModalOpen={setIsDrawingModalOpen}
//             drawingBoardRef={drawingBoardRef} // Make sure to pass the drawing board ref
//             handleDrawingDone={handleDrawingDone} // Implement this function in your component
//             handleImageDone={handleImageDone} // Implement this function in your component
//             handleTextDone={handleTextDone} // Implement this function in your component
//           />
//         </div>
//       )}
//     </>
//   );
// }

// export default TempSignMain;

// making modal for template
// import React, { useEffect, useState, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Button, useDisclosure ,Modal,ModalBody,ModalOverlay,ModalContent,ModalCloseButton,ModalFooter,ModalHeader,} from "@chakra-ui/react";
// import {
//   generateThumbnails,
//   handleScroll,
//   handleThumbnailClick,
//   getNonEmptyPixels, getCroppingRect,
// } from '../../SignpdfFunctional/main/pdfUtils';
// import { AiFillSetting } from 'react-icons/ai';
// import { ProgressBar } from 'react-loader-spinner';
// import Toolbar from '../../SignpdfFunctional/toolbar/Toolbar';
// import Sidebar from '../../SignpdfFunctional/sidebar/Sidebar';
// import TempSignSidebar from '../tempSignSidebar/TempSignSidebar';
// import { useTemplateContext } from '../TemplateSelectContext';
// import DrawingModalComponent from '../../SignpdfFunctional/DrawingModalComponent/DrawingModalComponent';
// import { PDFDocument } from "pdf-lib";

// function TempSignMain() {
//   const location = useLocation();
//   const tempSign = location.state?.tempSign;
//   const btnRef = React.useRef();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [thumbnails, setThumbnails] = useState([]);
//   const [mainContentUrls, setMainContentUrls] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const mainContainerRef = useRef(null);
//   const thumbnailContainerRef = useRef(null);
//   const drawingBoardRef = useRef(null);
//   const pdfImageSize = { width: 0, height: 0 };
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [positions, setPositions] = useState(Array.from({ length: numPages }, () => ({ x: 0, y: 0 })));
//   const { selectedTemplate ,setTemplate} = useTemplateContext();
//   const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);
//   const [selectedRecipient, setSelectedRecipient] = useState(null);
//   const [drawingData, setDrawingData] = useState({});
//   const [templates, setTemplates] = useState([]);

//   useEffect(() => {
//     setIsModalOpen(true);

//     const templateInfo = JSON.parse(localStorage.getItem("templateInfo"));

//     if (templateInfo) {
//       const { pageWidth,pageHeight,tempFilename, tempSidebarRecipients } = templateInfo;

//       const fetchTemplates = async () => {
//         const selectPdfBytes = await tempSign.arrayBuffer();
//         const selectpdfDoc = await PDFDocument.load(selectPdfBytes);
//         const selectpages = selectpdfDoc.getPages();
//         const selpage = selectpages[0];
//         const selectpageW = selpage.getWidth();
//         const selectpageH = selpage.getHeight();
//         if (
//           templateInfo && tempFilename &&  pageWidth.pageW === selectpageW &&  pageHeight.pageH === selectpageH
//         ) {
//           setTemplates([templateInfo]);
//         }
//       };

//       fetchTemplates();}

//     if (tempSign) {
//       generateThumbnails(tempSign)
//         .then(({ thumbnailUrls, contentUrls }) => {
//           setNumPages(thumbnailUrls.length);
//           setThumbnails(thumbnailUrls);
//           setMainContentUrls(contentUrls);
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error generating thumbnails:', error);
//         });
//     }
//   }, [tempSign]);

//   const handleTemplateClick=(selectTemplate)=>{
//     setTemplate(selectTemplate);
//   }

//   const handleContainerScroll = (event) => {
//     handleScroll(
//       event,
//       numPages,
//       positions,
//       pdfImageSize,
//       thumbnailContainerRef,
//       setCurrentPage,
//       setPositions
//     );
//   };

//   const handleModalDone = () => {
//     setIsModalOpen(false);
//   };

//   const openDrawingModal = (recipient) => {
//     setSelectedRecipient(recipient);
//     setIsDrawingModalOpen(true);
//   };

//   const handleDrawingDone = () => {
//     if (drawingBoardRef.current.isEmpty() || selectedRecipient === null) {
//       setIsDrawingModalOpen(false);
//       return;
//     }
//     if (selectedRecipient) {
//       const { pagePositions, size ,email } = selectedRecipient;
//       const pageIndex = Object.keys(pagePositions)[0]; // Assuming there's only one pagePosition
//       const position = pagePositions[pageIndex][0];

//       const drawingDataURL = drawingBoardRef.current.toDataURL();
//       const updatedDrawings = { ...drawingData };
//       const drawingImage = new Image();
//       drawingImage.src = drawingDataURL;
//       drawingImage.onload = () => {
//         const nonEmptyPixels = getNonEmptyPixels(drawingImage);
//         const croppingRect = getCroppingRect(nonEmptyPixels);

//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = croppingRect.width;
//         canvas.height = croppingRect.height;
//         context.drawImage(
//           drawingImage,
//           croppingRect.x,
//           croppingRect.y,
//           croppingRect.width,
//           croppingRect.height,
//           0,
//           0,
//           croppingRect.width,
//           croppingRect.height
//         );

//         const croppedDrawingDataURL = canvas.toDataURL();
//         if (!updatedDrawings[email]) {
//           updatedDrawings[email] = [];
//         }
//         // updatedDrawings[email].push(croppedDrawingDataURL);
//         updatedDrawings[email] = [croppedDrawingDataURL];
//           setDrawingData(updatedDrawings);
//         setIsDrawingModalOpen(false);
//       };
//     }
//   };

//   const handleImageDone=()=>{

//   }

//   const handleTextDone=()=>{

//   }

//   return (
//     <>
//       {tempSign && (
//         <>
//         <div className="main-container">
//           <div className="inner-container-main">
//             <div className="inner-container-main-toolbar">
//               <Toolbar
//                 numPages={numPages}
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//                 mainContainerRef={mainContainerRef}
//               />
//             </div>
//             <div className="inner_container_main_body">
//               <div className="inner-container-main-body-sider">
//                 <Sidebar
//                   thumbnails={thumbnails}
//                   currentPage={currentPage}
//                   handleThumbnailClick={(pageNumber) =>
//                     handleThumbnailClick(pageNumber, mainContainerRef, setCurrentPage, numPages)
//                   }
//                 />
//               </div>

//               <div className="inner-container-main-body-content">
//                 <div className="pdf-viewer">
//                   <div className="mypdfCenter">
//                     <div
//                       className="scrollable-container"
//                       ref={mainContainerRef}
//                       onScroll={handleContainerScroll}
//                     >
//                       {isLoading && (
//                         <div className="loading-container">
//                           <ProgressBar
//                             height={60}
//                             width={80}
//                             ariaLabel="progress-bar-loading"
//                             wrapperStyle={{}}
//                             wrapperClass="progress-bar-wrapper"
//                             borderColor="#053b50"
//                             barColor="#026179"
//                           />
//                         </div>
//                       )}

//                       {!isLoading &&
//                         Array.from({ length: numPages }, (_, index) => (
//                           <div className="page" key={index}>
//                             <div className="pdf-page-container">
//                               <img
//                                 src={mainContentUrls[index]}
//                                 alt={`Page ${index + 1}`}
//                                 className="tmpid"
//                                 draggable="false"
//                               />

//                               {selectedTemplate &&
//                                 selectedTemplate.tempSidebarRecipients.tempSidebarRecipients.map(
//                                   (recipient, recipientIndex) => {
//                                     const pageIndex = Object.keys(recipient.pagePositions)[0];
//                                     const position = recipient.pagePositions[pageIndex][0];
//                                     const isSelected = recipient.email === selectedRecipient?.email;
//                                     if (parseInt(pageIndex) === index) {
//                                       return (
//                                         <div
//                                           key={recipientIndex}
//                                           onClick={() => {
//                                             openDrawingModal(recipient);
//                                             setSelectedRecipient(recipient);
//                                           }}
//                                           style={{
//                                             border: '2px groove #000',
//                                             boxSizing: 'border-box',
//                                             position: 'absolute',
//                                             left: position.x,
//                                             top: position.y,
//                                             width: recipient.size.width,
//                                             height: recipient.size.height,
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             textShadow: '1px 1px 1px #122',
//                                             textAlign: 'center'
//                                           }}
//                                         >
//                        {drawingData[recipient.email] && drawingData[recipient.email].map((drawingDataURL, drawingIndex) => (
//                                             <img key={drawingIndex} src={drawingDataURL} alt={`Drawing ${drawingIndex}`} />
//                                           ))}
//                                           {!drawingData[recipient.email] && isSelected && <img src={drawingData} alt="" />}
//                                           {!drawingData[recipient.email] && !isSelected && recipient.name}
//                                         </div>
//                                       );
//                                     }
//                                     return null;
//                                   }
//                                 )}

//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="setting">
//                   <AiFillSetting
//                     color="#053b50"
//                     className="setting-icon"
//                     onClick={onOpen}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <TempSignSidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} tempSign={tempSign}   />

//           <DrawingModalComponent
//             isDrawingModalOpen={isDrawingModalOpen}
//             setIsDrawingModalOpen={setIsDrawingModalOpen}
//             drawingBoardRef={drawingBoardRef}
//             handleDrawingDone={handleDrawingDone}
//             handleImageDone={handleImageDone}
//             handleTextDone={handleTextDone}
//           />
//         </div>

//           <Modal size="xl" isOpen={isModalOpen} onClose={handleModalDone}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Select a Template</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//             { templates && templates.length > 0 ? (
//   templates.map((template) => (
//     <Button
//       key={template.id}
//       onClick={() => {
//         // selectedTemplate(template); // Set the selected template
//         setIsModalOpen(false); // Close the modal
//         handleTemplateClick(template);
//       }}
//     >
//       {template.tempFilename.tempFname}
//     </Button>
//   ))
// ) : (
//   <>
//   <div>No Templates available</div>
//   <p>Choose another pdf of same dimension</p>
//   </>
// )}
//             </ModalBody>
//           </ModalContent>
//           </Modal>
//           </>
//       )}
//     </>
//   );
// }

// export default TempSignMain;

// image is set now trying the responsive functionality
// import React, { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   Tooltip,
//   Text,
//   Flex,
//   Button,
//   useDisclosure,
//   Modal,
//   ModalBody,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   Input,
// } from "@chakra-ui/react";
// import {
//   generateThumbnails,
//   handleScroll,
//   handleThumbnailClick,
//   getNonEmptyPixels,
//   getCroppingRect,
// } from "../../SignpdfFunctional/main/pdfUtils";
// import { AiFillSetting } from "react-icons/ai";
// import { ProgressBar } from "react-loader-spinner";
// import Toolbar from "../../SignpdfFunctional/toolbar/Toolbar";
// import Sidebar from "../../SignpdfFunctional/sidebar/Sidebar";
// import TempSignSidebar from "../tempSignSidebar/TempSignSidebar";
// import { useTemplateContext } from "../TemplateSelectContext";
// import DrawingModalComponent from "../../SignpdfFunctional/DrawingModalComponent/DrawingModalComponent";
// import { PDFDocument } from "pdf-lib";

// function TempSignMain() {
//   const location = useLocation();
//   const tempSign = location.state?.tempSign;
//   const btnRef = React.useRef();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [thumbnails, setThumbnails] = useState([]);
//   const [mainContentUrls, setMainContentUrls] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const mainContainerRef = useRef(null);
//   const thumbnailContainerRef = useRef(null);
//   const drawingBoardRef = useRef(null);
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [positions, setPositions] = useState(
//     Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
//   );
//   const { selectedTemplate, setTemplate } = useTemplateContext();
//   const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);
//   const [selectedRecipient, setSelectedRecipient] = useState(null);
//   const [drawingData, setDrawingData] = useState({});
//   const [templates, setTemplates] = useState([]);
//   const [recipientName, setRecipientName] = useState("");
//   const [recipientEmail, setRecipientEmail] = useState("");
//   const [pdfImageSize, setPdfImageSize] = useState({ width: 0, height: 0 });
//   const [pdfImageRect, setpdfImageRect] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     setIsModalOpen(true);
//     const templateInfo = JSON.parse(localStorage.getItem("templateInfo"));

//     if (templateInfo) {
//       const fetchTemplates = async () => {
//         const selectPdfBytes = await tempSign.arrayBuffer();
//         const selectpdfDoc = await PDFDocument.load(selectPdfBytes);
//         const selectpages = selectpdfDoc.getPages();
//         const selpage = selectpages[0];
//         const selectpageW = selpage.getWidth();
//         const selectpageH = selpage.getHeight();

//         const matchingTemplates = templateInfo.filter(
//           (template) =>
//             template.tempFilename &&
//             template.pageWidth.pageW === selectpageW &&
//             template.pageHeight.pageH === selectpageH
//         );

//         if (matchingTemplates.length > 0) {
//           setTemplates(matchingTemplates);
//         }
//       };
//       fetchTemplates();
//     }

//     if (tempSign) {
//       generateThumbnails(tempSign)
//         .then(({ thumbnailUrls, contentUrls }) => {
//           setNumPages(thumbnailUrls.length);
//           setThumbnails(thumbnailUrls);
//           setMainContentUrls(contentUrls);
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error generating thumbnails:", error);
//         });
//     }
//   }, [tempSign]);

//   const handleTemplateClick = (selectTemplate) => {
//     setTemplate(selectTemplate);
//     const mypdfImage = new Image();
//     mypdfImage.src = mainContentUrls[0];
//     const pdfImage = document.querySelector(".tmpid");
//     const pdfImageRect = pdfImage.getBoundingClientRect();
//     mypdfImage.onload = () => {
//       setPdfImageSize({
//         width: mypdfImage.width,
//         height: mypdfImage.height,
//       });

//       setpdfImageRect({
//         width: pdfImageRect.width,
//         height: pdfImageRect.height,
//       });
//     };
//   };

//   const handleContainerScroll = (event) => {
//     handleScroll(
//       event,
//       numPages,
//       positions,
//       pdfImageSize,
//       thumbnailContainerRef,
//       setCurrentPage,
//       setPositions
//     );
//   };

//   const handleModalDone = () => {
//     setIsModalOpen(false);
//   };

//   const openDrawingModal = (recipient) => {
//     setSelectedRecipient(recipient);
//     setIsDrawingModalOpen(true);
//   };

//   const handleDrawingDone = () => {
//     if (drawingBoardRef.current.isEmpty() || selectedRecipient === null) {
//       setIsDrawingModalOpen(false);
//       return;
//     }
//     if (selectedRecipient) {
//       const { pagePositions, size, email } = selectedRecipient;
//       const pageIndex = Object.keys(pagePositions)[0];
//       const position = pagePositions[pageIndex][0];
//       const drawingDataURL = drawingBoardRef.current.toDataURL();
//       const updatedDrawings = { ...drawingData };
//       const drawingImage = new Image();
//       drawingImage.src = drawingDataURL;
//       drawingImage.onload = () => {
//         const nonEmptyPixels = getNonEmptyPixels(drawingImage);
//         const croppingRect = getCroppingRect(nonEmptyPixels);

//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = croppingRect.width;
//         canvas.height = croppingRect.height;
//         context.drawImage(
//           drawingImage,
//           croppingRect.x,
//           croppingRect.y,
//           croppingRect.width,
//           croppingRect.height,
//           0,
//           0,
//           croppingRect.width,
//           croppingRect.height
//         );

//         const croppedDrawingDataURL = canvas.toDataURL();
//         if (!updatedDrawings[email]) {
//           updatedDrawings[email] = [];
//         }
//         updatedDrawings[email] = [croppedDrawingDataURL];
//         setDrawingData(updatedDrawings);
//         setIsDrawingModalOpen(false);
//       };
//     }
//   };

//   const handleImageDone = (imgfile) => {
//     if (selectedRecipient === null) {
//       setIsDrawingModalOpen(false);
//       return;
//     }
//     if (selectedRecipient) {
//       const { pagePositions, size, email } = selectedRecipient;
//       const pageIndex = Object.keys(pagePositions)[0]; // Assuming there's only one pagePosition
//       const position = pagePositions[pageIndex][0];

//       const updatedDrawingData = { ...drawingData };
//       const uploadedImage = new Image();
//       uploadedImage.src = imgfile;
//       uploadedImage.onload = () => {
//         const imgmaxWidth = size.width;
//         const imgmaxHeight = size.height;
//         let newWidth = uploadedImage.width;
//         let newHeight = uploadedImage.height;
//         if (
//           uploadedImage.width > imgmaxWidth ||
//           uploadedImage.height > imgmaxHeight
//         ) {
//           if (
//             uploadedImage.width / imgmaxWidth >
//             uploadedImage.height / imgmaxHeight
//           ) {
//             newWidth = imgmaxWidth;
//             newHeight =
//               (uploadedImage.height * imgmaxWidth) / uploadedImage.width;
//           } else {
//             newHeight = imgmaxHeight;
//             newWidth =
//               (uploadedImage.width * imgmaxHeight) / uploadedImage.height;
//           }
//         }

//         const canvas = document.createElement("canvas");
//         canvas.width = newWidth;
//         canvas.height = newHeight;
//         const context = canvas.getContext("2d");
//         context.drawImage(uploadedImage, 0, 0, newWidth, newHeight);
//         const resizedImageDataURL = canvas.toDataURL();
//         if (!updatedDrawingData[email]) {
//           updatedDrawingData[email] = [];
//         }
//         updatedDrawingData[email] = [resizedImageDataURL];
//         setDrawingData(updatedDrawingData);
//         setIsDrawingModalOpen(false);
//       };
//     }
//   };

//   const handleTextDone = () => {};
//   return (
//     <>
//       {tempSign && (
//         <>
//           <div className="main-container">
//             <div className="inner-container-main">
//               <div className="inner-container-main-toolbar">
//                 <Toolbar
//                   numPages={numPages}
//                   currentPage={currentPage}
//                   setCurrentPage={setCurrentPage}
//                   mainContainerRef={mainContainerRef}
//                 />
//               </div>
//               <div className="inner_container_main_body">
//                 <div className="inner-container-main-body-sider">
//                   <Sidebar
//                     thumbnails={thumbnails}
//                     currentPage={currentPage}
//                     handleThumbnailClick={(pageNumber) =>
//                       handleThumbnailClick(
//                         pageNumber,
//                         mainContainerRef,
//                         setCurrentPage,
//                         numPages
//                       )
//                     }
//                   />
//                 </div>

//                 <div className="inner-container-main-body-content">
//                   <div className="pdf-viewer">
//                     <div className="mypdfCenter">
//                       <div
//                         className="scrollable-container"
//                         ref={mainContainerRef}
//                         onScroll={handleContainerScroll}
//                       >
//                         {isLoading && (
//                           <div className="loading-container">
//                             <ProgressBar
//                               height={60}
//                               width={80}
//                               ariaLabel="progress-bar-loading"
//                               wrapperStyle={{}}
//                               wrapperClass="progress-bar-wrapper"
//                               borderColor="#053b50"
//                               barColor="#026179"
//                             />
//                           </div>
//                         )}

//                         {!isLoading &&
//                           Array.from({ length: numPages }, (_, index) => (
//                             <div className="page" key={index}>
//                               <div className="pdf-page-container">
//                                 <img
//                                   src={mainContentUrls[index]}
//                                   alt={`Page ${index + 1}`}
//                                   className="tmpid"
//                                   draggable="false"
//                                 />

//                                 {selectedTemplate &&
//                                   selectedTemplate.tempSidebarRecipients.tempSidebarRecipients.map(
//                                     (recipient, recipientIndex) => {
//                                       const pageIndex = Object.keys(
//                                         recipient.pagePositions
//                                       )[0];
//                                       const position =
//                                         recipient.pagePositions[pageIndex][0];
//                                       const isSelected =
//                                         recipient.email ===
//                                         selectedRecipient?.email;
//                                       const isCurrentRecipient =
//                                         recipient.name === recipientName &&
//                                         recipient.email === recipientEmail;
//                                       const isDisabled =
//                                         !isCurrentRecipient && !isSelected;

//                                       if (parseInt(pageIndex) === index) {
//                                         const adjustedLeft = (position.x / pdfImageSize.width) *pdfImageRect.width;
//                                         const adjustedTop =(position.y / pdfImageSize.height) *pdfImageRect.height;
//                                         const adjustedWidth = (parseFloat(recipient.size.width) /pdfImageSize.width) *pdfImageRect.width;
//                                         const adjustedHeight =(parseFloat(recipient.size.height) / pdfImageSize.height) *pdfImageRect.height;

//                                         return (
//                                           <div
//                                             className="signRecipientBox"
//                                             key={recipientIndex}
//                                             onClick={() => {
//                                               if (!isDisabled) {
//                                                 openDrawingModal(recipient);
//                                                 setSelectedRecipient(recipient);
//                                               }
//                                             }}
//                                             style={{
//                                               border: "2px groove #000",
//                                               boxSizing: "border-box",
//                                               position: "absolute",
//                                               left: adjustedLeft,
//                                               top: adjustedTop,
//                                               width: adjustedWidth,
//                                               height: adjustedHeight,
//                                               display: "flex",
//                                               alignItems: "center",
//                                               justifyContent: "center",
//                                               textShadow: "1px 1px 1px #122",
//                                               textAlign: "center",
//                                               opacity: isDisabled ? 0.5 : 1,
//                                               pointerEvents: isDisabled  ? "none": "auto",
//                                             }}
//                                           >
//                                             {drawingData[recipient.email] ? (
//                                               drawingData[recipient.email].map(
//                                                 (
//                                                   drawingDataURL,
//                                                   drawingIndex
//                                                 ) => (
//                                                   <Tooltip
//                                                     hasArrow
//                                                     label={recipient.name}
//                                                     bg="gray.300"
//                                                     color="black"
//                                                   >
//                                                     <img
//                                                       key={drawingIndex}
//                                                       src={drawingDataURL}
//                                                       alt={`Drawing ${drawingIndex}`}
//                                                     />
//                                                   </Tooltip>
//                                                 )
//                                               )
//                                             ) : (
//                                               <span>{recipient.name}</span>
//                                             )}
//                                           </div>
//                                         );
//                                       }
//                                     }
//                                   )}
//                               </div>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="setting">
//                     <AiFillSetting  color="#053b50"   className="setting-icon" onClick={onOpen} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <TempSignSidebar
//               isOpen={isOpen}
//               onClose={onClose}
//               btnRef={btnRef}
//               tempSign={tempSign}
              
//             />

//             <DrawingModalComponent
//               isDrawingModalOpen={isDrawingModalOpen}
//               setIsDrawingModalOpen={setIsDrawingModalOpen}
//               drawingBoardRef={drawingBoardRef}
//               handleDrawingDone={handleDrawingDone}
//               handleImageDone={handleImageDone}
//               handleTextDone={handleTextDone}
//             />
//           </div>

//           <Modal size="xl" isOpen={isModalOpen}>
//             <ModalOverlay />
//             <ModalContent>
//               <ModalHeader>Select a Template</ModalHeader>
//               {/* <ModalCloseButton /> */}
//               <ModalBody>
//                 <Flex alignItems="center">
//                   <Input
//                     type="text"
//                     id="recipientName"
//                     placeholder="Recipient Name"
//                     value={recipientName}
//                     onChange={(e) => setRecipientName(e.target.value)}
//                   />
//                   <Input
//                     type="email"
//                     placeholder="Recipient Email"
//                     id="recipientEmail"
//                     value={recipientEmail}
//                     onChange={(e) => setRecipientEmail(e.target.value)}
//                   />
//                 </Flex>
//                 <Text>
//                   <b>Select Template:</b>
//                 </Text>
//                 {templates && templates.length > 0 ? (
//                   templates.map((template) => {
//                     const isTemplateMatched =
//                       template.tempSidebarRecipients.tempSidebarRecipients.some(
//                         (recipient) =>
//                           recipient.name === recipientName &&
//                           recipient.email === recipientEmail
//                       );
//                     return (
//                       <Button
//                         key={template.id}
//                         m={4}
//                         onClick={() => {
//                           setIsModalOpen(false);
//                           handleTemplateClick(template);
//                         }}
//                         isDisabled={!isTemplateMatched}
//                       >
//                         {template.templateName.templateName}
//                       </Button>
//                     );
//                   })
//                 ) : (
//                   <>
//                     <div>No Templates available</div>
//                     <p>Choose another pdf of the same dimension</p>
//                   </>
//                 )}
//               </ModalBody>
//             </ModalContent>
//           </Modal>
//         </>
//       )}
//     </>
//   );
// }

// export default TempSignMain;

//download pdf functionality
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Tooltip,
  Text,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Input,
} from "@chakra-ui/react";
import {
  generateThumbnails,
  handleScroll,
  handleThumbnailClick,
  getNonEmptyPixels,
  getCroppingRect,
} from "../../SignpdfFunctional/main/pdfUtils";
import { AiFillSetting } from "react-icons/ai";
import { ProgressBar } from "react-loader-spinner";
import Toolbar from "../../SignpdfFunctional/toolbar/Toolbar";
import Sidebar from "../../SignpdfFunctional/sidebar/Sidebar";
import TempSignSidebar from "../tempSignSidebar/TempSignSidebar";
import { useTemplateContext } from "../TemplateSelectContext";
import DrawingModalComponent from "../../SignpdfFunctional/DrawingModalComponent/DrawingModalComponent";
import { PDFDocument } from "pdf-lib";

function TempSignMain() {
  const location = useLocation();
  const tempSign = location.state?.tempSign;
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [thumbnails, setThumbnails] = useState([]);
  const [mainContentUrls, setMainContentUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mainContainerRef = useRef(null);
  const thumbnailContainerRef = useRef(null);
  const drawingBoardRef = useRef(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [positions, setPositions] = useState(
    Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
  );
  const { selectedTemplate, setTemplate } = useTemplateContext();
  const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [drawingData, setDrawingData] = useState({});
  const [templates, setTemplates] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [pdfImageSize, setPdfImageSize] = useState({ width: 0, height: 0 });
  const [pdfImageRect, setpdfImageRect] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsModalOpen(true);
    const templateInfo = JSON.parse(localStorage.getItem("templateInfo"));

    if (templateInfo) {
      const fetchTemplates = async () => {
        const selectPdfBytes = await tempSign.arrayBuffer();
        const selectpdfDoc = await PDFDocument.load(selectPdfBytes);
        const selectpages = selectpdfDoc.getPages();
        const selpage = selectpages[0];
        const selectpageW = selpage.getWidth();
        const selectpageH = selpage.getHeight();

        const matchingTemplates = templateInfo.filter(
          (template) =>
            template.tempFilename &&
            template.pageWidth.pageW === selectpageW &&
            template.pageHeight.pageH === selectpageH
        );

        if (matchingTemplates.length > 0) {
          setTemplates(matchingTemplates);
        }
      };
      fetchTemplates();
    }

    if (tempSign) {
      generateThumbnails(tempSign)
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
  }, [tempSign]);

  const handleTemplateClick = (selectTemplate) => {
    setTemplate(selectTemplate);
    const mypdfImage = new Image();
    mypdfImage.src = mainContentUrls[0];
    const pdfImage = document.querySelector(".tmpid");
    const pdfImageRect = pdfImage.getBoundingClientRect();
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
  };

  const handleModalDone = () => {
    setIsModalOpen(false);
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

  const genPdf = async () => {
    if (!selectedTemplate) {
      console.error("No template selected.");
      return;
    }
    const pdfBytes = await tempSign.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const element = document.querySelector('.tmpid'); 
    const styles = window.getComputedStyle(element);
    const heightWithPaddingAndMargin = parseFloat(styles.height);
  
    selectedTemplate.tempSidebarRecipients.tempSidebarRecipients.forEach(async (recipient) => {
      const pageIndex = Object.keys(recipient.pagePositions)[0];
      const position = recipient.pagePositions[pageIndex][0];
        const pageHeight = pages[0].getHeight();
      const adjustedWidth = (parseFloat(recipient.size.width) / pdfImageSize.width) * pdfImageRect.width;
      const adjustedHeight = (parseFloat(recipient.size.height) / pdfImageSize.height) * pdfImageRect.height;
      const adjustedLeft = (position.x / pdfImageSize.width) * pdfImageRect.width ;
      // const adjustedTop = (position.y / pdfImageSize.height) * pdfImageRect.height ;
      const adjustedTop = (heightWithPaddingAndMargin - position.y - parseFloat(adjustedHeight) ) * (pageHeight / heightWithPaddingAndMargin) ;
  
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
  };
  
  return (
    <>
      {tempSign && (
        <>
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

                                {selectedTemplate &&
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
            <TempSignSidebar
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
              tempSign={tempSign}
              genPdf={genPdf}
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

          <Modal size="xl" isOpen={isModalOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select a Template</ModalHeader>
              {/* <ModalCloseButton /> */}
              <ModalBody>
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
                <Text>
                  <b>Select Template:</b>
                </Text>
                {templates && templates.length > 0 ? (
                  templates.map((template) => {
                    const isTemplateMatched =
                      template.tempSidebarRecipients.tempSidebarRecipients.some(
                        (recipient) =>
                          recipient.name === recipientName &&
                          recipient.email === recipientEmail
                      );
                    return (
                      <Button
                        key={template.id}
                        m={4}
                        onClick={() => {
                          setIsModalOpen(false);
                          handleTemplateClick(template);
                        }}
                        isDisabled={!isTemplateMatched}
                      >
                        {template.templateName.templateName}
                      </Button>
                    );
                  })
                ) : (
                  <>
                    <div>No Templates available</div>
                    <p>Choose another pdf of the same dimension</p>
                  </>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export default TempSignMain;
