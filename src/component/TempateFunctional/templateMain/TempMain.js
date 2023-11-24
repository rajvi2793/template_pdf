// import React, { useState, useEffect ,useRef} from 'react';
// import {
//     useDisclosure,
//   } from "@chakra-ui/react";
// import {
//     Text,
//     Button,
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalBody,
//     Input,
//     Flex,
//     IconButton,
// } from "@chakra-ui/react";
// import { useLocation } from "react-router-dom";
// import { DeleteIcon } from "@chakra-ui/icons";
// import Toolbar from "../../SignpdfFunctional/toolbar/Toolbar";
// import Sidebar from "../../SignpdfFunctional/sidebar/Sidebar";
// import { AiFillSetting } from "react-icons/ai";
// import { ProgressBar } from  'react-loader-spinner';
// import { generateThumbnails,handleScroll ,handleThumbnailClick} from "../../SignpdfFunctional/main/pdfUtils";
// import TempSidebar from '../templateSidebar/TempSidebar';

// function TempMain() {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const btnRef = React.useRef();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [recipients, setRecipients] = useState([{ name: "", email: "" }]); // Initial recipient
//   const [isCreating, setIsCreating] = useState(false); // Track if the user is in the process of creating
//   const location = useLocation();
//   const tempFile = location.state?.tempFile;
//   const [numPages, setNumPages] = useState(0);
// const [currentPage, setCurrentPage] = useState(1);
// const [thumbnails, setThumbnails] = useState([]);
// const [mainContentUrls, setMainContentUrls] = useState([]);
// const pdfImageSize = { width: 0, height: 0 };
// const [isLoading, setIsLoading] = useState(true);
// const mainContainerRef = useRef(null);
//   const thumbnailContainerRef = useRef(null);
//   const [recipientInitials, setRecipientInitials] = useState([]); // Store initials and colors

//   const [positions, setpositions] = useState(
//     Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
//   );

//   useEffect(() => {
//     // Open the modal when the component is mounted
//     setIsModalOpen(true);
//     if (tempFile) {
//         generateThumbnails(tempFile).then(({ thumbnailUrls, contentUrls }) => {
//           setNumPages(thumbnailUrls.length);
//           setThumbnails(thumbnailUrls);
//           setMainContentUrls(contentUrls);
//           setIsLoading(false);
//         }).catch((error) => {
//           console.error("Error generating thumbnails:", error);
//         });
//       }
//   }, [tempFile]);
//   const handleContainerScroll = (event) => {
//     handleScroll(event, numPages, positions, pdfImageSize, thumbnailContainerRef, setCurrentPage, setpositions);
//   };

//   const addRecipient = () => {
//     setRecipients([...recipients, { name: "", email: "" }]);
//   };

//   const deleteRecipient = (index) => {
//     const updatedRecipients = [...recipients];
//     updatedRecipients.splice(index, 1);
//     setRecipients(updatedRecipients);
//   };

//   const handleRecipientChange = (index, field, value) => {
//     const updatedRecipients = [...recipients];
//     updatedRecipients[index][field] = value;
//     setRecipients(updatedRecipients);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const isEmailValid = (email) => {
//     // Use a regular expression to check for a valid email format
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     return emailRegex.test(email);
//   };

//   const isCreateButtonDisabled = () => {
//     return !recipients.some((recipient) => recipient.name && isEmailValid(recipient.email));
//   };

//   const handleCreate = () => {
//     if (isCreateButtonDisabled()) {
//       return; // Don't proceed if no recipient has all fields filled
//     }

//     const initials = recipients.map((recipient, index) => ({
//       initial: recipient.name.charAt(0),
//       color: generatePastelColor(index),
//       name: recipient.name
//     }));
//     setRecipientInitials(initials);

//     // Perform your create action here
//     // For example, save the recipients' data
//     // Once done, close the modal
//     setIsCreating(true);

//     setTimeout(() => {
//       setIsCreating(false);
//       setIsModalOpen(false);
//     }, 800); // Replace with your actual create action
//   };

//   function generatePastelColor(index) {
//     const hue = (index * 137.5) % 360; // Vary the hue to get different colors
//     const saturation = 75; // Adjust as needed
//     const lightness = 80; // Adjust as needed
//     return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//   }

//   return (
//     <>
//         {tempFile  && (
//         <div className="main-container">
//           <div className="inner-container-main">
//             <div className="inner-container-main-toolbar">
//             <Toolbar numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} mainContainerRef={mainContainerRef}/>
//             </div>
//             <div className="inner_container_main_body">
//               <div className="inner-container-main-body-sider">
//                 <Sidebar
//                   thumbnails={thumbnails}
//                   currentPage={currentPage}
//                   handleThumbnailClick={(pageNumber) => handleThumbnailClick(pageNumber, mainContainerRef, setCurrentPage,numPages)}
//                       />
//               </div>

//               <div className="inner-container-main-body-content">

//                 <div className="pdf-viewer">
//                   <div className="mypdfCenter">

