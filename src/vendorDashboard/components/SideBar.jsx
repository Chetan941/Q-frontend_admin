import React from "react";

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle
}) => {
  return (
    <div className="sideBarSection">
      <ul>
        {showFirmTitle && (
          <li onClick={showFirmHandler}>
            ➕ Add New Firm
          </li>
        )}
        <li onClick={showProductHandler}>📦 Add Product</li>
        <li onClick={showAllProductsHandler}>🗂️ View All Products</li>
        <li>👤 User Details</li>
      </ul>
    </div>
  );
};

export default SideBar;
