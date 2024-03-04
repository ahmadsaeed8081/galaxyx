import React from "react";

const Referral = ({ref_data1,ref_data}) => {
  return (
    <div id="referral" className="ref-section">
      <div className="wrapWidth ref-wrap">
        <h1 className="ref-heading">Your Referral Reward</h1>
        <div className="ref-details">
          <div className="ref-box">
            <h1 className="box-heading">Level 1</h1>
            <p className="box-desc">{ref_data[0]? ref_data[0]/10**18: "0"}</p>
          </div>
          <div className="ref-box">
            <h1 className="box-heading">Level 2</h1>
            <p className="box-desc">{ref_data[1]? ref_data[1]/10**18: "0"}</p>
          </div>
          <div className="ref-box">
            <h1 className="box-heading">Level 3</h1>
            <p className="box-desc">{ref_data[2]? ref_data[2]/10**18: "0"}</p>
          </div>
          <div className="ref-box">
            <h1 className="box-heading">Level 4</h1>
            <p className="box-desc">{ref_data[3]? ref_data[3]/10**18: "0"}</p>
          </div>
          <div className="ref-box">
            <h1 className="box-heading">Level 5</h1>
            <p className="box-desc">{ref_data[4]? ref_data[4]/10**18: "0"}</p>
          </div>
        </div>
      </div>
      <div className="wrapWidth ref-wrap">
        <h1 className="ref-heading my-20">Your Referral Counts</h1>
        <div className="ref-details  mb-40">
        <div className="ref-box">
            <h1 className="box-heading">Level 1</h1>
            <p className="box-desc">{ref_data1[0]? ref_data1[0]: "0"}</p>
          </div>
          <div className="ref-box">
            <h1 className="box-heading">Level 2</h1>
            <p className="box-desc">{ref_data1[1]? ref_data1[1]: "0"}</p>
          </div>
          <div className="ref-box">
            <h1 className="box-heading">Level 3</h1>
            <p className="box-desc">{ref_data1[2]? ref_data1[2]: "0"}</p>
          </div>
          <div className="ref-box">
            <h1 className="box-heading">Level 4</h1>
            <p className="box-desc">{ref_data1[3]? ref_data1[3]: "0"}</p>
          </div>
          <div className="ref-box">
            <h1 className="box-heading">Level 5</h1>
            <p className="box-desc">{ref_data1[4]? ref_data1[4]: "0"}</p>
          </div>
          <div className="ref-col"></div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