//                     <div
//                       className="scrollable-container "
//                       ref={mainContainerRef}
//                       onScroll={handleContainerScroll}
//                     >
//                        {isLoading && (
//                   <div className="loading-container">
//                     <ProgressBar
//                       height={60}
//                       width={80}
//                       ariaLabel="progress-bar-loading"
//                       wrapperStyle={{}}
//                       wrapperClass="progress-bar-wrapper"
//                       borderColor="#053b50"
//                       barColor="#026179"
//                     />
//                   </div>
//                 )}
//                       {!isLoading && Array.from({ length: numPages }, (_, index) => (
//                         <div className="page " key={index}>
//                           <div className="pdf-page-container ">
//                             <img
//                               src={mainContentUrls[index]}
//                               alt={`Page ${index + 1}`}
//                               className="tmpid"
//                               draggable="false"    />
//                             {/* {drawingData[index + 1] && (
//                                   <DrawingOverlay
//                                   index={index}
//                                   positions={positions}
//                                   setpositions={setpositions}
//                                   setSignatureSize={setSignatureSize}
//                                   signatureSize={signatureSize}
//                                   drawingData={drawingData}
//                                   handleDrawingPadResize={handleDrawingPadResize}
//                                   handleDrawingPadDragStop={handleDrawingPadDragStop}
//                                   setDrawingData={setDrawingData}
//                                   numPages={numPages}
//                                   currentPage={currentPage}
//                                 />
//                                  )} */}
//                           </div>
//                         </div>   ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="setting">
//                   <AiFillSetting color="#053b50" className="setting-icon" onClick={onOpen} />
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/*----------------------Functional SideBar------------------*/}
//             <TempSidebar
//              isOpen={isOpen}
//              onClose={onClose}
//              btnRef={btnRef}
//              recipientInitials={recipientInitials}
//             />
//         </div>
//       )}

//     {/* modal */}
//     <div>
//       <Modal size="xl" isOpen={isModalOpen}  isCentered={false}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Create Template</ModalHeader>
//           <ModalBody>
//             {tempFile && (
//               <div>
//                 <Text><b>Selected PDF File:</b> {tempFile.name}</Text>
//               </div>
//             )}

//             {recipients.map((recipient, index) => (
//               <Flex key={index} alignItems="center">
//                  <div
//                 style={{
//                     width: "110px",
//                     height: "35px",
//                     borderRadius: "50%",
//                     backgroundColor: generatePastelColor(index),
//                     border:"1px solid grey"
//                 }}
//                 ></div>
//                 <Input
//                   type="text"
//                   placeholder="Recipient's Name"
//                   value={recipient.name}
//                   onChange={(e) =>
//                     handleRecipientChange(index, "name", e.target.value)
//                   }
//                 />
//                 <Input
//                   type="email"
//                   placeholder="Recipient's Email"
//                   value={recipient.email}
//                   onChange={(e) =>
//                     handleRecipientChange(index, "email", e.target.value)
//                   }
//                 />
//                 <IconButton
//                   icon={<DeleteIcon />}
//                   colorScheme="red"
//                   aria-label="Delete"
//                   size="sm"
//                   onClick={() => deleteRecipient(index)}
//                 />
//               </Flex>
//             ))}
//             <Button colorScheme="teal" variant="solid" onClick={addRecipient}>
//               Add Recipient
//             </Button>
//           </ModalBody>
//           <Button
//             colorScheme="teal"
//             variant="solid"
//             onClick={handleCreate}
//             isDisabled={isCreateButtonDisabled()}
//           >
//             Create
//           </Button>
//         </ModalContent>
//       </Modal>
//     </div>
//     </>
//   );
// }

// export default TempMain;

// single recipient on single page :
// import React, { useState, useEffect, useRef } from "react";
// import { useDisclosure } from "@chakra-ui/react";
// import {
//   Text,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   Input,
//   Flex,
//   IconButton,
// } from "@chakra-ui/react";
// import { useLocation } from "react-router-dom";
// import { DeleteIcon } from "@chakra-ui/icons";
// import Toolbar from "../../SignpdfFunctional/toolbar/Toolbar";
// import Sidebar from "../../SignpdfFunctional/sidebar/Sidebar";
// import { AiFillSetting } from "react-icons/ai";
// import { ProgressBar } from "react-loader-spinner";
// import {
//   generateThumbnails,
//   handleScroll,
//   handleThumbnailClick,
// } from "../../SignpdfFunctional/main/pdfUtils";
// import TempSidebar from "../templateSidebar/TempSidebar";
// import { useDragDropContext } from "../DragDropContext";
// import { Rnd } from "react-rnd";
// function TempMain() {
//   const { draggedRecipient, handleDropRecipient } = useDragDropContext();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const btnRef = React.useRef();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [recipients, setRecipients] = useState([{ name: "", email: "" }]); // Initial recipient
//   const [isCreating, setIsCreating] = useState(false); // Track if the user is in the process of creating
//   const location = useLocation();
//   const tempFile = location.state?.tempFile;
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [thumbnails, setThumbnails] = useState([]);
//   const [mainContentUrls, setMainContentUrls] = useState([]);
//   const pdfImageSize = { width: 0, height: 0 };
//   const [isLoading, setIsLoading] = useState(true);
//   const mainContainerRef = useRef(null);
//   const thumbnailContainerRef = useRef(null);
//   const [recipientInitials, setRecipientInitials] = useState([]);
//   const [recipientBoxSize, setRecipientBoxSize] = useState({ width: 180, height: 140 });
//   const [recipientPositions, setRecipientPositions] = useState(
//     Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
//   );
//   const [positions, setPositions] = useState(
//     Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
//   );
//   useEffect(() => {
//     setIsModalOpen(true);
//     if (tempFile) {
//       generateThumbnails(tempFile)
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
//   }, [tempFile]);

