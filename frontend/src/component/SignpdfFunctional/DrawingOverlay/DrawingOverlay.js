// import React from "react";
// import { Rnd } from "react-rnd";
// import './drawingOverlay.css';
// import {getDimensionsBasedOnScreenSize} from '../main/pdfUtils';

// const DrawingOverlay = ({
//   index,
//   signatureSize,
//   drawingData,
//   handleDrawingPadResize,
//   handleDrawingPadDragStop,
//   handleDeleteDrawing,
// }) => {
//   const dimensions = getDimensionsBasedOnScreenSize();

//   return (
//     <Rnd
//       size={{
//         width: signatureSize[index].width,
//         height: signatureSize[index].height,
//       }}
//       bounds="parent"
//       enableResizing={{
//         topRight: true,
//         bottomRight: true,
//         bottomLeft: true,
//         topLeft: true,
//       }}
//       className="drawing-overlay"
//       style={{
//         width: signatureSize[index].width,
//         height: signatureSize[index].height,
//         position: "absolute",
//         zIndex: "1",
//         border: "1px dashed rgb(79, 78, 78)",
//         boxSizing: "border-box",
//         objectFit: "fill",
//       }}
//       minWidth={dimensions.minWidth}
//       minHeight={dimensions.minHeight}
//       maxWidth={dimensions.maxWidth}
//       maxHeight={dimensions.maxHeight}
//       onResize={(e, direction, ref, delta, position) =>
//         handleDrawingPadResize(e, direction, ref, delta, position, index)
//       }
//       onDragStop={(e, d) => handleDrawingPadDragStop(e, d, index)}
//     >
//       <img
//         draggable="false"
//         style={{
//           width: "100%",
//           height: "100%",
//           boxSizing: "border-box",
//         }}
//         src={drawingData[index + 1]}
//         className="drawing-overlay"
//         alt=""
//       />
//       <div className="drawing-actions">
//         <div
//           onClick={() => handleDeleteDrawing(index)}
//           onTouchStart={() => handleDeleteDrawing(index)}
//           className="delete-button"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="18"
//             height="18"
//             viewBox="0 0 25 25"
//             fill="none"
//             stroke="white"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="18" y1="6" x2="6" y2="18"></line>
//             <line x1="6" y1="6" x2="18" y2="18"></line>
//           </svg>
//         </div>

//       </div>
//     </Rnd>
//   );
// };

// export default DrawingOverlay;

//copy btn is added 
// import React from "react";
// import { Rnd } from "react-rnd";
// import { IconButton } from "@chakra-ui/react"; // Import Chakra UI components
// import { CopyIcon, DeleteIcon } from "@chakra-ui/icons"; // Import Chakra UI icons
// import './drawingOverlay.css';
// import { getDimensionsBasedOnScreenSize } from '../main/pdfUtils';

// const DrawingOverlay = ({
//   index,
//   signatureSize,
//   drawingData,
//   handleDrawingPadResize,
//   handleDrawingPadDragStop,
//   setDrawingData
// }) => {
//   const dimensions = getDimensionsBasedOnScreenSize();

//   const handleDeleteDrawing = (pageIndex) => {
//     const updatedDrawingData = { ...drawingData };
//     delete updatedDrawingData[pageIndex + 1];
//     setDrawingData(updatedDrawingData);
//   };

//   return (
//     <Rnd
//       size={{
//         width: signatureSize[index].width,
//         height: signatureSize[index].height,
//       }}
//       bounds="parent"
//       enableResizing={{
//         topRight: true,
//         bottomRight: true,
//         bottomLeft: true,
//         topLeft: true,
//       }}
//       className="drawing-overlay"
//       style={{
//         width: signatureSize[index].width,
//         height: signatureSize[index].height,
//         position: "absolute",
//         zIndex: "1",
//         border: "1px dashed rgb(79, 78, 78)",
//         boxSizing: "border-box",
//         objectFit: "fill",
//       }}
//       minWidth={dimensions.minWidth}
//       minHeight={dimensions.minHeight}
//       maxWidth={dimensions.maxWidth}
//       maxHeight={dimensions.maxHeight}
//       onResize={(e, direction, ref, delta, position) =>
//         handleDrawingPadResize(e, direction, ref, delta, position, index)
//       }
//       onDragStop={(e, d) => handleDrawingPadDragStop(e, d, index)}
//     >
//       <img
//         draggable="false"
//         style={{
//           width: "100%",
//           height: "100%",
//           boxSizing: "border-box",
//         }}
//         src={drawingData[index + 1]}
//         className="drawing-overlay"
//         alt=""
//       />
//       <div className="drawing-actions">
//         <IconButton
//           size="xs"
//           aria-label="Copy"
//           icon={<CopyIcon />}
//           textColor={"blue"}
//           onClick={() => {
//             // Add copy functionality here
//           }}
//           marginRight="2"
//         />
//         <IconButton
//           size="xs"
//           aria-label="Delete"
//           textColor="red"
//           icon={<DeleteIcon />}
//           onClick={() => handleDeleteDrawing(index)}
//         />
//       </div>
//     </Rnd>
//   );
// };

