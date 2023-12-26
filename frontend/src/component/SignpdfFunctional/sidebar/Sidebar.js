// import React from "react";
// import "./sidebar.css";

// function Sidebar() {

//   return (
//     <div className="sidebar-container">
//       <div className="data" ></div>
//     </div>
//   );
// }

// export default Sidebar;
import React from "react";
import "./sidebar.css";

const Sidebar = ({ thumbnails, currentPage, handleThumbnailClick }) => {
  return (
    <div className="sidebar-container">
      <div className="thumbnail-wrapper">
        <div className="thumbnail-container">
          {thumbnails.map((thumbnail, index) => (
            <div
              className="thumbnail"
              key={index}
              style={{
                backgroundColor:
                  currentPage === index + 1 ? "#ddd" : "transparent",
              }}
              onClick={() => handleThumbnailClick(index + 1)}
            >
              <img
                draggable="false"
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                height="100vh"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