//   const handleRecipientDrop = (recipient,  position, pageIndex) => {
//     console.log(draggedRecipient);
//     if (draggedRecipient) {
//       const x = Math.max(0, Math.min(position.x, pdfImageSize.width - 180));
//       const y = Math.max(0, Math.min(position.y, pdfImageSize.height - 140));

//       setRecipientPositions((prevPositions) => ({
//         ...prevPositions,
//         [draggedRecipient.name]: {
//           x,
//           y,
//           page: pageIndex + 1,
//         },
//       }));
//       handleDropRecipient();
//     }
//   };
//   const handleRecipientDrag = (recipientName, newPosition) => {
//     if (recipientName) {
//       setRecipientPositions((prevPositions) => ({
//         ...prevPositions,
//         [recipientName]: {
//           x: newPosition.x,
//           y: newPosition.y,
//           page: prevPositions[recipientName].page,
//         },
//       }));
//     }
//   };

//   const handleRecipientResize = (recipientName, newWidth, newHeight) => {
//     const index = recipients.findIndex((recipient) => recipient.name === recipientName);
//     if (index !== -1) {
//       const updatedRecipients = [...recipients];
//       updatedRecipients[index].width = newWidth;
//       updatedRecipients[index].height = newHeight;
//       setRecipientBoxSize({width: newWidth,height:newHeight});
//       setRecipients(updatedRecipients);
//     }
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

//   const addRecipient = () => {
//     setRecipients([...recipients, { name: "", email: "" }]);
//   };

//   const deleteRecipient = (index) => {
//     const updatedRecipients = [...recipients];
//     updatedRecipients.splice(index, 1);
//     setRecipients(updatedRecipients);
//   };

//   const handleRecipientChange = (index, field, value) => {
//     const updatedRecipients = [...recipients];
//     updatedRecipients[index][field] = value;
//     setRecipients(updatedRecipients);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const isEmailValid = (email) => {
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     return emailRegex.test(email);
//   };

//   const isCreateButtonDisabled = () => {
//     return !recipients.some(
//       (recipient) => recipient.name && isEmailValid(recipient.email)
//     );
//   };

//   const handleCreate = () => {
//     if (isCreateButtonDisabled()) {
//       return;
//     }

//     const initials = recipients.map((recipient, index) => ({
//       initial: recipient.name.charAt(0),
//       color: generatePastelColor(index),
//       name: recipient.name,
//     }));
//     setRecipientInitials(initials);

//     setIsCreating(true);

//     setTimeout(() => {
//       setIsCreating(false);
//       setIsModalOpen(false);
//     }, 800);
//   };

//   function generatePastelColor(index) {
//     const hue = (index * 137.5) % 360;
//     const saturation = 75;
//     const lightness = 80;
//     return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//   }

//   return (
//     <>
//       {tempFile && (
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
//                     handleThumbnailClick(
//                       pageNumber,
//                       mainContainerRef,
//                       setCurrentPage,
//                       numPages
//                     )
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
//                             <div
//                               className="pdf-page-container"
//                               onDrop={(e) => {
//                                 e.preventDefault();

//                                 handleRecipientDrop(recipients[index],   { x: e.clientX, y: e.clientY },   index  );
//                               }}

//                               onDragOver={(e) => e.preventDefault()}
//                             >
//                               {recipients.map((recipient, i) => {
//                                 const recipientPosition =
//                                   recipientPositions[recipient.name];
//                                 if (
//                                   recipient.name &&
//                                   recipientPosition &&
//                                   recipientPosition.page === index + 1
//                                 ) {
//                                   return (
//                                     <Rnd
//                                       bounds="parent"
//                                       // size={{ width: 180, height: 140 }}
//                                       // size={{ width: 180, height: 140 }} // Set the width and height
//                                       size={{width : recipientBoxSize.width,height : recipientBoxSize.height}}
//                                       position={{
//                                         x: recipientPosition.x,
//                                         y: recipientPosition.y,
//                                       }}
//                                       enableResizing={{
//                                         topRight: true,
//                                         bottomRight: true,
//                                         bottomLeft: true,
//                                         topLeft: true,
//                                       }}
//                                       onDragStop={(e, d) => {
//                                         handleRecipientDrag(recipient.name, d);
//                                       }}
//                                       onResizeStop={(
//                                         e,
//                                         direction,
//                                         ref,
//                                         delta,
//                                         position
//                                       ) => {
//                                         handleRecipientResize(
//                                           recipient.name,
//                                           ref.style.width,
//                                           ref.style.height
//                                         );
//                                       }}
//                                     >
//                                       <div
//                                         className="recipientBox"
//                                         style={{
//                                           backgroundColor:
//                                             generatePastelColor(i),
//                                           fontSize: "18px",
//                                           fontWeight: "bolder",
//                                           display: "flex",
//                                           alignItems: "center",
//                                           justifyContent: "center",
//                                           width: "100%",
//                                           height: "100%",
//                                           boxSizing: "border-box",
//                                           opacity: "0.9",
//                                         }}
//                                       >
//                                         {recipient.name}
//                                       </div>
//                                     </Rnd>
//                                   );
//                                 }
//                                 return null;
//                               })}