// export default DrawingOverlay;

//proper code till all the radio buttons
// import React, { useState } from "react";
// import { Rnd } from "react-rnd";
// import { IconButton,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Select } from "@chakra-ui/react";
// import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
// import './drawingOverlay.css';
// import { getDimensionsBasedOnScreenSize } from '../main/pdfUtils';

// const DrawingOverlay = ({
//   index,
//   positions,
//   signatureSize,
//   drawingData,
//   handleDrawingPadResize,
//   handleDrawingPadDragStop,
//   setDrawingData,
//   numPages,
//   currentPage
// }) => {
//   const dimensions = getDimensionsBasedOnScreenSize();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [copyOptions, setCopyOptions] = useState({
//     copyTo: "current", // Default option
//     customPage: 1, // Default custom page number
//   });
//   const handleDeleteDrawing = (pageIndex) => {
//     const updatedDrawingData = { ...drawingData };
//     delete updatedDrawingData[pageIndex + 1];
//     setDrawingData(updatedDrawingData);
//   };

//   const handleCopyButtonClick = () => {
//     setIsModalOpen(true);
//   };
  
//   const handleCopyConfirm = () => {
//     const { copyTo, customPage } = copyOptions;
//     const currentDrawing = drawingData[currentPage];
//     const updatedDrawingData = { ...drawingData };
  
//     if (copyTo === "first") {
//       updatedDrawingData[1] = currentDrawing;
//     } else if (copyTo === "last") {
//       updatedDrawingData[numPages] = currentDrawing;
//     } else if (copyTo === "custom" && customPage >= 1 && customPage <= numPages) {
//       updatedDrawingData[customPage] = currentDrawing;
//     } else if (copyTo === "all") {
//       for (let page = 1; page <= numPages; page++) {
//         updatedDrawingData[page] = currentDrawing;
//       }
//     }
  
//     setDrawingData(updatedDrawingData);
//     setIsModalOpen(false);
//   };
  
//   const pageOptions = Array.from({ length: numPages }, (_, i) => i + 1);

//   return (
//     <>
//       <Rnd
//         size={{
//           width: signatureSize[index].width,
//           height: signatureSize[index].height,
//         }}
//         bounds="parent"
//         enableResizing={{
//           topRight: true,
//           bottomRight: true,
//           bottomLeft: true,
//           topLeft: true,
//         }}
//         className="drawing-overlay"
//         style={{
//           width: signatureSize[index].width,
//           height: signatureSize[index].height,
//           position: "absolute",
//           zIndex: "1",
//           border: "1px dashed rgb(79, 78, 78)",
//           boxSizing: "border-box",
//           objectFit: "fill",
//         }}
//         minWidth={dimensions.minWidth}
//         minHeight={dimensions.minHeight}
//         maxWidth={dimensions.maxWidth}
//         maxHeight={dimensions.maxHeight}
//         onResize={(e, direction, ref, delta, position) =>
//           handleDrawingPadResize(e, direction, ref, delta, position, index)
//         }
//         onDragStop={(e, d) => handleDrawingPadDragStop(e, d, index)}
//       >
//         <img
//           draggable="false"
//           style={{
//             width: "100%",
//             height: "100%",
//             boxSizing: "border-box",
//           }}
//           src={drawingData[index + 1]}
//           className="drawing-overlay"
//           alt=""
//         />
//         <div className="drawing-actions">
//           <IconButton
//             size="xs"
//             aria-label="Copy"
//             icon={<CopyIcon />}
//             textColor={"blue"}
//             onClick={handleCopyButtonClick}
//             marginRight="2"
//           />
//           <IconButton
//             size="xs"
//             aria-label="Delete"
//             textColor="red"
//             icon={<DeleteIcon />}
//             onClick={() => handleDeleteDrawing(index)}
//           />
//         </div>
//       </Rnd>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Copy Options</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//           <div>
//               <input
//                 type="radio"
//                 id="all"
//                 name="copyTo"
//                 value="all"
//                 checked={copyOptions.copyTo === "all"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "all" })}
//               />
//               <label htmlFor="first">All Pages</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="first"
//                 name="copyTo"
//                 value="first"
//                 checked={copyOptions.copyTo === "first"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "first" })}
//               />
//               <label htmlFor="first">First Page</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="last"
//                 name="copyTo"
//                 value="last"
//                 checked={copyOptions.copyTo === "last"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "last" })}
//               />
//               <label htmlFor="last">Last Page</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="custom"
//                 name="copyTo"
//                 value="custom"
//                 checked={copyOptions.copyTo === "custom"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "custom" })}
//               />
//               <label htmlFor="custom">Custom Page</label>
//               {copyOptions.copyTo === "custom" && (
//                 <Select
//                   value={copyOptions.customPage}
//                   onChange={(e) => setCopyOptions({ ...copyOptions, customPage: parseInt(e.target.value) })}
//                 >
//                   {pageOptions.map((page) => (
//                     <option key={page} value={page}>
//                       Page {page}
//                     </option>
//                   ))}
//                 </Select>
//               )}
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleCopyConfirm}>
//               Copy
//             </Button>
//             <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default DrawingOverlay;

