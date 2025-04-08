import React from "react";

function Stock({ stock, onUpdateStock }) {
  function handleAddToPortfolioClick() {
    fetch(`http://localhost:3001/stocks/${stock.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInPortfolio: !stock.isInPortfolio
      }),
    })
      .then((r) => r.json())
      .then((updatedStock) => onUpdateStock(updatedStock));
  }

  return (
    <div>
      <div className="card" onClick={handleAddToPortfolioClick}>
        <div className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">{stock.price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