//                               <img
//                                 src={mainContentUrls[index]}
//                                 alt={`Page ${index + 1}`}
//                                 className="tmpid"
//                                 draggable="false"
//                               />
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
//           <TempSidebar
//             isOpen={isOpen}
//             onClose={onClose}
//             btnRef={btnRef}
//             recipientInitials={recipientInitials}
//           />
//         </div>
//       )}

//       <div>
//         <Modal size="xl" isOpen={isModalOpen} isCentered={false}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Create Template</ModalHeader>
//             <ModalBody>
//               {tempFile && (
//                 <div>
//                   <Text>
//                     <b>Selected PDF File:</b> {tempFile.name}
//                   </Text>
//                 </div>
//               )}

//               {recipients.map((recipient, index) => (
//                 <Flex key={index} alignItems="center">
//                   <div
//                     style={{
//                       width: "110px",
//                       height: "35px",
//                       borderRadius: "50%",
//                       backgroundColor: generatePastelColor(index),
//                       border: "1px solid grey",
//                     }}
//                   ></div>
//                   <Input
//                     type="text"
//                     placeholder="Recipient's Name"
//                     value={recipient.name}
//                     onChange={(e) =>
//                       handleRecipientChange(index, "name", e.target.value)
//                     }
//                   />
//                   <Input
//                     type="email"
//                     placeholder="Recipient's Email"
//                     value={recipient.email}
//                     onChange={(e) =>
//                       handleRecipientChange(index, "email", e.target.value)
//                     }
//                   />
//                   <IconButton
//                     icon={<DeleteIcon />}
//                     colorScheme="red"
//                     aria-label="Delete"
//                     size="sm"
//                     onClick={() => deleteRecipient(index)}
//                   />
//                 </Flex>
//               ))}
//               <Button colorScheme="teal" variant="solid" onClick={addRecipient}>
//                 Add Recipient
//               </Button>
//             </ModalBody>
//             <Button
//               colorScheme="teal"
//               variant="solid"
//               onClick={handleCreate}
//               isDisabled={isCreateButtonDisabled()}
//             >
//               Create
//             </Button>
//           </ModalContent>
//         </Modal>
//       </div>
//     </>
//   );
// }

// export default TempMain;

// trying multiple recipient box of same  name  on same pages
// import React, { useState, useEffect, useRef } from "react";
// import { useDisclosure } from "@chakra-ui/react";
// import {
//   Text,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   Input,
//   Flex,
//   IconButton,
// } from "@chakra-ui/react";
// import { useLocation } from "react-router-dom";
// import { DeleteIcon } from "@chakra-ui/icons";
// import Toolbar from "../../SignpdfFunctional/toolbar/Toolbar";
// import Sidebar from "../../SignpdfFunctional/sidebar/Sidebar";
// import { AiFillSetting } from "react-icons/ai";
// import { ProgressBar } from "react-loader-spinner";
// import {
//   generateThumbnails,
//   handleScroll,
//   handleThumbnailClick,
// } from "../../SignpdfFunctional/main/pdfUtils";
// import TempSidebar from "../templateSidebar/TempSidebar";
// import { useDragDropContext } from "../DragDropContext";
// import { Rnd } from "react-rnd";

// function TempMain() {
//   const { draggedRecipient, handleDropRecipient } = useDragDropContext();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const btnRef = React.useRef();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [recipients, setRecipients] = useState([{ name: "", email: "" }]);
//   const [isCreating, setIsCreating] = useState(false);
//   const location = useLocation();
//   const tempFile = location.state?.tempFile;
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [thumbnails, setThumbnails] = useState([]);
//   const [mainContentUrls, setMainContentUrls] = useState([]);
//   const pdfImageSize = { width: 0, height: 0 };
//   const [isLoading, setIsLoading] = useState(true);
//   const mainContainerRef = useRef(null);
//   const thumbnailContainerRef = useRef(null);
//   const [recipientInitials, setRecipientInitials] = useState([]);
//   const [recipientBoxSize, setRecipientBoxSize] = useState({ width: 180, height: 140 });
//   const [recipientPositions, setRecipientPositions] = useState(
//     Array.from({ length: numPages }, () => ({})) // Initialize an array for recipient positions on each page
//   );
//   const [positions, setPositions] = useState(
//     Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
//   );

//   useEffect(() => {
//     setIsModalOpen(true);
//     if (tempFile) {
//       generateThumbnails(tempFile)
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
//   }, [tempFile]);
//   const handleRecipientChange = (index, field, value) => {
//         const updatedRecipients = [...recipients];
//         updatedRecipients[index][field] = value;
//         setRecipients(updatedRecipients);
//       };

//       // const handleRecipientDrop = (recipient, position, pageIndex) => {
//       //   if (draggedRecipient) {
//       //     const x = Math.max(0, Math.min(position.x, pdfImageSize.width - 180));
//       //     const y = Math.max(0, Math.min(position.y, pdfImageSize.height - 140));
      
//       //     // Update recipient positions on the current page
//       //     const updatedRecipientPositions = [...recipientPositions];
//       //     if (!updatedRecipientPositions[pageIndex]) {
//       //       updatedRecipientPositions[pageIndex] = {};
//       //     }
//       //     const recipientPosition = updatedRecipientPositions[pageIndex];
//       //     if (!recipientPosition[draggedRecipient.name]) {
//       //       recipientPosition[draggedRecipient.name] = [];
//       //     }
//       //     recipientPosition[draggedRecipient.name].push({ x, y });
      
