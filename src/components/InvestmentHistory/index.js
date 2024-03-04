import React, { useState } from "react";

const InvestmentHistory = ({Allinvestment,count,Allinvestment_earning,find_Roi,isWalletConnected}) => {
  const investmentHistoryList = [
    {
      id: "01",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
    {
      id: "02",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
    {
      id: "03",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
    {
      id: "04",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
    {
      id: "05",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
    {
      id: "06",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
    {
      id: "07",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
    {
      id: "08",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
    {
      id: "09",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
    {
      id: "10",
      stakingTime: "13.13 pm",
      tokenTime: "15.30 am",
      sAndT: "12.60 am",
      pRewards: "04",
      action: "04",
    },
  ];
  return (
    <div className="investment-history-section wrapWidth flex">
      <div className="investment-history-block flex items-center flex-col w-full">
        <h1 className="sec-title">Investment History</h1>
        {Allinvestment.length > 0 ? (
        <div className="table-block flex flex-col w-full">
          <div className="row flex items-center">
            <div className="row-item">No.</div>
            <div className="row-item">Invested Amount</div>
            <div className="row-item">Expiration Time Left</div>
            <div className="row-item">Total Earned</div>
            <div className="row-item">ROI</div>
          </div>
          {Allinvestment.map((item, index) => (
            <div key={index} className="row flex items-center">
              <div className="row-item">{index+1}</div>
              <div className="row-item">{item[0] / 10 ** 18} GLX</div>
              <div className="row-item">{count(item[1])}</div>
              <div className="row-item">{Allinvestment_earning[index]} GLX</div>
                {/* <div className="row-item">{find_Roi(item[0] / 10 ** 18)}%</div> */}

              <div className="row-item"> EARN EVERY HOUR</div>
            </div>
          ))}
        </div>
        ) : (
          <div>
            {isWalletConnected ? (
              <div
                className="sec-tag"
                style={{ textAlign: "center", paddingTop: "25px" }}
              >
                <p >You have no Previous investments</p>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentHistory;
