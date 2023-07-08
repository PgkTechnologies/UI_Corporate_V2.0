import React from "react";

const Login = React.lazy(() => import("./Pages/Forms/Corporate/Login"));
const Register = React.lazy(() =>
  import("./Pages/Forms/Corporate/Register/Register")
);
const CorporateSecondary = React.lazy(() =>
  import("./Pages/Forms/Corporate/Register/CorporateSecondary")
);
const CorporateContactPersonnel = React.lazy(() =>
  import("./Pages/Forms/Corporate/Register/CorporateContactPersonnel")
);
const Authentication = React.lazy(() =>
  import("./Pages/Forms/Corporate/Register/Authentication")
);
const RegistrationCompleted = React.lazy(() =>
  import("./Pages/Forms/Corporate/Register/RegistrationCompleted")
);
const CorporatePayment = React.lazy(() =>
  import("./Pages/Forms/Corporate/Register/CorporatePayment")
);

const Dashboard = React.lazy(() => import("./Pages/DashBoard/Dashboard"));
const Profile = React.lazy(() => import("./Pages/Profile/ProfileMain"));
const Jobs = React.lazy(() => import("./Pages/Jobs/Jobs"));

const CampusDriveList = React.lazy(() => import("./Pages/Jobs/onCampusJobs"));

const DefineJobsMain = React.lazy(() => import("./Pages/CampusDrives/DefineJobs/DefineJobsMain"));
const Subscription = React.lazy(() => import("./Pages/Subscribe/Subscription"));

const Communication = React.lazy(() => import("./Pages/CampusDrives/Communication/Communication"));

const CampusInterviews = React.lazy(() => import("./Pages/CampusDrives/CampusInterviews/CampusInterviews"));

const OffCampusDriveCmp = React.lazy(() => import("./Pages/DashBoard/OffCampusDrive/OffCampusDriveCmp"));

const OffDefineJobs = React.lazy(() => import("./Pages/DashBoard/OffCampusDrive/OffDefineJobs/OffDefineJobs"));

const OffCommunication = React.lazy(() => import("./Pages/DashBoard/OffCampusDrive/OffCampusCommunication/OffCommunication"));

const OffCampusInterviews = React.lazy(() => import("./Pages/DashBoard/OffCampusDrive/OffCampusInterviews/Sections/OffCampusInterviews"));


const University = React.lazy(() =>
  import("./Pages/DashBoard/Subscribe/University/University")
);

const TransactionHistory = React.lazy(() =>
  import("./Pages/TransactionHistory/TransactionHistory")
);

const Notifications = React.lazy(() =>
  import("./Pages/DashBoard/Notifications/Notifications")
);
const Analytics = React.lazy(() => import("./Pages/Analytics/Analytics"));

const Requests = React.lazy(() => import("./Pages/Requests/Requests"));

const History = React.lazy(() => import("./Pages/TransactionHistory/History"));
const Support = React.lazy(() => import("./Pages/DashBoard/Support/Support"));
const TicketChatCmp = React.lazy(() =>
  import("./Pages/DashBoard/Support/TicketChatCmp")
);

const ForgotPassword = React.lazy(() =>
  import("./Pages/Forms/Corporate/ForgotPassword/ForgotPassword")
);


const OtherInformationHist = React.lazy(() =>
import("./Pages/DashBoard/Publish/OtherInformation/OtherInformationList")
);


const routes = [
  {
    path: "/",
    strict: true,
    exact: true,
    role: "corporate",
    name: "Login",
    component: <Login />,
  },
  {
    path: "/forgotPassword",
    strict: true,
    exact: true,
    role: "corporate",
    name: "forgotPassword",
    component: <ForgotPassword />,
  },
  {
    path: "/register",
    strict: true,
    exact: true,
    role: "corporate",
    name: "Register",
    component: <Register />,
  },
  {
    path: "/register/CorporateSecondary",
    strict: true,
    exact: true,
    role: "corporate",
    name: "CorporateSecondary",
    component: <CorporateSecondary />,
  },
  {
    path: "/register/contactPersonnel",
    strict: true,
    exact: true,
    role: "corporate",
    name: "CorporateContactPersonnel",
    component: <CorporateContactPersonnel />,
  },
  {
    path: "/register/authentication",
    strict: true,
    exact: true,
    role: "corporate",
    name: "Authentication",
    component: <Authentication />,
  },
  {
    path: "/register/completed",
    strict: true,
    exact: true,
    role: "corporate",
    name: "RegistrationCompleted",
    component: <RegistrationCompleted />,
  },
  {
    path: "/register/payment",
    strict: true,
    exact: true,
    role: "corporate",
    name: "CorporatePayment",
    component: <CorporatePayment />,
  },
 
  // DASHBOARD
  {
    path: "/dashboard",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Dashboard",
    component: <Dashboard />,
  },
  {
    path: "/profile",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Profile",
    component: <Profile />,
  },
  {
    path: "/jobs",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "jobs",
    component: <Jobs />,
  },
  //Campus Drives 
  
  {
    path: "/jobs/campus-drive",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "CampusDriveList",
    component: <CampusDriveList/>,
  },
  {
    path: "/jobs/:campusDriveId/define-jobs/:universityId",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "DefineJobs",
    component: <DefineJobsMain/>,
  },

  {
    path: "/jobs/:campusDriveId/communication/:universityId",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "communication",
    component: <Communication/>,
  },
  {
    path: "/jobs/:campusDriveId/interviews/:universityId",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "CampusInterviews",
    component: <CampusInterviews/>,
  },
  {
    path: "/dashboard/off-campus-drive",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "OffCampusDrive",
    component: <OffCampusDriveCmp/>,
  },
 
  {
    path: "/dashboard/off-campus-drive/:offCampusDriveId/off-define-jobs/:universityId",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "OffDefineJobs",
    component: <OffDefineJobs/>,
  },
  {
    path: "/dashboard/off-campus-drive/:offCampusDriveId/off-communication/:universityId",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "OffCommunication",
    component: <OffCommunication/>,
  },
{
  path: "/dashboard/off-campus-drive/:offCampusDriveId/off-campus-interviews/:universityId",
  strict: true,
  exact: true,
  role: "dashboard",
  name: "OffCampusInterviews",
  component: <OffCampusInterviews />,
},

  {
    path: "/dashboard/subscribe/newuniversity/:id",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "University",
    component: <University />,
  },
  {
    path: "subscription",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Subscription",
    component: <Subscription />,
  },
  {
    path: "/notifications",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Notifications",
    component: <Notifications />,
  },
  {
    path: "/requests",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Requests",
    component: <Requests />,
  },
  {
    path: "/analytics",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Analytics",
    component: <Analytics />,
  },
  {
    path: "/history",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "History",
    component: <History />,
  },

  {
    path: "/history/transactions",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Transaction History",
    component: <TransactionHistory />,
  },
  {
    path: "/support",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Support",
    component: <Support />,
  },
  {
    path: "/support/:ticketNo",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "Support",
    component: <TicketChatCmp />,
  },
  
  {
    path: "/history/OtherInformationHist",
    strict: true,
    exact: true,
    role: "dashboard",
    name: "OtherInformationHist",
    component: <OtherInformationHist />,
  },
];

export default routes;
