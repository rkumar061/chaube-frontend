// import React from "react";
import { Outlet } from "react-router-dom";
import SidePanel from "./components/SidePanel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import LoginPage from "./LoginPage"; // Assuming you still have the LoginPage component

function AdminLayout() {
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  async function fetchUserInfo() {
    const response = await fetch("http://localhost:3333/admin/", {
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
    if (data.role !== "admin" || data.message === "Unauthorized") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigator("/");
    }
    console.log(userInfo);
  }

  // check if user is logged in
  useEffect(() => {
    console.log("hello admin");
    if (
      !localStorage.getItem("token") &&
      !localStorage.getItem("role") === "admin"
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
        <SidePanel />
        <div className="w-full">
          {/* {{ ...userInfo } && <h1>{userInfo.name}</h1>} */}
          <Outlet />
        </div>
      </div>
      {/* <ThemeController /> */}
    </>
  );
}

export default AdminLayout;
