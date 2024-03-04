import React from "react";

const InvestWithDraw = () => {
  return (
    <div className="invest-withdraw-section flex">
      <div className="invest-withdraw-block flex items-center">
        <div className="iw-left-side flex">
          <div className="selection-tabs flex items-center">
            <button className="tab-item">Invest DAI</button>
            <button className="tab-item">Withdraw Earning</button>
          </div>
        </div>
        <div className="iw-right-side flex"></div>
      </div>
    </div>
  );
};

export default InvestWithDraw;
