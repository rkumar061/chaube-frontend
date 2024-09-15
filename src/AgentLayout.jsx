// import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentSidePanel from "./components/AgentSidePanel";

function AgentLayout() {
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  async function fetchUserInfo() {
    const response = await fetch("http://localhost:3333/user/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).catch((error) => {
      console.error("Error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigator("/");
    });
    const data = await response.json();
    console.log(data);
    setUserInfo(data);
    if (data.role !== "user") {
      navigator("/");
    }
    console.log(userInfo);
  }
  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !localStorage.getItem("role") === "user"
    ) {
      navigator("/");
    }

    // fetch data
    fetchUserInfo();
  }, []);

  return (
    <>
      <div className="flex">
        {/* <SidePanel /> */}
        <AgentSidePanel />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      {/* <ThemeController /> */}
    </>
  );
}

export default AgentLayout;