//       //     setRecipientPositions(updatedRecipientPositions);
//       //     handleDropRecipient();
//       //   }
//       // };
//       const [tempSidebarRecipients, setTempSidebarRecipients] = useState([]); // Store recipients dragged from TempSidebar

//       function generateUniqueId() {
//         return Math.random().toString(36).substring(2) + Date.now().toString(36);
//       }
      
//       // const handleRecipientDrop = (recipient, position, pageIndex) => {
//       //   if (draggedRecipient) {
//       //     const x = Math.max(0, Math.min(position.x, pdfImageSize.width - 180));
//       //     const y = Math.max(0, Math.min(position.y, pdfImageSize.height - 140));
      
//       //     // Create a copy of the existing tempSidebarRecipients array
//       //     const updatedTempSidebarRecipients = [...tempSidebarRecipients];
      
//       //     // Find the recipient in the array based on a unique combination of name and an id
//       //     const existingRecipient = updatedTempSidebarRecipients.find(
//       //       (item) => item.id === draggedRecipient.id
//       //     );
//       //     console.log(x);
      
//       //     if (existingRecipient) {
//       //       // If the recipient already exists, add the position to their positions array
//       //       existingRecipient.positions.push({ x, y });
//       //     } else {
//       //       // If it's a new recipient, create a new entry with a unique identifier and positions
//       //       updatedTempSidebarRecipients.push({
//       //         name: draggedRecipient.name,
//       //         id: generateUniqueId(), // Use a function to generate a unique identifier
//       //         positions: [{ x, y }],
//       //       });
//       //     }
      
//       //     // Update tempSidebarRecipients with the updated array
//       //     setTempSidebarRecipients(updatedTempSidebarRecipients);
//       //     handleDropRecipient();
//       //     console.log(updatedTempSidebarRecipients);
//       //   }
//       // };
      

//       // const handleRecipientDrop = (recipient, position, pageIndex) => {
//       //   if (draggedRecipient) {
//       //     const x = Math.max(0, Math.min(position.x, pdfImageSize.width - 180));
//       //     const y = Math.max(0, Math.min(position.y, pdfImageSize.height - 140));
          
//       //     const updatedTempSidebarRecipients = [...tempSidebarRecipients];
//       //   updatedTempSidebarRecipients.push({ name: draggedRecipient.name, positions: [{ x, y }] });
//       //   setTempSidebarRecipients(updatedTempSidebarRecipients);
    
//       //     console.log(updatedTempSidebarRecipients);
//       //   }
//       // };
      
//       const handleRecipientDrop = (recipient, position, pageIndex) => {
//         if (draggedRecipient) {
//           const x = Math.max(0, Math.min(position.x, pdfImageSize.width - recipientBoxSize.width));
//           const y = Math.max(0, Math.min(position.y, pdfImageSize.height - recipientBoxSize.height));
      
//           // Create a copy of the existing tempSidebarRecipients array
//           const updatedTempSidebarRecipients = [...tempSidebarRecipients];
      
//           // Find the recipient in the array based on a unique combination of name and an id
//           const existingRecipient = updatedTempSidebarRecipients.find(
//             (item) => item.id === draggedRecipient.id
//           );
      
//           if (existingRecipient) {
//             // If the recipient already exists, add the position to their positions array
//             existingRecipient.positions.push({ x, y });
//           } else {
//             // If it's a new recipient, create a new entry with a unique identifier and positions
//             updatedTempSidebarRecipients.push({
//               name: draggedRecipient.name,
//               id: generateUniqueId(),
//               positions: [{ x, y }],
//             });
//           }
      
//           // Update tempSidebarRecipients with the updated array
//           setTempSidebarRecipients(updatedTempSidebarRecipients);
//           handleDropRecipient();
//         }
//       };
      

//       const handleRecipientDrag = (recipientId, newPosition, pageIndex) => {
//         if (recipientId) {
//           const updatedTempSidebarRecipients = [...tempSidebarRecipients];
//           const recipientIndex = updatedTempSidebarRecipients.findIndex(item => item.id === recipientId);
//           if (recipientIndex !== -1) {
//             updatedTempSidebarRecipients[recipientIndex].positions[pageIndex] = newPosition;
//             setTempSidebarRecipients(updatedTempSidebarRecipients);
//           }
//         }
//       };
//       // const handleRecipientDrag = (recipientId, newPosition, pageIndex) => {
//       //   if (recipientId) {
//       //     const updatedRecipientPositions = [...recipientPositions];
//       //     const recipientPosition = updatedRecipientPositions[pageIndex];
          
//       //     if (recipientPosition[recipientId]) {
//       //       recipientPosition[recipientId][pageIndex] = newPosition; 
//       //       // recipientPosition[recipientName][pageIndex].push(newPosition); 
//       //     }

//       //     setRecipientPositions(updatedRecipientPositions);
//       //   }
//       // };

//   const handleRecipientResize = (recipientId, newWidth, newHeight) => {
//     const index = tempSidebarRecipients.findIndex((recipient) => recipient.id === recipientId);
//     if (index !== -1) {
//       const updatedRecipients = [...tempSidebarRecipients];
//       updatedRecipients[index].width = newWidth;
//       updatedRecipients[index].height = newHeight;
//       setRecipientBoxSize({ width: newWidth, height: newHeight });
//       setRecipients(updatedRecipients);
//     }
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

