// import React from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./drawingModalComponent.css";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
// } from "@chakra-ui/react";

// const DrawingModalComponent = ({
//   isDrawingModalOpen,
//   setIsDrawingModalOpen,
//   drawingBoardRef,
//   handleDrawingDone,
// }) => {
  // const handleClearDrawing = () => {
  //   if (drawingBoardRef.current) {
  //     drawingBoardRef.current.clear();
  //   }
  // };

//   return (
//     <Modal
//       key="xl"
//       isCentered
//       isOpen={isDrawingModalOpen}
//       onClose={() => setIsDrawingModalOpen(false)}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Drawing Pad</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
          // <div className="canvas-container">
          //   <SignatureCanvas
          //     ref={drawingBoardRef}
          //     penColor="black"
          //     canvasProps={{ className: "signature-canvas" }}
          //   />
          // </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="red" mr={3} onClick={handleClearDrawing}>
//             Clear
//           </Button>
//           <Button colorScheme="green" onClick={handleDrawingDone}>
//             Done
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default DrawingModalComponent;


// import React, { useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./drawingModalComponent.css";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Button
// } from "@chakra-ui/react";
// import { FaPencilAlt, FaTextHeight, FaImage } from "react-icons/fa";

// const DrawingModalComponent = ({
//   isDrawingModalOpen,
//   setIsDrawingModalOpen,
//   drawingBoardRef,
//   handleDrawingDone,
// }) => {
//   const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);

//   const handleDrawingPadClick = () => {
//     setShowDrawingCanvas(true);
//   };

//   const handleClearDrawing = () => {
//     if (drawingBoardRef.current) {
//       drawingBoardRef.current.clear();
//     }
//   };

//   return (
//     <Modal
//       key="xl"
//       isCentered
//       isOpen={isDrawingModalOpen}
//       onClose={() => {
//         setShowDrawingCanvas(false);
//         setIsDrawingModalOpen(false);
//       }}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Drawing Pad</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Tabs isFitted variant="enclosed">
//             <TabList>
//               <Tab>
//                 <FaTextHeight /> 
//               </Tab>
//               <Tab onClick={handleDrawingPadClick}>
//                 <FaPencilAlt /> 
//               </Tab>
//               <Tab>
//                 <FaImage /> 
//               </Tab>
//             </TabList>
//             <TabPanels>
//               <TabPanel>
//                 {/* Implement Add Text content here */}
//                 <div>Add Text Content</div>
//               </TabPanel>
//               <TabPanel>
//                 {showDrawingCanvas && (
//                   <div>
//                   <div className="canvas-container">
//                     <SignatureCanvas
//                       ref={drawingBoardRef}
//                       penColor="black"
//                       canvasProps={{ className: "signature-canvas" }}
//                     />
//                   </div>
//                   <Button colorScheme="red" onClick={handleClearDrawing}>Clear</Button>
//                   </div>
//                 )}
//               </TabPanel>
//               <TabPanel>
//                 {/* Implement Upload Image content here */}
//                 <div>Upload Image Content
                    
//                 </div>

//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="green" onClick={handleDrawingDone}>Done</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default DrawingModalComponent;


//tab panel is made
// import React, { useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./drawingModalComponent.css";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Button,
//   Input,
//   Box,
//   Text,
//   Center,
// } from "@chakra-ui/react";
// import { FaPencilAlt, FaTextHeight, FaImage } from "react-icons/fa";

// const DrawingModalComponent = ({
//   isDrawingModalOpen,
//   setIsDrawingModalOpen,
//   drawingBoardRef,
//   handleDrawingDone,
// }) => {
//   const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleDrawingPadClick = () => {
//     setShowDrawingCanvas(true);
//   };

