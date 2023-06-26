import React from "react";


const Login = React.lazy(() => import("./Pages/Formss/Corporate/Login"));

const Register = React.lazy(() =>
  import("./Pages/Formss/Corporate/Register/Register")
);

const CorporateSecondary = React.lazy(() =>
  import("./Pages/Formss/Corporate/Register/CorporateSecondary")
);



const CorporateContactPersonnel = React.lazy(() =>
  import("./Pages/Formss/Corporate/Register/CorporateContactPersonnel")
);

const Authentication = React.lazy(() =>
  import("./Pages/Formss/Corporate/Register/Authentication")
);

const RegistrationCompleted = React.lazy(() =>
  import("./Pages/Formss/Corporate/Register/RegistrationCompleted")
);


const CorporatePayment = React.lazy(() =>
  import("./Pages/Formss/Corporate/Register/CorporatePayment")
);


// const Payment = React.lazy(() => import("./Pages/Forms/Payment/"));
// const StudentRegister = React.lazy(() =>
//   import("./Pages/Forms/Student/StudentRegister")
// );
// const StudentSecondary = React.lazy(() =>
//   import("./Pages/Forms/Student/StudentSecondary")
// );
// const StudentAuthentication = React.lazy(() =>
//   import("./Pages/Forms/Student/StudentAuthentication")
// );
// const StudentRegCompleted = React.lazy(() =>
//   import("./Pages/Forms/Student/StudentRegCompleted")
// );
// const StudentPayment = React.lazy(() =>
//   import("./Pages/Forms/Student/StudentPayment")
// );

const Dashboard = React.lazy(() => import("./Pages/DashBoard/Dashboard"));
const Profile = React.lazy(() => import("./Pages/Profile/ProfileMain"));
const Jobs = React.lazy(() => import("./Pages/Jobs/Jobs"));

// const HiringCriteria = React.lazy(() =>
//   import("./Pages/Dashboard/CreateJob/HiringCriteria/index")
// );
// const Jobs = React.lazy(() => import("./Pages/Dashboard/CreateJob/Jobs/Jobs"));
// const NewJob = React.lazy(() => import('./Pages/Dashboard/CreateJob/Jobs/NewJob'));
// const PublishProfile = React.lazy(() =>
//   import("./Pages/Dashboard/Publish/PublishProfile")
// );
// const PublishOtherInformation = React.lazy(() =>
//   import("./Pages/Dashboard/Publish/OtherInformation/PublishOtherInformation")
// );
// const PublishHiringCriteria = React.lazy(() =>
//   import("./Pages/Dashboard/Publish/HiringCriteria/PublishHiringCriteria")
// );
// const PublishJobs = React.lazy(() =>
//   import("./Pages/Dashboard/Publish/Jobs/PublishJobs")
// );
// const PublishHistory = React.lazy(() =>
//   import("./Pages/Dashboard/Publish/PublishHistory/PublishHistory")
// );

const Subscription = React.lazy(() =>
  import("./Pages/Subscribe/Subscription")
);
// const NewUniversity = React.lazy(() =>
//   import("./Pages/Dashboard/Subscribe/NewUniversity/NewUniversity")
// );
const University = React.lazy(() =>
  import("./Pages/DashBoard/Subscribe/University/University")
);

const TransactionHistory =React.lazy(() =>
import("./Pages/TransactionHistory/TransactionHistory"));

const Notifications = React.lazy(() =>
  import("./Pages/DashBoard/Notifications/Notifications")
);
const Analytics = React.lazy(() =>
  import("./Pages/Analytics/Analytics"));

const Requests = React.lazy(() =>
  import("./Pages/Requests/Requests"));