//   const addRecipient = () => {
//     setRecipients([...recipients, { name: "", email: "" }]);
//   };

//   const deleteRecipient = (index) => {
//     const updatedRecipients = [...recipients];
//     updatedRecipients.splice(index, 1);
//     setRecipients(updatedRecipients);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const isEmailValid = (email) => {
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     return emailRegex.test(email);
//   };

//   const isCreateButtonDisabled = () => {
//     return !recipients.some(
//       (recipient) => recipient.name && isEmailValid(recipient.email)
//     );
//   };

//   const handleCreate = () => {
//     if (isCreateButtonDisabled()) {
//       return;
//     }

//     const initials = recipients.map((recipient, index) => ({
//       initial: recipient.name.charAt(0),
//       color: generatePastelColor(index),
//       name: recipient.name,
//     }));
//     setRecipientInitials(initials);

//     setIsCreating(true);

//     setTimeout(() => {
//       setIsCreating(false);
//       setIsModalOpen(false);
//     }, 800);
//   };

//   function generatePastelColor(index) {
//     const hue = (index * 137.5) % 360;
//     const saturation = 75;
//     const lightness = 80;
//     return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//   }

//   return (
//     <>
//       {tempFile && (
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
//                     handleThumbnailClick(
//                       pageNumber,
//                       mainContainerRef,
//                       setCurrentPage,
//                       numPages
//                     )
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
//                             <div
//                               className="pdf-page-container"
//                               onDrop={(e) => {
//                                 e.preventDefault();
//                                 const pageIndex = index;
//                                 handleRecipientDrop(
//                                   // recipients[index]
//                                     tempSidebarRecipients[index],
//                                   { x: e.clientX, y: e.clientY },
//                                   pageIndex
//                                 );
//                               }}
//                               onDragOver={(e) => e.preventDefault()}
//                             >
//                               {tempSidebarRecipients.map((recipient, i) => {
//                               // {/* {recipients.map((recipient, i) => { */}
//                               console.log(recipient.positions);
//                                 // const recipientPosition =
//                                 //   recipientPositions[index] &&
//                                 //   recipientPositions[index][recipient.id];
//                                 const recipientPosition =recipient.positions;
//                                 if (
//                                   recipient.id &&
//                                   recipientPosition &&
//                                   recipientPosition.length > 0
//                                 ) {
//                                   return recipientPosition.map((position, j) => (
                                    
//                                     <Rnd
//                                       key={`${i}_${j}`}
//                                       bounds="parent"
//                                       size={recipientBoxSize}
//                                       position={{
//                                         x: position.x,
//                                         y: position.y,
//                                       }}
//                                       enableResizing={{
//                                         topRight: true,
//                                         bottomRight: true,
//                                         bottomLeft: true,
//                                         topLeft: true,
//                                       }}
//                                       onDragStop={(e, d) => {
//                                         // handleRecipientDrag(recipient.name, d, index);
//                                         handleRecipientDrag(recipient.id, d, index);
//                                       }}
//                                       onResizeStop={(
//                                         e,
//                                         direction,
//                                         ref,
//                                         delta,
//                                         position
//                                       ) => {
//                                         handleRecipientResize(
//                                           recipient.id,
//                                           ref.style.width,
//                                           ref.style.height
//                                         );
//                                       }}
//                                     >
//                                       <div
//                                         className="recipientBox"
//                                         style={{
//                                           backgroundColor: generatePastelColor(i),
//                                           fontSize: "18px",
//                                           fontWeight: "bolder",
//                                           display: "flex",
//                                           alignItems: "center",
//                                           justifyContent: "center",
//                                           width: "100%",
//                                           height: "100%",
//                                           boxSizing: "border-box",
//                                           opacity: "0.9",
//                                         }}
//                                       >
//                                         {recipient.name}
//                                       </div>
//                                     </Rnd>
//                                   ));
//                                 }
//                                 return null;
//                               })}

//                               <img
//                                 src={mainContentUrls[index]}
//                                 alt={`Page ${index + 1}`}
//                                 className="tmpid"
//                                 draggable="false"
//                               />
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
//           <TempSidebar
//             isOpen={isOpen}
//             onClose={onClose}
//             btnRef={btnRef}
//             recipientInitials={recipientInitials}
//           />
//         </div>
//       )}

//       <div>
//         <Modal size="xl" isOpen={isModalOpen} isCentered={false}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Create Template</ModalHeader>
//             <ModalBody>
//               {tempFile && (
//                 <div>
//                   <Text>
//                     <b>Selected PDF File:</b> {tempFile.name}
//                   </Text>
//                 </div>
//               )}