// trying to copy proper positions 
// import React, { useState } from "react";
// import { Rnd } from "react-rnd";
// import { IconButton,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Select } from "@chakra-ui/react";
// import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
// import './drawingOverlay.css';
// import { getDimensionsBasedOnScreenSize } from '../main/pdfUtils';

// const DrawingOverlay = ({
//   index,
//   positions,
//   setpositions,
//   signatureSize,
//   drawingData,
//   handleDrawingPadResize,
//   handleDrawingPadDragStop,
//   setDrawingData,
//   numPages,
//   currentPage
// }) => {
//   const dimensions = getDimensionsBasedOnScreenSize();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [copyOptions, setCopyOptions] = useState({
//     copyTo: "current", // Default option
//     customPage: 1, // Default custom page number
//   });
//   const handleDeleteDrawing = (pageIndex) => {
//     const updatedDrawingData = { ...drawingData };
//     delete updatedDrawingData[pageIndex + 1];
//     setDrawingData(updatedDrawingData);
//   };

//   const handleCopyButtonClick = () => {
//     setIsModalOpen(true);
//   };
  
//   const handleCopyConfirm = () => {
//     const { copyTo, customPage } = copyOptions;
//     const currentDrawing = drawingData[currentPage];
//     const updatedDrawingData = { ...drawingData };
    
//     console.log(positions[0].x);
//     if (copyTo === "first") {
//       // updatedDrawingData[1] = { ...currentDrawing, x: positions[0].x, y: positions[0].y };
//       updatedDrawingData[1] = currentDrawing;
      
//     } else if (copyTo === "last") {
//       updatedDrawingData[numPages] = currentDrawing;
//     } else if (copyTo === "custom" && customPage >= 1 && customPage <= numPages) {
//       updatedDrawingData[customPage] = currentDrawing;
//     } else if (copyTo === "all") {
//       for (let page = 1; page <= numPages; page++) {
//         updatedDrawingData[page] = currentDrawing;
//       }
//     }
  
//     setDrawingData(updatedDrawingData);
//     setIsModalOpen(false);
//   };
  
//   const pageOptions = Array.from({ length: numPages }, (_, i) => i + 1);

