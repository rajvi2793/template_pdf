// import React, { useState } from "react";
// import "./toolbar.css";
// import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

// function Toolbar() {
//   const [value, setValue] = useState(1);
//   const decreaseHandler = () => {
//     if (value > 1) {
//       setValue((prevValue) => prevValue - 1);
//     }
//   };
//   const increaseHanlder = () => {
//     setValue((prevValue) => prevValue + 1);
//   };

//   return (
//     <>
//       <div className="page-controllers">
//         <ul type="none">
//           <li>
//             <button className="page__control-button" onClick={increaseHanlder}>
//               <MdArrowUpward />
//             </button>
//           </li>
//           <li>
//             <button className="page__control-button" onClick={decreaseHandler}>
//               <MdArrowDownward  />
//             </button>
//           </li>
//         </ul>
//         <div className="page-no-display">
//           <input type="text " value={value} />
//           <span>/</span>
//           <span>12</span>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Toolbar;

// import React, { useState, useEffect, useRef } from "react";
// import "./toolbar.css";
// import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

// function Toolbar({ numPages, currentPage, setCurrentPage, mainContainerRef }) {
//   const [value, setValue] = useState(currentPage);

//   useEffect(() => {
//     setValue(currentPage);
//   }, [currentPage]);

//   const handleInputChange = (e) => {
//     let newValue = parseInt(e.target.value);

//     if (newValue < 1) {
//       newValue = 1;
//     } else if (newValue > numPages) {
//       newValue = numPages;
//     }

//     setValue(newValue);
//   };

//   const handleInputBlur = () => {
//     setCurrentPage(value);
//     if (mainContainerRef.current) {
//       const scrollableContainer = mainContainerRef.current;
//       const containerHeight = scrollableContainer.scrollHeight;
//       const pageHeight = containerHeight / numPages;
//       const scrollToY = (value - 1) * pageHeight;
//       scrollableContainer.scrollTo({
//         top: scrollToY,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="page-controllers">
//         <ul type="none">
//           <li>
//             <button
//               className="page__control-button"
//               onClick={() => setCurrentPage(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               <MdArrowUpward />
//             </button>
//           </li>
//           <li>
//             <button
//               className="page__control-button"
//               onClick={() => setCurrentPage(currentPage + 1)}
//               disabled={currentPage === numPages}
//             >
//               <MdArrowDownward />
//             </button>
//           </li>
//         </ul>
//         <div className="page-no-display">
//           <input
//             type="number"
//             min={1}
//             max={numPages}
//             value={value}
//             onChange={handleInputChange}
//             onBlur={handleInputBlur}
//           />
//           <span>/</span>
//           <span>{numPages}</span>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Toolbar;


import React, { useState, useEffect } from "react";
import "./toolbar.css";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

function Toolbar({ numPages, currentPage, setCurrentPage, mainContainerRef }) {
  const [value, setValue] = useState(currentPage);

  useEffect(() => {
    setValue(currentPage);
  }, [currentPage]);

  const handleInputChange = (e) => {
    let newValue = parseInt(e.target.value);

    if (newValue < 1) {
      newValue = null;
    } else if (newValue > numPages) {
      newValue = numPages;
    }
    const pageDifference = newValue - currentPage;
    if (mainContainerRef.current) {
      const scrollableContainer = mainContainerRef.current;
      const containerHeight = scrollableContainer.scrollHeight;
      const pageHeight = containerHeight / numPages;
      const scrollToY = (currentPage - 1 + pageDifference) * pageHeight+3;
      scrollableContainer.scrollTo({
        top: scrollToY,
        behavior: "smooth",
      });
    }
    setCurrentPage(newValue);
  };
  return (
    <>
      <div className="page-controllers">
        <ul type="none">
          <li>
            <button
              className="page__control-button"
              onClick={() => handleInputChange({ target: { value: currentPage - 1 } })}
              disabled={currentPage === 1}
            >
              <MdArrowUpward />
            </button>
          </li>
          <li>
            <button
              className="page__control-button"
              onClick={() => handleInputChange({ target: { value: currentPage + 1 } })}
              disabled={currentPage === numPages}
            >
              <MdArrowDownward />
            </button>
          </li>
        </ul>
        <div className="page-no-display">
          <input
            type="number"
            min={1}
            max={numPages}
            value={value}
            onInput={handleInputChange}
            onBlur={handleInputChange}
          />
          <span>/</span>
          <span>{numPages}</span>
        </div>
      </div>
    </>
  );
}
export default Toolbar;
