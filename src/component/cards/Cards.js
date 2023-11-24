import React from "react";
import { CardData } from "../../Data/HomeCardData/CardData";

import "./cards.css";

import Card from "../card/ProductCard";
import { Link } from "react-router-dom";

function Cards() {
  return (
    <div className="cards">
      {CardData.map((product) => {
        return (
          <Link to={product.url} key={product.id} product={product}>
            <Card key={product.id} product={product} />
          </Link>
        );
      })}
    </div>
  );
}

export default Cards;
