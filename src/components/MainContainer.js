import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((stocks) => setStocks(stocks));
  }, []);

  function handleUpdateStock(updatedStock) {
    const updatedStocks = stocks.map((stock) => {
      if (stock.id === updatedStock.id) {
        return updatedStock;
      } else {
        return stock;
      }
    });
    setStocks(updatedStocks);
  }

  function handleSortChange(value) {
    setSortBy(value);
  }

  function handleFilterChange(value) {
    setType(value);
  }

  const filteredStocks = type
  ? stocks.filter((stock) => stock.type === type)
  : stocks;

  const sortedAndFilteredStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Price") {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onSortChange={handleSortChange}
        type={type}
        onFilterChange={handleFilterChange}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={sortedAndFilteredStocks}
            onUpdateStock={handleUpdateStock}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            stocks={sortedAndFilteredStocks}
            onUpdateStock={handleUpdateStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
