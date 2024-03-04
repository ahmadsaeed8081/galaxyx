import React, { useState } from "react";
import Modal from "../../components/Modal";
import BuyTokenModel from "../../components/BuyTokenModel";
import { EditIcon, RocketIcon } from "../../assets/Icons";
import { Link } from "react-router-dom";

const Hero = ({
  cont_address,
  find_Exp_usdt,
  find_Exp_Token,
  buying_Amount,
  set_buying_Amount,
  selling_Amount,
  set_selling_Amount,
  purchaseToken,
  sellToken,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div id="home" className="lading-page h-screen flex">
      <div className="wrap wrapWidth flex">
        <div className="hero-section flex w-full items-center max-md:flex-col max-md:justify-center">
          <div className="hero-left-side flex flex-1 flex-col">
            <h1 className="hero-slug">
              Welcome to <span>GalaxyX</span>
            </h1>
            {/* <h1 className="hero-slug">
            </h1> */}
            <p className="hero-desc">
              Welcome to "GalaxyX" - The Ultimate Online Games platform that
              Pays You to Play! Are you an online games lover looking to level
              up your gaming experience? Do you want to turn your passion for
              gaming into real-life rewards? Look no further! GalaxyX is here
              to revolutionize your gaming journey while putting some serious
              money in your pocket. For investors who are not interested in
              playing games but want to earn every hour, GalaxyX is the
              answer, with the power of a smart contract, decentralized
              blockchain, and using Binance smart chain, you get paid every hour
              as game lovers play games globally .
            </p>
            <div className="actions flex items-center">
              <button
                className="btn-buy button flex items-center justify-center"
                onClick={(e) => setOpen(true)}
              >
                <div className="btn-icon flex items-center justify-center">
                  <RocketIcon />
                </div>
                <h1 className="btn-lbl">Buy Token</h1>
              </button>
              <button className="btn-contract button flex items-center justify-center">
                <Link to="/">
                  <h1 className="btn-lbl">Contract</h1>
                </Link>
                <div className="btn-icon flex items-center justify-center">
                  <EditIcon />
                </div>
              </button>
            </div>
          </div>
          <div className="hero-right-side relative flex flex-1 justify-center items-center">
            {/* <div className="circle absolute"></div> */}
            {/* <img alt="map" src="./images/map.png" className="map-img" /> */}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <BuyTokenModel
          setOpen={setOpen}
          find_Exp_usdt={find_Exp_usdt}
          find_Exp_Token={find_Exp_Token}
          buying_Amount={buying_Amount}
          set_buying_Amount={set_buying_Amount}
          selling_Amount={selling_Amount}
          set_selling_Amount={set_selling_Amount}
          purchaseToken={purchaseToken}
          sellToken={sellToken}
        />
      </Modal>
    </div>
  );
};

export default Hero;