// const CampusDriveList = React.lazy(() => import("./Pages/Dashboard/CampusDrive/CampusDriveList"));
// const CampusDrive = React.lazy(() => import("./Pages/Dashboard/CampusDrive/CampusDrive"));
// const DefineJobs = React.lazy(() => import("./Pages/Dashboard/CampusDrive/DefineJobs/DefineJobs"));
// const Communication = React.lazy(() => import("./Pages/Dashboard/CampusDrive/Communication/Communication"));
// const CampusInterviews = React.lazy(() => import("./Pages/Dashboard/CampusDrive/CampusInterviews/CampusInterviews"));
// const OffCampusDrive = React.lazy(() => import("./Pages/Dashboard/OffCampusDrive/OffCampusDrive"))
// const OffCampusDriveHomePage = React.lazy(() => import("./Pages/Dashboard/OffCampusDrive/OffCampusDriveHomePage"))
// const OffDefineJobs = React.lazy(() => import("./Pages/Dashboard/OffCampusDrive/OffDefineJobs/OffDefineJobs"))
// const OffCommunication = React.lazy(() => import("./Pages/Dashboard/OffCampusDrive/OffCommunication/OffCommunication"))
// const OffCampusInterviews = React.lazy(() => import("./Pages/Dashboard/OffCampusDrive/OffCampusInterviews/OffCampusInterviews"))
const History = React.lazy(() => import("./Pages/TransactionHistory/History"));
 const Support = React.lazy(() => import("./Pages/DashBoard/Support/Support"));
 const TicketChatCmp = React.lazy(() => import('./Pages/DashBoard/Support/TicketChatCmp'));
// const UniversityStudents = React.lazy(() => import("./Pages/Dashboard/Subscribe/University/UniversityStudents/UniversityStudents"));
const ForgotPassword = React.lazy(() => import("./Pages/Formss/Corporate/ForgotPassword/ForgotPassword"));
const Mike = React.lazy(() => import("./Pages/Formss/Corporate/Login/LoginForm"));


