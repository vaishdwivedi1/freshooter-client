import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router";
import "swiper/css";
import Footer from "../../components/Footer";
export default function FeedLayout() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Main content area */}
      <div className="pt-16  flex-1 flex flex-col justify-start w-full">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
