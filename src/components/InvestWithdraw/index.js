import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  cont_address,
  cont_abi,
  tokenABI,
  Token_address,
} from "../../../src/components/config";
import Web3 from "web3";
import { useLocation } from "react-router-dom";

import { CopyIcon, RocketIcon2 } from "../../assets/Icons";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction, usePublicClient } from 'wagmi'
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'

const InvestWithdraw = ({ROI,withdraw_Amount,setInvestment,set_ROI,find_Exp_earn,find_Roi,minimum_investment,set_Expected_return,Expected_return,Invest,set_withdraw_Amount,total_withdraw_reaward,cal_after_withdraw,after_Withdraw,WithdrawReward,investment,totlaInvestment,totalEarning,totalReward,totalReferrals,address }) => {
  const [activeTab, setActiveTab] = useState("invest");
  





  return (
    <div className="invest-withdraw-section wrapWidth flex">
      <div className="invest-withdraw-block flex items-center w-full">
        <div className="iw-left-side flex flex-col">
          <div className="selection-tabs flex items-center">
            <button
              className={`tab-item button ${
                activeTab === "invest" ? "active" : ""
              }`}
              onClick={(e) => setActiveTab("invest")}
            >
              Invest GLX
            </button>
            <button
              className={`tab-item button ${
                activeTab === "withdraw" ? "active" : ""
              }`}
              onClick={(e) => setActiveTab("withdraw")}
            >
              Withdraw Earning
            </button>
          </div>
          {activeTab === "invest" ? (
            <div className="box-block flex flex-col">
              <div className="block-hdr flex items-center justify-between gap-3">
                <h1 className="block-slug">
                  Stake Token & get upto <span>400%</span> APY
                </h1>
                <div className="icon-side flex justify-end ">
                  <div className="icon flex items-center justify-center">
                    <RocketIcon2 />
                  </div>
                </div>
              </div>
              <div className="input-field flex flex-col">
                <h1 className="input-lbl mb-3">Investment Amounts</h1>
                <input
                  type="number"
                  className="txt cleanbtn"
                  value={investment}
                  onChange={(e) => {
                    setInvestment(e.target.value);
                    set_ROI(find_Roi(e.target.value));
                    set_Expected_return(find_Exp_earn(e.target.value));
                  }}
                  placeholder="0"
                  min={minimum_investment}
                />
              </div>
              <div className="info-block flex flex-col w-full">
                <div className="info-item w-full flex items-center justify-between gap-3">
                  <label className="lbl">Plan Duration</label>
                  <label className="val">334 Days</label>
                </div>
                <div className="info-item w-full flex items-center justify-between gap-3">
                  <label className="lbl">Expected ROI</label>
                  <label className="val">{ROI ? ROI+"%" : "0"}</label>
                </div>
                <div className="info-item w-full flex items-center justify-between gap-3">
                  <label className="lbl">Expected Return</label>
                  <label className="val">{Expected_return ? Expected_return.toFixed(2) : "0"}{" "}GLX</label>
                </div>
              </div>
              <button className="btn-amount button mt-8" onClick={() => Invest()}
>
                Invest
              </button>
            </div>
          ) : activeTab === "withdraw" ? (
            <div className="box-block flex flex-col">
              <div className="block-hdr flex items-center justify-between gap-3">
                <h1 className="block-slug">
                  Withdraw <span>Earning</span> Stake GLX
                </h1>
                <div className="icon-side flex justify-end ">
                  <div className="icon flex items-center justify-center">
                    <RocketIcon2 />
                  </div>
                </div>
              </div>
              <div className="input-field flex flex-col">
                <h1 className="input-lbl mb-3">Withdrow Amount</h1>
                <input
                  type="number"
                  className="txt cleanbtn"
                  placeholder="0"
                  value={withdraw_Amount}
                  min={minimum_investment}
                  onChange={(e) => {
                    set_withdraw_Amount(e.target.value);
                    cal_after_withdraw(e.target.value);
                  }}
                />
              </div>
              <div className="info-block flex flex-col w-full">
                <div className="info-item w-full flex items-center justify-between gap-3">
                  <label className="lbl">Balance After Withdraw</label>
                  <label className="val">{withdraw_Amount == "" ? 0 : after_Withdraw}</label>
                </div>
                <div className="info-item w-full flex items-center justify-between gap-3">
                  <label className="lbl">Total Withdraw</label>
                  <label className="val"> {total_withdraw_reaward / 10 ** 18} GLX</label>
                </div>
              </div>
              <button className="btn-amount button mt-8" onClick={WithdrawReward}
>
                Withdraw
              </button>
            </div>
          ) : null}
        </div>
        <div className="iw-right-side flex flex-col gap-5">
          <div className="row2">
            <div className="info-box flex flex-col">
              <label className="lbl">Total Investment</label>
              <h1 className="val">{totlaInvestment}</h1>
            </div>
            <div className="info-box flex flex-col">
              <label className="lbl">Total Earning</label>
              <h1 className="val">{totalEarning}</h1>
            </div>
            <div className="info-box flex flex-col">
              <label className="lbl"> Current Balance</label>
              <h1 className="val">{totalReward}</h1>
            </div>
            <div className="info-box flex flex-col">
              <label className="lbl">Total Referrals</label>
              <h1 className="val">{totalReferrals}</h1>
            </div>
          </div>
          <div className="row1 w-full">
            <div className="info-box flex flex-col">
              <div className="flex items-center gap-4">
                <label className="lbl">Ref Link</label>
                <div className="icon-copy flex items-center justify-center cursor-pointer">
                  <CopyToClipboard text={`https://galaxyx.vercel.app/?ref=${address}`} >
                  <button className="copy-icon flex items-center justify-center">
                          <CopyIcon />
                        </button>
                      </CopyToClipboard>                 
                </div>
              </div>
              <h1 className="referral-val">
                https://galaxyx.vercel.app/?ref=
                {address == null
                        ? "..."
                        : address.toString().slice(0, 4) + "..."}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestWithdraw;