//   return (
//     <>
//       <Rnd
//         size={{
//           width: signatureSize[index].width,
//           height: signatureSize[index].height,
//         }}
//         bounds="parent"
//         enableResizing={{
//           topRight: true,
//           bottomRight: true,
//           bottomLeft: true,
//           topLeft: true,
//         }}
//         className="drawing-overlay"
//         style={{
//           width: signatureSize[index].width,
//           height: signatureSize[index].height,
//           position: "absolute",
//           zIndex: "1",
//           border: "1px dashed rgb(79, 78, 78)",
//           boxSizing: "border-box",
//           objectFit: "fill",
//         }}
//         minWidth={dimensions.minWidth}
//         minHeight={dimensions.minHeight}
//         maxWidth={dimensions.maxWidth}
//         maxHeight={dimensions.maxHeight}
//         onResize={(e, direction, ref, delta, position) =>
//           handleDrawingPadResize(e, direction, ref, delta, position, index)
//         }
//         onDragStop={(e, d) => handleDrawingPadDragStop(e, d, index)}
//       >
//         <img
//           draggable="false"
//           style={{
//             width: "100%",
//             height: "100%",
//             boxSizing: "border-box",
//           }}
//           src={drawingData[index + 1]}
//           className="drawing-overlay"
//           alt=""
//         />
//         <div className="drawing-actions">
//           <IconButton
//             size="xs"
//             aria-label="Copy"
//             icon={<CopyIcon />}
//             textColor={"blue"}
//             onClick={handleCopyButtonClick}
//             marginRight="2"
//           />
//           <IconButton
//             size="xs"
//             aria-label="Delete"
//             textColor="red"
//             icon={<DeleteIcon />}
//             onClick={() => handleDeleteDrawing(index)}
//           />
//         </div>
//       </Rnd>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Copy Options</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//           <div>
//               <input
//                 type="radio"
//                 id="all"
//                 name="copyTo"
//                 value="all"
//                 checked={copyOptions.copyTo === "all"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "all" })}
//               />
//               <label htmlFor="first">All Pages</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="first"
//                 name="copyTo"
//                 value="first"
//                 checked={copyOptions.copyTo === "first"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "first" })}
//               />
//               <label htmlFor="first">First Page</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="last"
//                 name="copyTo"
//                 value="last"
//                 checked={copyOptions.copyTo === "last"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "last" })}
//               />
//               <label htmlFor="last">Last Page</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="custom"
//                 name="copyTo"
//                 value="custom"
//                 checked={copyOptions.copyTo === "custom"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "custom" })}
//               />
//               <label htmlFor="custom">Custom Page</label>
//               {copyOptions.copyTo === "custom" && (
//                 <Select
//                   value={copyOptions.customPage}
//                   onChange={(e) => setCopyOptions({ ...copyOptions, customPage: parseInt(e.target.value) })}
//                 >
//                   {pageOptions.map((page) => (
//                     <option key={page} value={page}>
//                       Page {page}
//                     </option>
//                   ))}
//                 </Select>
//               )}
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleCopyConfirm}>
//               Copy
//             </Button>
//             <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default DrawingOverlay;

//perfect position but size is left
// import React, { useState } from "react";
// import { Rnd } from "react-rnd";
// import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Select } from "@chakra-ui/react";
// import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
// import './drawingOverlay.css';
// import { getDimensionsBasedOnScreenSize } from '../main/pdfUtils';

// const DrawingOverlay = ({
//   index,
//   positions,
//   setpositions,
//   signatureSize,
//   drawingData,
//   handleDrawingPadResize,
//   handleDrawingPadDragStop,
//   setDrawingData,
//   numPages,
//   currentPage
// }) => {
//   const dimensions = getDimensionsBasedOnScreenSize();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [copyOptions, setCopyOptions] = useState({
//     copyTo: "current", // Default option
//     customPage: 1, // Default custom page number
//   });
//   const handleDeleteDrawing = (pageIndex) => {
//     const updatedDrawingData = { ...drawingData };
//     delete updatedDrawingData[pageIndex + 1];
//     setDrawingData(updatedDrawingData);

//     // Also remove the position of the deleted signature
//     const updatedPositions = [...positions];
//     updatedPositions.splice(pageIndex, 1);
//     setpositions(updatedPositions);
//   };

//   const handleCopyButtonClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCopyConfirm = () => {
//     const { copyTo, customPage } = copyOptions;
//     const currentDrawing = drawingData[currentPage];
//     const updatedDrawingData = { ...drawingData };
//     const updatedPositions = [...positions];

//     if (copyTo === "first" || copyTo === "last" || (copyTo === "custom" && customPage >= 1 && customPage <= numPages)) {
//       const copiedPageIndex = copyTo === "custom" ? customPage : copyTo === "first" ? 1 : numPages;
//       updatedDrawingData[copiedPageIndex] = currentDrawing;
//       updatedPositions[copiedPageIndex - 1] = { x: positions[currentPage - 1].x, y: positions[currentPage - 1].y };
//     } else if (copyTo === "all") {
//       for (let page = 1; page <= numPages; page++) {
//         updatedDrawingData[page] = currentDrawing;
//         updatedPositions[page - 1] = { x: positions[currentPage - 1].x, y: positions[currentPage - 1].y };
//       }
//     }

//     setDrawingData(updatedDrawingData);
//     setpositions(updatedPositions);
//     setIsModalOpen(false);
//   };

