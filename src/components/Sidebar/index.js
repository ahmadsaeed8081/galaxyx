import React, { useEffect } from "react";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const navBarItems = [
    { label: "Home", url: "#home" },
    { label: "Stake", url: "#stake" },
    { label: "Referral", url: "#referral" },
    { label: "How to", url: "#howTo" },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      document.body.style.overflowY = "auto";
      setOpenSidebar(false);
    });
  }, []);

  return (
    <div
      className={`sidebar-s fixed rel anim ${openSidebar ? "show" : "hide"}`}
    >
      <div
        className={`side-block flex col anim ${openSidebar ? "show" : "hide"}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="hdr flex items-center justify-center">
          <div className="hdr-logo flex items-center">
            <img src="./images/logo.svg" className="logo" />
          </div>
          <div
            className="icon-close flex aic jc"
            onClick={(e) => {
              setOpenSidebar(false);
            }}
          >
            {/* <CrossIcon /> */}
          </div>
        </div>
        <div>
          <div className="items flex aic flex-col">
            {navBarItems.map((item, index) => (
              <div
                className={`list-item flex `}
                onClick={(e) => {
                  setOpenSidebar(false);
                }}
                key={index}
              >
                <a href={item.url} className="li">
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