//               {recipients.map((recipient, index) => (
//                 <Flex key={index} alignItems="center">
//                   <div
//                     style={{
//                       width: "110px",
//                       height: "35px",
//                       borderRadius: "50%",
//                       backgroundColor: generatePastelColor(index),
//                       border: "1px solid grey",
//                     }}
//                   ></div>
//                   <Input
//                     type="text"
//                     placeholder="Recipient's Name"
//                     value={recipient.name}
//                     onChange={(e) =>
//                       handleRecipientChange(index, "name", e.target.value)
//                     }
//                   />
//                   <Input
//                     type="email"
//                     placeholder="Recipient's Email"
//                     value={recipient.email}
//                     onChange={(e) =>
//                       handleRecipientChange(index, "email", e.target.value)
//                     }
//                   />
//                   <IconButton
//                     icon={<DeleteIcon />}
//                     colorScheme="red"
//                     aria-label="Delete"
//                     size="sm"
//                     onClick={() => deleteRecipient(index)}
//                   />
//                 </Flex>
//               ))}
//               <Button colorScheme="teal" variant="solid" onClick={addRecipient}>
//                 Add Recipient
//               </Button>
//             </ModalBody>
//             <Button
//               colorScheme="teal"
//               variant="solid"
//               onClick={handleCreate}
//               isDisabled={isCreateButtonDisabled()}
//             >
//               Create
//             </Button>
//           </ModalContent>
//         </Modal>
//       </div>
//     </>
//   );
// }

// export default TempMain;