//   const handleClearDrawing = () => {
//     if (drawingBoardRef.current) {
//       drawingBoardRef.current.clear();
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   return (
//     <Modal
//       key="xl"
//       isCentered
//       isOpen={isDrawingModalOpen}
//       onClose={() => {
//         setShowDrawingCanvas(false);
//         setIsDrawingModalOpen(false);
//       }}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Drawing Pad</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Tabs isFitted variant="enclosed">
//             <TabList>
//               <Tab>
//                 <FaTextHeight />
//               </Tab>
//               <Tab onClick={handleDrawingPadClick}>
//                 <FaPencilAlt />
//               </Tab>
//               <Tab>
//                 <FaImage />
//               </Tab>
//             </TabList>
//             <TabPanels>
//               <TabPanel>
//                 {/* Implement Add Text content here */}
//                 <div>Add Text Content</div>
//               </TabPanel>
//               <TabPanel>
//                 {showDrawingCanvas && (
//                   <div>
//                     <div className="canvas-container">
//                       <SignatureCanvas
//                         ref={drawingBoardRef}
//                         penColor="black"
//                         canvasProps={{ className: "signature-canvas" }}
//                       />
//                     </div>
//                     <Button colorScheme="red" onClick={handleClearDrawing}>
//                       Clear
//                     </Button>
//                   </div>
//                 )}
//               </TabPanel>
//               <TabPanel>
//                 {/* Implement Upload Image content here */}
//                 <div>
//                   <label htmlFor="image-upload" className="custom-file-upload">
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       id="image-upload"
//                       style={{ display: "none" }}
//                       onChange={handleImageUpload}
//                     />
//                     <Box
//                       border="1px dashed #ccc"
//                       padding="1rem"
//                       textAlign="center"
//                       cursor="pointer"
//                     >
//                       <Text>Click to choose an image</Text>
//                     </Box>
//                   </label>
//                   {selectedImage && (
//                     <Center marginTop="1rem">
//                       <img
//                         src={URL.createObjectURL(selectedImage)}
//                         alt="Uploaded"
//                         width="150"
//                       />
//                     </Center>
//                   )}
//                 </div>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="green" onClick={handleDrawingDone}>
//             Done
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default DrawingModalComponent;

// drawing pad and image is done
// import React, { useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./drawingModalComponent.css";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Button,
//   Input,
//   Box,
//   Text,
//   Center,
// } from "@chakra-ui/react";
// import { FaPencilAlt, FaTextHeight, FaImage ,FaTrash} from "react-icons/fa";

// const DrawingModalComponent = ({
//   isDrawingModalOpen,
//   setIsDrawingModalOpen,
//   drawingBoardRef,
//   handleDrawingDone,
//   drawingData, 
//   currentPage, 
//   setDrawingData,
//   handleImageDone
// }) => {
//   const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [activeTab, setActiveTab] = useState(0); // Initialize with the index of the default active tab.

//   const handleTabChange = (index) => {
//     setActiveTab(index);
//   };

//   const handleDrawingPadClick = () => {
//     setShowDrawingCanvas(true);
//     setActiveTab(1); 
//   };

//   const handleClearDrawing = () => {
//     if (drawingBoardRef.current) {
//       drawingBoardRef.current.clear();
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleDoneClick = () => {
//     if(activeTab===1)
//     {
//       handleDrawingDone();
//     }
//     else if (activeTab === 2 && selectedImage) {
//       const imageDataURL = URL.createObjectURL(selectedImage);
//       handleImageDone(imageDataURL);
//     }
//     else if (activeTab ===0 ){

//     }
//     setIsDrawingModalOpen(false);
//   };

//   return (
//     <Modal
//       // key="xl"
//       isCentered
//       isOpen={isDrawingModalOpen}
//       onClose={() => {
//         setShowDrawingCanvas(false);
//         setIsDrawingModalOpen(false);
//       }}
//     >
//       <ModalOverlay />
//       <ModalContent  style={{height:"450px"}}>
//         <ModalHeader >Drawing Pad</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody style={{overflowY:"auto"}}>
//           <Tabs
//             isFitted
//             variant="enclosed"
//             onChange={(index) => handleTabChange(index)}
//             index={activeTab}     >
//             <TabList >
//               <Tab>
//                 <FaTextHeight />
//               </Tab>
//               <Tab onClick={handleDrawingPadClick}>
//                 <FaPencilAlt />
//               </Tab>
//               <Tab>
//                 <FaImage />
//               </Tab>
//             </TabList>
//             <TabPanels  >
//               <TabPanel >
//                 {/* Implement Add Text content here */}
//                 <div>Add Text Content</div>
//               </TabPanel>
//               <TabPanel >
//                 {showDrawingCanvas && (
//                   // <div>
//                   //   <div className="canvas-container">
//                   //     <SignatureCanvas
//                   //       ref={drawingBoardRef}
//                   //       penColor="black"
//                   //       canvasProps={{ className: "signature-canvas" }}
//                   //     />
//                   //   </div>
//                   //   <Button mt={2} colorScheme="red" onClick={handleClearDrawing}>
//                   //     Clear
//                   //   </Button>
//                   // </div>
//                   <div>
//                   <div className="canvas-container">
//                     <SignatureCanvas
//                       ref={drawingBoardRef}
//                       penColor="black"
//                       canvasProps={{ className: "signature-canvas" }}
//                     />
//                     <button
//                       className="clear-button"
//                       onClick={handleClearDrawing}
//                     >
//                       <FaTrash className="clear-icon" />
//                     </button>
//                   </div>
//                 </div>
//                 )}
//               </TabPanel>
//               <TabPanel >
//                 {/* Implement Upload Image content here */}
//                 <div>
//                   <label htmlFor="image-upload" className="custom-file-upload">
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       id="image-upload"
//                       style={{ display: "none" }}
//                       onChange={handleImageUpload}
//                     />
//                     <Box
//                       border="1px dashed #ccc"
//                       padding="1rem"
//                       textAlign="center"
//                       cursor="pointer"
//                     >
//                       <Text>Click to choose an image</Text>
//                     </Box>
//                   </label>
//                   {selectedImage && (
//                     <Center marginTop="1rem">
//                       <img
//                         src={URL.createObjectURL(selectedImage)}
//                         alt="Uploaded"
//                         width="100%"
//                       />
//                     </Center>
//                   )}
//                 </div>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="green" onClick={handleDoneClick}>
//             Done
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };
// export default DrawingModalComponent;


//trying text input on pdf
// import React, { useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./drawingModalComponent.css";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,  ModalFooter,  ModalBody,  ModalCloseButton,  Tab,  TabList,  TabPanel,  TabPanels,  Tabs,  Button,  Input,  Box,Text,  Center,
// } from "@chakra-ui/react";
// import { FaPencilAlt, FaTextHeight, FaImage ,FaTrash} from "react-icons/fa";

// const DrawingModalComponent = ({
//   isDrawingModalOpen,
//   setIsDrawingModalOpen,
//   drawingBoardRef,
//   handleDrawingDone,
//   handleImageDone,
//   handleTextDone
// }) => {
//   const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [activeTab, setActiveTab] = useState(0); 
//   const [textInput, setTextInput] = useState(""); 

//   const handleTabChange = (index) => {
//     setActiveTab(index);
//   };

//   const handleTextChange = (e) => {
//     setTextInput(e.target.value);
//   };

//   const handleDrawingPadClick = () => {
//     setShowDrawingCanvas(true);
//     setActiveTab(1); 
//   };

//   const handleClearDrawing = () => {
//     if (drawingBoardRef.current) {
//       drawingBoardRef.current.clear();
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleDoneClick = () => {
//     if(activeTab===1)
//     {
//       handleDrawingDone();
//     }
//     else if (activeTab === 2 && selectedImage) {
//       const imageDataURL = URL.createObjectURL(selectedImage);
//       handleImageDone(imageDataURL);
//     }
//     else if (activeTab === 0 && textInput ){
//       handleTextDone(textInput);
//     }
//     setIsDrawingModalOpen(false);
//   };

//   return (
//     <Modal
//       // key="xl"
//       isCentered
//       isOpen={isDrawingModalOpen}
//       onClose={() => {
//         setShowDrawingCanvas(false);
//         setIsDrawingModalOpen(false);
//       }}
//     >
//       <ModalOverlay />
//       <ModalContent  style={{height:"450px"}}>
//         <ModalHeader >Drawing Pad</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody style={{overflowY:"auto"}}>
//           <Tabs
//             isFitted
//             variant="enclosed"
//             onChange={(index) => handleTabChange(index)}
//             index={activeTab}     >
//             <TabList >
//               <Tab>
//                 <FaTextHeight />
//               </Tab>
//               <Tab onClick={handleDrawingPadClick}>
//                 <FaPencilAlt />
//               </Tab>
//               <Tab>
//                 <FaImage />
//               </Tab>
//             </TabList>
//             <TabPanels  >
//               <TabPanel >
//                 {/* Implement Add Text content here */}
//                 <div>
//                   <label>
//                     Enter Text:
//                     <input
//                       type="text"
//                       value={textInput}
//                       onChange={handleTextChange}
//                     />
//                   </label>
//                 </div>
//               </TabPanel>
//               <TabPanel >
//                 {showDrawingCanvas && (
//                   <div>
//                   <div className="canvas-container">
//                     <SignatureCanvas
//                       ref={drawingBoardRef}
//                       penColor="black"
//                       canvasProps={{ className: "signature-canvas" }}
//                     />
//                     <button
//                       className="clear-button"
//                       onClick={handleClearDrawing}
//                     >
//                       <FaTrash className="clear-icon" />
//                     </button>
//                   </div>
//                 </div>
//                 )}
//               </TabPanel>
//               <TabPanel >
//                 {/* Implement Upload Image content here */}
//                 <div>
//                   <label htmlFor="image-upload" className="custom-file-upload">
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       id="image-upload"
//                       style={{ display: "none" }}
//                       onChange={handleImageUpload}
//                     />
//                     <Box
//                       border="1px dashed #ccc"
//                       padding="1rem"
//                       textAlign="center"
//                       cursor="pointer"
//                     >
//                       <Text>Click to choose an image</Text>
//                     </Box>
//                   </label>
//                   {selectedImage && (
//                     <Center marginTop="1rem">
//                       <img
//                         src={URL.createObjectURL(selectedImage)}
//                         alt="Uploaded"
//                         width="100%"
//                       />
//                     </Center>
//                   )}
//                 </div>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="green" onClick={handleDoneClick}>
//             Done
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };
// export default DrawingModalComponent;


//trying to add colors for signature in drawing pad tab
import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./drawingModalComponent.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Input,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTextHeight, FaImage, FaTrash } from "react-icons/fa";

