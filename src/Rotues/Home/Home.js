import React from "react";
import Cards from "../../component/cards/Cards";
import "../../default.style.css";

import Footer from "../../component/Footer/Footer";

function Home() {
  return (
    <div className="body-wrapper">
      <Cards />
      <Footer />
    </div>
  );
}

export default Home;