//   const pageOptions = Array.from({ length: numPages }, (_, i) => i + 1);

//   return (
//     <>
//       <Rnd
//         size={{
//           width: signatureSize[index].width,
//           height: signatureSize[index].height,
//         }}
//         position={{
//           x: positions[index].x,
//           y: positions[index].y,
//         }}
//         bounds="parent"
//         enableResizing={{
//           topRight: true,
//           bottomRight: true,
//           bottomLeft: true,
//           topLeft: true,
//         }}
//         className="drawing-overlay"
//         style={{
//           width: signatureSize[index].width,
//           height: signatureSize[index].height,
//           position: "absolute",
//           zIndex: "1",
//           border: "1px dashed rgb(79, 78, 78)",
//           boxSizing: "border-box",
//           objectFit: "fill",
//         }}
//         minWidth={dimensions.minWidth}
//         minHeight={dimensions.minHeight}
//         maxWidth={dimensions.maxWidth}
//         maxHeight={dimensions.maxHeight}
//         onResize={(e, direction, ref, delta, position) =>
//           handleDrawingPadResize(e, direction, ref, delta, position, index)
//         }
//         onDragStop={(e, d) => {
//           handleDrawingPadDragStop(e, d, index);
//           const updatedPositions = [...positions];
//           updatedPositions[index] = { x: d.x, y: d.y };
//           setpositions(updatedPositions);
//         }}
//       >
//         <img
//           draggable="false"
//           style={{
//             width: "100%",
//             height: "100%",
//             boxSizing: "border-box",
//           }}
//           src={drawingData[index + 1]}
//           className="drawing-overlay"
//           alt=""
//         />
//         <div className="drawing-actions">
//           <IconButton
//             size="xs"
//             aria-label="Copy"
//             icon={<CopyIcon />}
//             textColor={"blue"}
//             onClick={handleCopyButtonClick}
//             marginRight="2"
//           />
//           <IconButton
//             size="xs"
//             aria-label="Delete"
//             textColor="red"
//             icon={<DeleteIcon />}
//             onClick={() => handleDeleteDrawing(index)}
//           />
//         </div>
//       </Rnd>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Copy Options</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <div>
//               <input
//                 type="radio"
//                 id="all"
//                 name="copyTo"
//                 value="all"
//                 checked={copyOptions.copyTo === "all"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "all" })}
//               />
//               <label htmlFor="first">All Pages</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="first"
//                 name="copyTo"
//                 value="first"
//                 checked={copyOptions.copyTo === "first"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "first" })}
//               />
//               <label htmlFor="first">First Page</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="last"
//                 name="copyTo"
//                 value="last"
//                 checked={copyOptions.copyTo === "last"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "last" })}
//               />
//               <label htmlFor="last">Last Page</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="custom"
//                 name="copyTo"
//                 value="custom"
//                 checked={copyOptions.copyTo === "custom"}
//                 onChange={() => setCopyOptions({ ...copyOptions, copyTo: "custom" })}
//               />
//               <label htmlFor="custom">Custom Page</label>
//               {copyOptions.copyTo === "custom" && (
//                 <Select
//                   value={copyOptions.customPage}
//                   onChange={(e) => setCopyOptions({ ...copyOptions, customPage: parseInt(e.target.value) })}
//                 >
//                   {pageOptions.map((page) => (
//                     <option key={page} value={page}>
//                       Page {page}
//                     </option>
//                   ))}
//                 </Select>
//               )}
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleCopyConfirm}>
//               Copy
//             </Button>
//             <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default DrawingOverlay;


//trying the size
import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Select } from "@chakra-ui/react";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import './drawingOverlay.css';
import { getDimensionsBasedOnScreenSize } from '../main/pdfUtils';

