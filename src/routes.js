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

const Subscription = React.lazy(() =>
  import("./Pages/Subscribe/Subscription")
);

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

const History = React.lazy(() => import("./Pages/TransactionHistory/History"));

 const Support = React.lazy(() => import("./Pages/DashBoard/Support/Support"));

 const TicketChatCmp = React.lazy(() => import('./Pages/DashBoard/Support/TicketChatCmp'));

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
    {
      path: "/dashboard/subscribe/newuniversity/:id",
      strict: true,
      exact: true,
      role: "dashboard",
      name: "University",
      component:<University/>,
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
