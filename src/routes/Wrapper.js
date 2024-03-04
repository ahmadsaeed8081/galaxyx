import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Wrapper = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className={`dashboard-page flex flex-col`}>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="pages-block flex flex-col relative h-full">
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <section>{children}</section>
        <Footer />
      </div>
    </div>
  );
};
export default Wrapper;