const DrawingOverlay = ({
  index,
  positions,
  setpositions,
  signatureSize,
  setSignatureSize,
  drawingData,
  handleDrawingPadResize,
  handleDrawingPadDragStop,
  setDrawingData,
  numPages,
  currentPage
}) => {
  const dimensions = getDimensionsBasedOnScreenSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyOptions, setCopyOptions] = useState({
    copyTo: "current", // Default option
    customPage: 1, // Default custom page number
  });
  const handleDeleteDrawing = (pageIndex) => {
    const updatedDrawingData = { ...drawingData };
    delete updatedDrawingData[pageIndex + 1];
    setDrawingData(updatedDrawingData);
  };

  const handleCopyButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCopyConfirm = () => {
    const { copyTo, customPage } = copyOptions;
    const currentDrawing = drawingData[currentPage];
    const updatedDrawingData = { ...drawingData };
    const updatedPositions = [...positions];
    const updatedSizes = [...signatureSize];

    if (copyTo === "first" || copyTo === "last" || (copyTo === "custom" && customPage >= 1 && customPage <= numPages)) {
      const copiedPageIndex = copyTo === "custom" ? customPage : copyTo === "first" ? 1 : numPages;
      updatedDrawingData[copiedPageIndex] = currentDrawing;
      updatedPositions[copiedPageIndex - 1] = { ...positions[currentPage - 1] };
      updatedSizes[copiedPageIndex - 1] = { ...signatureSize[currentPage - 1] };
    } else if (copyTo === "all") {
      for (let page = 1; page <= numPages; page++) {
        updatedDrawingData[page] = currentDrawing;
        updatedPositions[page - 1] = { ...positions[currentPage - 1] };
        updatedSizes[page - 1] = { ...signatureSize[currentPage - 1] };
      }
    }

    setDrawingData(updatedDrawingData);
    setpositions(updatedPositions);
    setSignatureSize(updatedSizes);
    setIsModalOpen(false);
  };

  const pageOptions = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <>
      <Rnd
        size={{
          width: signatureSize[index].width,
          height: signatureSize[index].height,
        }}
        position={{
          x: positions[index].x,
          y: positions[index].y,
        }}
        bounds="parent"
        enableResizing={{
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
        className="drawing-overlay"
        style={{
          width: signatureSize[index].width,
          height: signatureSize[index].height,
          position: "absolute",
          zIndex: "1",
          border: "1px dashed rgb(79, 78, 78)",
          boxSizing: "border-box",
          objectFit: "fill",
        }}
        minWidth={dimensions.minWidth}
        minHeight={dimensions.minHeight}
        maxWidth={dimensions.maxWidth}
        maxHeight={dimensions.maxHeight}
        onResize={(e, direction, ref, delta, position) =>
          handleDrawingPadResize(e, direction, ref, delta, position, index)
        }
        onDragStop={(e, d) => {
          handleDrawingPadDragStop(e, d, index);
          const updatedPositions = [...positions];
          updatedPositions[index] = { x: d.x, y: d.y };
          setpositions(updatedPositions);
        }}
      >
        <img
          draggable="false"
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          src={drawingData[index + 1]}
          className="drawing-overlay"
          alt=""
        />
        <div className="drawing-actions">
          <IconButton
            size="xs"
            aria-label="Copy"
            icon={<CopyIcon />}
            textColor={"blue"}
            onClick={handleCopyButtonClick}
            marginRight="2"
          />
          <IconButton
            size="xs"
            aria-label="Delete"
            textColor="red"
            icon={<DeleteIcon />}
            onClick={() => handleDeleteDrawing(index)}
          />
        </div>
      </Rnd>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Copy Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <input
                type="radio"
                id="all"
                name="copyTo"
                value="all"
                checked={copyOptions.copyTo === "all"}
                onChange={() => setCopyOptions({ ...copyOptions, copyTo: "all" })}
              />
              <label htmlFor="first">All Pages</label>
            </div>
            <div>
              <input
                type="radio"
                id="first"
                name="copyTo"
                value="first"
                checked={copyOptions.copyTo === "first"}
                onChange={() => setCopyOptions({ ...copyOptions, copyTo: "first" })}
              />
              <label htmlFor="first">First Page</label>
            </div>
            <div>
              <input
                type="radio"
                id="last"
                name="copyTo"
                value="last"
                checked={copyOptions.copyTo === "last"}
                onChange={() => setCopyOptions({ ...copyOptions, copyTo: "last" })}
              />
              <label htmlFor="last">Last Page</label>
            </div>
            <div>
              <input
                type="radio"
                id="custom"
                name="copyTo"
                value="custom"
                checked={copyOptions.copyTo === "custom"}
                onChange={() => setCopyOptions({ ...copyOptions, copyTo: "custom" })}
              />
              <label htmlFor="custom">Custom Page</label>
              {copyOptions.copyTo === "custom" && (
                <Select
                  value={copyOptions.customPage}
                  onChange={(e) => setCopyOptions({ ...copyOptions, customPage: parseInt(e.target.value) })}
                >
                  {pageOptions.map((page) => (
                    <option key={page} value={page}>
                      Page {page}
                    </option>
                  ))}
                </Select>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCopyConfirm}>
              Copy
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DrawingOverlay;
