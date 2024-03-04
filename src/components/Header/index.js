import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { WalletIcon, MenuIcon } from "../../assets/Icons";
import { useAccount, useDisconnect } from 'wagmi'


import { useWeb3Modal } from '@web3modal/react'
const Header = ({ openSidebar, setOpenSidebar }) => {
  const menuList = [
    { label: "Home", url: "#home" },
    { label: "Stake", url: "#stake" },
    { label: "Referral", url: "#referral" },
    { label: "How to", url: "#howTo" },
  ];
  const { open, close } = useWeb3Modal()
  const [openMenu, setOpenMenu] = useState(false);
  const [openWalletList, setOpenWalletList] = useState(false);

  const { address, isConnected,isDisconnected } = useAccount()

  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <div className="logo-img flex items-center justify-center">
            <Link to="/">
              <img src="./images/glogo.png" className="logo" />
            </Link>
          </div>
        </div>
        <div className="right flex items-center justify-end">
          <div className="menu-list flex items-center">
            {menuList.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="menu-item flex items-center justify-center"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="connect-wallet-action flex items-center justify-center">
            <button className="btn-connect button flex items-center justify-center" onClick={() => open()} >
              
              <div className="btn-icon flex items-center justify-center">
                <WalletIcon />
              </div>
              <p className="btn-lbl"> {isConnected?address.slice(0,5)+"..."+address.slice(38,42): "Connect Wallet" }</p>
            </button>
          </div>
          <div
            className="menu-icon flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setOpenSidebar(!openSidebar);
            }}
          >
            <MenuIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
