import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onUpdateStock }) {

  return (
    <div>
      <h2>My Portfolio</h2>
      {stocks.map((stock) => stock.isInPortfolio ? (
        <Stock
          key={stock.id}
          stock={stock}
          onUpdateStock={onUpdateStock}
        />
      ) : null)}
    </div>
  );
}

export default PortfolioContainer;
