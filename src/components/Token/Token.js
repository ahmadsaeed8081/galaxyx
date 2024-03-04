import React from "react";
import { CheckIcon } from "../../assets/Icons";
const Token = () => {
  return (
    <div>
      <div id="token" className="token-section  ">
        <div className="token-wrap wrapWidth grid lg:grid-cols-2 ">
          <div className="token-details flex-1 max-md:mx-auto">
            {/* <p className="token-desc text-white flex justify-start items-end gap-1 ">
              <hr className="w-20 pb-2" />
              Why GalaxyX

            </p> */}
            <h1 className="token-heading">Why GalaxyX
</h1>
            <p className="token-desc">
            We are using a decentralized blockchain for staking

            </p>
            <div className="token-checked grid lg:grid-cols-2 max-md:grid-cols-2 gap-10 max-md:gap-3">
              <div className="check-wrap ">
                <div className="check">
                  <CheckIcon />
                </div>
                <h2 className="check-desc">Easy to buy and stake GLX COIN
</h2>
              </div>
              <div className="check-wrap ">
                <div className="check">
                  <CheckIcon />
                </div>
                <h2 className="check-desc">Withdrawal in BEP20 USDT
</h2>
              </div>
              <div className="check-wrap ">
                <div className="check">
                  <CheckIcon />
                </div>
                <h2 className="check-desc">You can refer others and earn</h2>
              </div>
              <div className="check-wrap ">
                <div className="check">
                  <CheckIcon />
                </div>
                <h2 className="check-desc">400% ROI payout


</h2>
              </div>
            </div>
            {/* <button className="token-button">
              Buy Sale Token <select className="select"></select>
            </button> */}
          </div>
          <div className="flex-1 py-7 px-7 max-md:p-0">
            <img
              src="./images/hand.png"
              alt="Hand"
              className="object-contain max-md:w-[250px] max-md:h-[250px] max-md:mx-auto "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
