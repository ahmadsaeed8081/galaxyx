import React from "react";
import { ArrowRightIcon } from "../../assets/Icons";
const Stake = () => {
  return (
    <div id="stake" className="stake-section ">
      <div className="wrapWidth grid lg:grid-cols-2  stake-wrap">
        <div className="flex-1 stake-details ">
          <p className="stake-desc-main">
            <hr className="w-20 pb-2" />
            Staking
          </p>
          <h1 className="main-heading">How to Stake ?</h1>
          <h2 className="stake-heaing">Add GLX Tokens</h2>
          <p className="stake-desc">
          You will need BEP20 USDT in your wallet Make sure you have enough USDT in your wallet.
          </p>
          <h2 className="stake-heaing">Connect & Verify Wallet</h2>
          <p className="stake-desc">
          Click the “Connect Wallet” button at the upper right corner of the website and click Connect.
          <br></br>
          Choose the amount of GLX you want to buy , pay with BEP20 USDT.
          <br></br>
          Choose the wallet where you have the GLX you want to stake.
          <br></br>

          Add the GLX you want to stake.

          </p>
          <h2 className="stake-heaing">Why GalaxyX</h2>
          <p className="stake-desc">
          Earn 400% of your investment as people play games globally.
<br></br>
The global online gaming market size was valued at USD 61.7 Billion in 2022 and will achieve a market size of USD 163.0 Billion by 2032, budding at a CAGR of 10.2%.
<br></br>

You are sharing revenue with us.

          </p>
          <h2 className="stake-heaing">Easy to stake
</h2>
          <p className="stake-desc">
          Earnings paid out every hour


<br></br>

Decentralized, you don’t need admin approval to withdraw your earnings
<br></br>

Follow us on all social media platforms

          </p>
          <button className="stake-btn">
            <h1 className="btn">More Details</h1>
            <div className="btn-arrow">
              <ArrowRightIcon />
            </div>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center  stake-img ">
          <img
            src="./images/Stake-Design.png"
            alt="StakeImg"
            className="object-contain max-md:w-[250px] max-md:h-[250px] max-md:mx-auto "
          />
          <div className="stake-col"></div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
