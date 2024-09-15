import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAllLeads from "./pages/admin/leads/All";
import AdminTodayLeads from "./pages/admin/leads/Today";
import AdminAssignedLeads from "./pages/admin/leads/Assigned";
import AdminUnassignedLeads from "./pages/admin/leads/Unassigned";
import AdminAllVisits from "./pages/admin/visits/All";
import AdminTodaysPlannedVisits from "./pages/admin/visits/TodaysPlanned";
import AdminTodaysCompletedVisits from "./pages/admin/visits/TodaysCompleted";
import AdminAgentReport from "./pages/admin/report/Agent";
import AdminLeadsReport from "./pages/admin/report/Leads";
import AdminManageProperties from "./pages/admin/MangeProperties";
import AgentLayout from "./AgentLayout";
import AgentDashboard from "./pages/agent/Dashboard";
import AgentAllLeads from "./pages/agent/leads/All";
import AgentTodayLeads from "./pages/agent/leads/Today";
import AgentAllVisits from "./pages/agent/visits/All";
import AgentTodaysPlannedVisits from "./pages/agent/visits/TodaysPlanned";
import AgentTodaysCompletedVisits from "./pages/agent/visits/TodaysCompleted";
import AgentProfile from "./pages/agent/Profile";
import AdminManageUsers from "./pages/admin/ManageUsers";
export default function App() {
  return (
    <>
      {/* login page at root and these are the protected routes
Leads
ALL LEADS
TODAYS LEADS
ASSIGNED LEADS
UNASSIGNED LEADS

Visits
ALL VISITS
TODAYS PLANED VISITS
TODAYS COMPLETED VISITS

REPORTS
AGENT REPORT
LEADS REPORT

MANAGE PROPERTIES

MANAGE ACCOUNTS
  */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/" element={<AdminLayout />}>
            {/* Dashboard */}
            <Route path="dashboard" element={<AdminDashboard />} />

            {/* Leads */}
            <Route path="leads/all-leads" element={<AdminAllLeads />} />
            <Route path="leads/today-leads" element={<AdminTodayLeads />} />
            <Route
              path="leads/assigned-leads"
              element={<AdminAssignedLeads />}
            />
            <Route
              path="leads/unassigned-leads"
              element={<AdminUnassignedLeads />}
            />

            {/* Visits */}
            <Route path="visits/all-visits" element={<AdminAllVisits />} />
            <Route
              path="visits/today-planned-visits"
              element={<AdminTodaysPlannedVisits />}
            />
            <Route
              path="visits/today-completed-visits"
              element={<AdminTodaysCompletedVisits />}
            />

            {/* Reports */}
            <Route path="reports/agent-report" element={<AdminAgentReport />} />
            <Route path="reports/leads-report" element={<AdminLeadsReport />} />

            {/* Manage Properties */}
            <Route
              path="manage-properties"
              element={<AdminManageProperties />}
            />

            {/* Manage Users */}
            <Route path="manage-users" element={<AdminManageUsers />} />
          </Route>
          <Route path="/agent/" element={<AgentLayout />}>
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="leads/all-leads" element={<AgentAllLeads />} />
            <Route path="leads/today-leads" element={<AgentTodayLeads />} />
            <Route path="visits/all-visits" element={<AgentAllVisits />} />
            <Route
              path="visits/today-planned-visits"
              element={<AgentTodaysPlannedVisits />}
            />
            <Route
              path="visits/today-completed-visits"
              element={<AgentTodaysCompletedVisits />}
            />
            <Route path="profile" element={<AgentProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
