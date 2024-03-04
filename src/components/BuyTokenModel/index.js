import React, { useState } from "react";

const BuyTokenModel = ({find_Exp_usdt ,find_Exp_Token, buying_Amount, set_buying_Amount, selling_Amount, set_selling_Amount, purchaseToken, sellToken }) => {
  const [activeTab, setActiveTab] = useState("Purchase");


  
  return (
    <div className="buy-token-model-section flex flex-col">
      <div className="buy-token-model-hdr flex items-center">
        <button
          className={`btn-tab button ${
            activeTab === "Purchase" ? "active" : ""
          }`}
          onClick={(e) => setActiveTab("Purchase")}
        >
          Purchase Token
        </button>
        <button
          className={`btn-tab button ${activeTab === "Sale" ? "active" : ""}`}
          onClick={(e) => setActiveTab("Sale")}
        >
          Sale Token
        </button>
      </div>
      {activeTab === "Purchase" ? (
        <div className="model-block flex flex-col">
          <h1 className="block-title">Purchase GLX Token</h1>
          <div className="input-field flex flex-col">
            <div className="flex items-center mb-4 w-full justify-between gap-3">
              <h1 className="input-lbl">Enter Your Amount in USDT</h1>
              <h1 className="input-lbl">1 GLX = 0.02$</h1>
            </div>
            <input type="number" 
            className="txt cleanbtn"
             placeholder="0.0"
             value={buying_Amount}
             onChange={(e)=>{set_buying_Amount(e.target.value)}}
              />
          </div>
          <div className="info-block flex flex-col w-full">
            <div className="info-item w-full flex items-center justify-between gap-3">
              <label className="lbl">Expected GLX Token</label>
              <label className="val">{find_Exp_Token()}</label>
            </div>
            {/* <div className="info-item w-full flex items-center justify-between gap-3">
              <label className="lbl">Expected Return</label>
              <label className="val">900</label>
            </div> */}
          </div>
          <button className="btn-amount button mt-8" onClick={purchaseToken}>Buy Now</button>
        </div>
      ) : activeTab === "Sale" ? (
        <div className="model-block flex flex-col">
          <h1 className="block-title">Sale GLX Token</h1>
          <div className="input-field flex flex-col">
            <div className="flex items-center mb-4 w-full justify-between gap-3">
              <h1 className="input-lbl">Inter Your Amount</h1>
              <h1 className="input-lbl">1 GLX = 0.015$</h1>
            </div>
            <input type="number" className="txt cleanbtn" placeholder="0.0" 
             value={selling_Amount}
             onChange={(e)=>{set_selling_Amount(e.target.value)}} />
          </div>
          <div className="info-block flex flex-col w-full">
            <div className="info-item w-full flex items-center justify-between gap-3">
              <label className="lbl">Expected USDT</label>
              <label className="val">{find_Exp_usdt()}</label>
            </div>
            {/* <div className="info-item w-full flex items-center justify-between gap-3">
              <label className="lbl">Expected Return</label>
              <label className="val">900</label>
            </div> */}
          </div>
          <button className="btn-amount button mt-8" onClick={sellToken} >Sale Now</button>
        </div>
      ) : null}
    </div>
  );
};

export default BuyTokenModel;