import React, { useState, useEffect, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import Toolbar from "../../SignpdfFunctional/toolbar/Toolbar";
import Sidebar from "../../SignpdfFunctional/sidebar/Sidebar";
import { AiFillSetting } from "react-icons/ai";
import { ProgressBar } from "react-loader-spinner";
import {
  generateThumbnails,
  handleScroll,
  handleThumbnailClick,
} from "../../SignpdfFunctional/main/pdfUtils";
import TempSidebar from "../templateSidebar/TempSidebar";
import { useDragDropContext } from "../DragDropContext";
import { Rnd } from "react-rnd";
import { getDimensionsBasedOnScreenSize } from '../../SignpdfFunctional/main/pdfUtils';

function TempMain() {
  const dimensions = getDimensionsBasedOnScreenSize();
  const { draggedRecipient, handleDropRecipient } = useDragDropContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipients, setRecipients] = useState([{ name: "", email: "" }]);
  const [isCreating, setIsCreating] = useState(false);
  const location = useLocation();
  const tempFile = location.state?.tempFile;
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [thumbnails, setThumbnails] = useState([]);
  const [mainContentUrls, setMainContentUrls] = useState([]);
  const pdfImageSize = { width: 0, height: 0 };
  const [isLoading, setIsLoading] = useState(true);
  const mainContainerRef = useRef(null);
  const thumbnailContainerRef = useRef(null);
  const [recipientInitials, setRecipientInitials] = useState([]);
  const [recipientBoxSize, setRecipientBoxSize] = useState({ width: 180, height: 140 });
  const [recipientPositions, setRecipientPositions] = useState(
    Array.from({ length: numPages }, () => ({})) // Initialize an array for recipient positions on each page
  );
  const [positions, setPositions] = useState(
    Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
  );

  const [templateName, setTemplateName] = useState("");

  useEffect(() => {
    setIsModalOpen(true);
    if (tempFile) {
      generateThumbnails(tempFile)
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
  }, [tempFile]);
  const handleRecipientChange = (index, field, value) => {
        const updatedRecipients = [...recipients];
        updatedRecipients[index][field] = value;
        setRecipients(updatedRecipients);
      };

      const [tempSidebarRecipients, setTempSidebarRecipients] = useState([]); // Store recipients dragged from TempSidebar

      function generateUniqueId() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
      }

      const handleRecipientDrop = (recipientId, position, pageIndex) => {
    if (draggedRecipient) {
      const x = Math.max(0, Math.min(position.x, pdfImageSize.width - recipientBoxSize.width));
      const y = Math.max(0, Math.min(position.y, pdfImageSize.height - recipientBoxSize.height));
      
      const updatedTempSidebarRecipients = [...tempSidebarRecipients];

      const existingRecipient = updatedTempSidebarRecipients.find(
        (item) => item.id === draggedRecipient.id
      );

      if (existingRecipient) {
        if (!existingRecipient.pagePositions[pageIndex]) {
          existingRecipient.pagePositions[pageIndex] = [];
        }
        existingRecipient.pagePositions[pageIndex].push({ x, y });
      } else {
        const newRecipient = {
          email:draggedRecipient.email,
          name: draggedRecipient.name,
          id: generateUniqueId(),
          pagePositions: { [pageIndex]: [{ x, y }] },
          size: { width: recipientBoxSize.width, height: recipientBoxSize.height },
        };
        updatedTempSidebarRecipients.push(newRecipient);
      }

      setTempSidebarRecipients(updatedTempSidebarRecipients);
      handleDropRecipient();
    }
  };

      const handleRecipientDrag = (recipientId, newPosition, pageIndex) => {
        if (recipientId) {
          const updatedTempSidebarRecipients = [...tempSidebarRecipients];
          const recipientIndex = updatedTempSidebarRecipients.findIndex(item => item.id === recipientId);
          if (recipientIndex !== -1) {
            updatedTempSidebarRecipients[recipientIndex].pagePositions[pageIndex].forEach(position => {
              position.x = newPosition.x;
              position.y = newPosition.y;
            });
            setTempSidebarRecipients(updatedTempSidebarRecipients);
          }
        }
      };
      
      const handleRecipientResize = (recipientId, newWidth, newHeight, position, pageIndex) => {
        if(recipientId){
          const updatedTempSidebarRecipients = [...tempSidebarRecipients];
        const recipientIndex = updatedTempSidebarRecipients.findIndex(item => item.id === recipientId);
          if (recipientIndex !== -1) {
            updatedTempSidebarRecipients[recipientIndex].size.width = newWidth;
            updatedTempSidebarRecipients[recipientIndex].size.height = newHeight;
            updatedTempSidebarRecipients[recipientIndex].pagePositions[pageIndex].forEach(pos => {
              pos.x = position.x;
              pos.y = position.y;
            });
            setTempSidebarRecipients(updatedTempSidebarRecipients);
          }
        }
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

  const addRecipient = () => {
    setRecipients([...recipients, { name: "", email: "" }]);
  };

  const deleteRecipient = (index) => {
    const updatedRecipients = [...recipients];
    updatedRecipients.splice(index, 1);
    setRecipients(updatedRecipients);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isCreateButtonDisabled = () => {
    return !recipients.some(
      (recipient) => recipient.name && isEmailValid(recipient.email)
    );
  };

  const handleCreate = () => {
    if (isCreateButtonDisabled()) {
      return;
    }

    const initials = recipients.map((recipient, index) => {
      return {
        initial: recipient.name.charAt(0),
        name: recipient.name,
        email:recipient.email,
      }
    });

    setRecipientInitials(initials);
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      setIsModalOpen(false);
    }, 800);
  };

  return (
    <>
      {tempFile && (
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
                            <div
                  className="pdf-page-container"
                  onDrop={(e) => {
                    e.preventDefault();
                    const pageIndex = index;
                    handleRecipientDrop(
                      tempSidebarRecipients[index],
                      { x: e.clientX, y: e.clientY },
                      pageIndex
                    );
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                              {tempSidebarRecipients.map((recipient, i) => {
                                const pagePositions = recipient.pagePositions[index];
                                if (
                                  recipient.id &&
                      pagePositions &&
                      pagePositions.length > 0
                                ) {
                                  return pagePositions.map((position, j) => (
                                    
                                    <Rnd
                                      key={`${i}_${j}`}
                                      bounds="parent"
                                      // size={recipientBoxSize}
                                      size={recipient.size}
                                      position={{
                                        x: position.x,
                                        y: position.y,
                                      }}
                                      minWidth={dimensions.minWidth}
        minHeight={dimensions.minHeight}
        maxWidth={dimensions.maxWidth}
        maxHeight={dimensions.maxHeight}
                                      enableResizing={{
                                        topRight: true,
                                        bottomRight: true,
                                        bottomLeft: true,
                                        topLeft: true,
                                      }}
                                      onDragStop={(e, d) => {
                                        handleRecipientDrag(recipient.id, d, index);
                                      }}
                                      onResizeStop={(
                                        e,
                                        direction,
                                        ref,
                                        delta,
                                        position
                                      ) => {
                                        handleRecipientResize(
                                          recipient.id,
                                          ref.style.width,
                                          ref.style.height,position,index
                                        );
                                      }}
                                    >
                                      <div
                                        className="recipientBox"
                                        style={{
                                          // backgroundColor: generateColorFromEmail(recipient.email),
                                          border: "5px ridge",
                                          fontSize: "18px",
                                          fontWeight: "bolder",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          width: "100%",
                                          height: "100%",
                                          boxSizing: "border-box",
                                          opacity: "0.9",
                                        }}
                                      >
                                        {recipient.name}
                                      </div>
                                    </Rnd>
                                  ));
                                }
                                return null;
                              })}

                              <img
                                src={mainContentUrls[index]}
                                alt={`Page ${index + 1}`}
                                className="tmpid"
                                draggable="false"
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="setting">
                  <AiFillSetting
                    color="#053b50"
                    className="setting-icon"
                    onClick={onOpen}
                  />
                </div>
              </div>
            </div>
          </div>
          <TempSidebar
            isOpen={isOpen}
            onClose={onClose}
            btnRef={btnRef}
            recipientInitials={recipientInitials}
            tempFile={tempFile}
            tempSidebarRecipients={tempSidebarRecipients}
            templateName={templateName}
          />
        </div>
      )}

      <div>
        <Modal size="xl" isOpen={isModalOpen} isCentered={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Template</ModalHeader>
            <ModalBody>
          
              {tempFile && (
                <div>
                  <Text>
                    <b>Selected PDF File:</b> {tempFile.name}
                  </Text>
                </div>
              )}

              <Input
                htmlSize={53}
                width='auto'
                placeholder="Enter Template Name"
                value={templateName}
                onChange={
                  (e) => {
                    setTemplateName(e.target.value);
                  }
                }
              />

              {recipients.map((recipient, index) => (
                <Flex key={index} alignItems="center">
               
                  <Input
                    type="text"
                    placeholder="Recipient's Name"
                    value={recipient.name}
                    onChange={(e) =>
                      handleRecipientChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    type="email"
                    placeholder="Recipient's Email"
                    value={recipient.email}
                    onChange={(e) =>
                      handleRecipientChange(index, "email", e.target.value)
                    }
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    aria-label="Delete"
                    size="sm"
                    onClick={() => deleteRecipient(index)}
                  />
                </Flex>
              ))}
              <Button colorScheme="teal" variant="solid" onClick={addRecipient}>
                Add Recipient
              </Button>
            </ModalBody>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={handleCreate}
              isDisabled={isCreateButtonDisabled()}
            >
              Create
            </Button>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default TempMain;