const DrawingModalComponent = ({
  isDrawingModalOpen,
  setIsDrawingModalOpen,
  drawingBoardRef,
  handleDrawingDone,
  handleImageDone,
  handleTextDone,
}) => {
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [penColors, setPenColors] = useState([
    "black",
    "red",
    "blue",
    "green"
  ]);
  const [selectedPenColor, setSelectedPenColor] = useState("black");

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleDrawingPadClick = () => {
    setShowDrawingCanvas(true);
    setActiveTab(1);
  };

  const handleClearDrawing = () => {
    if (drawingBoardRef.current) {
      drawingBoardRef.current.clear();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleDoneClick = () => {
    if (activeTab === 1) {
      handleDrawingDone();
    } else if (activeTab === 2 && selectedImage) {
      const imageDataURL = URL.createObjectURL(selectedImage);
      handleImageDone(imageDataURL);
    } else if (activeTab === 0 && textInput) {
      handleTextDone(textInput);
    }
    setIsDrawingModalOpen(false);
  };

  return (
    <Modal
      isCentered
      isOpen={isDrawingModalOpen}
      onClose={() => {
        setShowDrawingCanvas(false);
        setIsDrawingModalOpen(false);
      }}
    >
      <ModalOverlay />
      <ModalContent style={{ height: "450px" }}>
        <ModalHeader>Drawing Pad</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ overflowY: "auto" }}>
          <Tabs
            isFitted
            variant="enclosed"
            onChange={(index) => handleTabChange(index)}
            index={activeTab}
          >
            <TabList>
              <Tab>
                <FaTextHeight />
              </Tab>
              <Tab onClick={handleDrawingPadClick}>
                <FaPencilAlt />
              </Tab>
              <Tab>
                <FaImage />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div>
                  <label>
                    Enter Text:
                    <input
                      type="text"
                      value={textInput}
                      onChange={handleTextChange}
                    />
                  </label>
                </div>
              </TabPanel>
              <TabPanel>
                {showDrawingCanvas && (
                  <div>
                    <div className="canvas-container">
                    <div className="color-picker">
                      Colors:
                        {penColors.map((color) => (
                          <button
                            key={color}
                            className={`color-button ${
                              selectedPenColor === color ? "active" : ""
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedPenColor(color)}
                          />
                        ))}
                      </div>
                      <SignatureCanvas
                        ref={drawingBoardRef}
                        penColor={selectedPenColor}
                        canvasProps={{ className: "signature-canvas" }}
                      />
                      
                      <button className="clear-button" onClick={handleClearDrawing}>
                        <FaTrash className="clear-icon" />
                      </button>
                    </div>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                <div>
                  <label htmlFor="image-upload" className="custom-file-upload">
                    <Input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <Box
                      border="1px dashed #ccc"
                      padding="1rem"
                      textAlign="center"
                      cursor="pointer"
                    >
                      <Text>Click to choose an image</Text>
                    </Box>
                  </label>
                  {selectedImage && (
                    <Center marginTop="1rem">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Uploaded"
                        width="100%"
                      />
                    </Center>
                  )}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={handleDoneClick}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DrawingModalComponent;