const routes = [


  {
    path: "/",
    strict: true,
    exact: true,
    role: "corporateReg",
    name: "Login",
    component: <Login />,
  },
  {
    path: "/forgotPassword",
    strict: true,
    exact: true,
    role: "corporateReg",
    name: "forgotPassword",
    component: <ForgotPassword />,
  },
  {
    path: "/register",
    strict: true,
    exact: true,
    role: "corporateReg",
    name: "Register",
    component: <Register />,
  },
  {
    path: "/register/CorporateSecondary",
    strict: true,
    exact: true,
    role: "corporateReg",
    name: "CorporateSecondary",
    component: <CorporateSecondary />,
  },
  {
    path: "/register/contactPersonnel",
    strict: true,
    exact: true,
    role: "corporateReg",
    name: "CorporateContactPersonnel",
    component: <CorporateContactPersonnel />,
  },
  {
    path: "/register/authentication",
    strict: true,
    exact: true,
    role: "corporateReg",
    name: "Authentication",
    component: <Authentication />,
  },
  {
    path: "/register/completed",
    strict: true,
    exact: true,
    role: "corporateReg",
    name: "RegistrationCompleted",
    component: <RegistrationCompleted />,
  },
  {
    path: "/register/payment",
    strict: true,
    exact: true,
    role: "corporateReg",
    name: "CorporatePayment",
    component: <CorporatePayment />,
  },
  {
    path: "/myl",
    strict: true,
    exact: true,
    role: "corporateReg",
    name: "Login",
    component: <Mike />,
  },
  //   {
  //     path: "/payment",
  //     strict: true,
  //     exact: true,
  //     role: "corporate",
  //     name: "Payment",
  //     component: <Payment/>,
  //   },
  //   {
  //     path: "/register/studentRegister",
  //     strict: true,
  //     exact: true,
  //     role: "corporateReg",
  //     name: "StudentRegister",
  //     component: <StudentRegister/>,
  //   },
  //   {
  //     path: "/register/studentSecondary",
  //     strict: true,
  //     exact: true,
  //     role: "corporateReg",
  //     name: "StudentSecondary",
  //     component: <StudentSecondary/>,
  //   },
  //   {
  //     path: "/register/studentAuthentication",
  //     strict: true,
  //     exact: true,
  //     role: "corporateReg",
  //     name: "StudentAuthentication",
  //     component: <StudentAuthentication/>,
  //   },
  //   {
  //     path: "/register/studentRegisterCompleted",
  //     strict: true,
  //     exact: true,
  //     role: "corporateReg",
  //     name: "StudentRegCompleted",
  //     component: <StudentRegCompleted/>,
  //   },
  //   {
  //     path: "/register/studentPayment",
  //     strict: true,
  //     exact: true,
  //     role: "corporateReg",
  //     name: "StudentPayment",
  //     component: <StudentPayment/>,
  //   },

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
    path:"/jobs",
    strict:true,
    role:"dashboard",
    name:"jobs",
    component: <Jobs/>
  },
  //   {
  //     path: "/dashboard/createjob/hiring",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "HiringCriteria",
  //     component: <HiringCriteria/>,
  //   },
  //   {
  //     path: "/dashboard/createjob/jobs",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "Jobs",
  //     component: <NewJob/>,
  //   },
  //   {
  //     path: "/dashboard/publish/profile",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "Publish Profile",
  //     component: <PublishProfile/>,
  //   },
  //   {
  //     path: "/dashboard/publish/otherinformation",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "Publish Other Information",
  //     component: <PublishOtherInformation/>,
  //   },
  //   {
  //     path: "/dashboard/publish/hiring-criteria",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "Publish Hiring Criteria",
  //     component: <PublishHiringCriteria/>,
  //   },
  //   {
  //     path: "/dashboard/publish/jobs",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "Publish Jobs",
  //     component: <PublishJobs/>,
  //   },
  //   {
  //     path: "/dashboard/publish-history",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "Publish History",
  //     component: <PublishHistory/>,
  //   },
  //   {
  //     path: "/dashboard/subscribe/newuniversity",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "NewUniversity",
  //     component: <NewUniversity/>,
  //   },
    {
      path: "/dashboard/subscribe/newuniversity/:id",
      strict: true,
      exact: true,
      role: "dashboard",
      name: "University",
      component:<University/>,
    },
  //   {
  //     path: "/dashboard/subscribe/students/:id",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "University",
  //     component: <UniversityStudents/>,
  //   },
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
  //   {
  //     path: "/dashboard/campus-drive",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "CampusDriveList",
  //     component: <CampusDriveList/>,
  //   },
  //   {
  //     path: "/dashboard/campus-drive/:campusDriveId/home/:universityId",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "CampusDrive",
  //     component: <CampusDrive/>,
  //   },
  //   {
  //     path: "/dashboard/campus-drive/:campusDriveId/define-jobs/:universityId",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "DefineJobs",
  //     component: <DefineJobs/>,
  //   },
  //   {
  //     path: "/dashboard/campus-drive/:campusDriveId/communication/:universityId",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "Communication",
  //     component: <Communication/>,
  //   },
  //   {
  //     path: "/dashboard/campus-drive/:campusDriveId/campus-interviews/:universityId",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "CampusInterviews",
  //     component: <CampusInterviews/>,
  //   },
  //   {
  //     path: "/dashboard/off-campus-drive",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "OffCampusDrive",
  //     component: <OffCampusDrive/>,
  //   },
  //   {
  //     path: "/dashboard/off-campus-drive/:offCampusDriveId/home/:universityId",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "OffCampusDriveHomePage",
  //     component: <OffCampusDriveHomePage/>,
  //   },
  //   {
  //     path: "/dashboard/off-campus-drive/:offCampusDriveId/off-define-jobs/:universityId",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "OffDefineJobs",
  //     component: <OffDefineJobs/>,
  //   },
  //   {
  //     path: "/dashboard/off-campus-drive/:offCampusDriveId/off-communication/:universityId",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "OffCommunication",
  //     component: <OffCommunication/>,
  //   },
  //   {
  //     path: "/dashboard/off-campus-drive/:offCampusDriveId/off-campus-interviews/:universityId",
  //     strict: true,
  //     exact: true,
  //     role: "dashboard",
  //     name: "OffCampusInterviews",
  //     component: <OffCampusInterviews/>,
  //   },
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
    component: <History/>,
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
    name: 'Support',
    component: <TicketChatCmp />
  },
];



export default routes;
