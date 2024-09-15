import { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import { TbLocationCheck } from "react-icons/tb";
import { BiSolidReport } from "react-icons/bi";
import { BsFillHouseGearFill } from "react-icons/bs";
import { FaUserGear } from "react-icons/fa6";
import ThemeController from "./themeController";
import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
  const navigator = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
    setActiveDropdown(null); // Close all dropdowns when collapsed
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigator("/");
  };

  return (
    <div
      className={`h-screen bg-base-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex flex-col justify-between h-screen p-1 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="mt-5">
          <Link
            to="/admin/dashboard"
            className={`flex items-center space-x-2 p-2 ${
              isCollapsed ? "justify-center" : "justify-start"
            } cursor-pointer`}
          >
            <RiDashboardFill className="text-2xl" />
            {!isCollapsed && (
              <span className="text-m font-semibold">Dashboard</span>
            )}
          </Link>
          <div
            className={`flex items-center space-x-2 p-2 ${
              isCollapsed ? "justify-center" : "justify-start"
            } cursor-pointer`}
            onMouseEnter={() => toggleDropdown("leads")}
          >
            <TbTargetArrow className="text-2xl" />
            {!isCollapsed && (
              <span className="text-m font-semibold">Leads</span>
            )}
          </div>
          {!isCollapsed && activeDropdown === "leads" && (
            <div className="pl-9 flex flex-col items-start">
              {/* <div className="py-1">ALL LEADS</div>
              <div className="py-1">TODAYS LEADS</div>
              <div className="py-1">ASSIGNED LEADS</div>
              <div className="py-1">UNASSIGNED LEADS</div>
              links to the pages */}
              <Link
                className="mb-2 text-sm border-b-2 w-full hover:pl-2 transition-all duration-300 ease-in-out"
                to="/admin/leads/all-leads"
              >
                All Leads
              </Link>
              <Link
                className="mb-2 text-sm border-b-2 w-full hover:pl-2 transition-all duration-300 ease-in-out"
                to="/admin/leads/today-leads"
              >
                Today&apos;s Leads
              </Link>
              <Link
                className="mb-2 text-sm border-b-2 w-full hover:pl-2 transition-all duration-300 ease-in-out"
                to="/admin/leads/assigned-leads"
              >
                Assigned Leads
              </Link>
              <Link
                className="mb-2 text-sm border-b-2 w-full hover:pl-2 transition-all duration-300 ease-in-out"
                to="/admin/leads/unassigned-leads"
              >
                Unassigned Leads
              </Link>
            </div>
          )}

          <div
            className={`flex items-center space-x-2 p-2 ${
              isCollapsed ? "justify-center" : "justify-start"
            } cursor-pointer`}
            onMouseEnter={() => toggleDropdown("visits")}
          >
            <TbLocationCheck className="text-2xl" />
            {!isCollapsed && (
              <span className="text-m font-semibold">Visits</span>
            )}
          </div>
          {!isCollapsed && activeDropdown === "visits" && (
            <div className="pl-9 flex flex-col items-start">
              {/* <div className="py-1">ALL VISITS</div>
              <div className="py-1">TODAYS PLANNED VISITS</div>
              <div className="py-1">TODAYS COMPLETED VISITS</div> */}
              {/* links to the pages */}
              <Link
                className="mb-2 text-sm border-b-2 w-full hover:pl-2 transition-all duration-300 ease-in-out"
                to="/admin/visits/all-visits"
              >
                All Visits
              </Link>
              <Link
                className="mb-2 text-sm border-b-2 w-full hover:pl-2 transition-all duration-300 ease-in-out"
                to="/admin/visits/today-planned-visits"
              >
                Today&apos;s Planned Visits
              </Link>
              <Link
                className="mb-2 text-sm border-b-2 w-full hover:pl-2 transition-all duration-300 ease-in-out"
                to="/admin/visits/today-completed-visits"
              >
                Today&apos;s Completed Visits
              </Link>
            </div>
          )}

          <div
            className={`flex items-center space-x-2 p-2 ${
              isCollapsed ? "justify-center" : "justify-start"
            } cursor-pointer`}
            onMouseEnter={() => toggleDropdown("reports")}
          >
            <BiSolidReport className="text-2xl" />
            {!isCollapsed && (
              <span className="text-m font-semibold">Reports</span>
            )}
          </div>
          {!isCollapsed && activeDropdown === "reports" && (
            <div className="pl-9 flex flex-col items-start">
              {/* <div className="py-1">AGENT REPORT</div>
              <div className="py-1">LEADS REPORT</div> */}
              {/* links to the pages */}
              <Link
                className="mb-2 text-sm border-b-2 w-full hover:pl-2 transition-all duration-300 ease-in-out"
                to="/admin/reports/agent-report"
              >
                Agent Report
              </Link>
              <Link
                className="mb-2 text-sm border-b-2 w-full hover:pl-2 transition-all duration-300 ease-in-out"
                to="/admin/reports/leads-report"
              >
                Leads Report
              </Link>
            </div>
          )}

          <Link
            to="/admin/manage-properties"
            className={`flex items-center space-x-2 p-2 ${
              isCollapsed ? "justify-center" : "justify-start"
            } cursor-pointer`}
          >
            <BsFillHouseGearFill className="text-2xl" />
            {!isCollapsed && (
              <span className="text-m font-semibold">Manage Properties</span>
            )}
          </Link>

          <Link
            to="/admin/manage-users"
            className={`flex items-center space-x-2 p-2 ${
              isCollapsed ? "justify-center" : "justify-start"
            } cursor-pointer`}
          >
            <FaUserGear className="text-2xl" />
            {!isCollapsed && (
              <span className="text-m font-semibold">Manage users</span>
            )}
          </Link>
        </div>
        <div>
          <ThemeController isCollapsed={isCollapsed} />
          {/* <button className="btn btn-error" onClick={handleLogout}>
            Logout
          </button> */}
          <button
            className={`bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out py-2 mt-2 flex justify-center items-center ${
              isCollapsed ? "w-16" : "w-64"
            }`}
            onClick={handleLogout}
          >
            <TbLogout2 className="text-2xl" />
            {!isCollapsed && (
              <span className="text-m font-semibold">Logout</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
