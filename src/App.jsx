
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BloomLoader from "./components/BloomLoader";
import BloomInfo from "./pages/BloomInfo";
import WhyBloom from "./components/WhyBloom";
import OnboardingFlow from "./features/onboarding/OnboardingFlow";
import FaceVerification from "./features/onboarding/FaceVerification";
import InfoUploadForm from "./features/onboarding/InfoUploadForm";

// import PaymentStep from "./features/onboarding/PaymentStep";
import WelcomeScreen from "./features/onboarding/WelcomeScreen";
// import ProceedToPayment from "./components/payments/ProceedToPayment";
// import CardPayment from "./components/payments/CardPayment";
// import BankTransfer from "./components/payments/BankTransfer";
// import GhanaPayment from "./components/payments/GhanaPayment";
// import KenyaPayment from "./components/payments/KenyaPayment";
// import PaypalPayment from "./components/payments/PaypalPayment";
// import CryptoPayment from "./components/payments/CryptoPayment";

// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import Footer from "./components/Footer";
import PrivacyModal from "./components/PrivacyModal";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import LoginModal from "./components/LoginModal";
import Notifications from "./pages/Notifications";

import ChatPagetherapy from "./pages/ChatPagetherapy";
import TherapyPage from "./pages/TherapyPage";

import Privacy1 from "./pages/Privacy1";
import Terms from "./pages/Terms";
import ForgotPassword from "./pages/ForgotPassword";
import ScrollToTop from "./components/ScrollToTop";
import Pending from "./pages/Pending";



import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {/* Loader */}
      {loading && <BloomLoader totalDuration={1800} onFinish={() => setLoading(false)} />}

      <div className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
       
       <ScrollToTop /> 
        <Routes>
          {/* BloomInfo */}
          <Route path="/" element={<BloomInfo />} />
          <Route path="/bloominfo" element={<BloomInfo />} /> {/* optional extra URL */}

          {/* Other standalone pages */}
          <Route path="/whyBloom" element={<WhyBloom />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route path="/face" element={<FaceVerification />} />
          <Route path="/info" element={<InfoUploadForm />} />
        <Route path="/privacy1" element={<Privacy1 />} />
        <Route path="/terms" element={<Terms />} />

{/* 
          <Route path="/payment" element={<PaymentStep />} /> */}
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/login" element={<LoginModal />} />
          {/* <Route path="/proceed-to-payment" element={<ProceedToPayment />} />
          <Route path="/card-payment" element={<CardPayment />} />
          <Route path="/bank-transfer" element={<BankTransfer />} />
          <Route path="/ghana-payment" element={<GhanaPayment />} />
          <Route path="/kenya-payment" element={<KenyaPayment />} />
          <Route path="/paypal-payment" element={<PaypalPayment />} />
          <Route path="/crypto-payment" element={<CryptoPayment />} /> */}

          {/* Admin */}
          {/* <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          /> */}
<Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/therapy" element={<TherapyPage />} />
           <Route path="/chat-therapy" element={<ChatPagetherapy />} />


          {/* Notifications */}
          <Route path="/notifications" element={<Notifications />} />

          {/* Nested Layout for main app pages */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat/:userId" element={<Chat />} />

            <Route path="/chat" element={<Chat />} />                  {/* General chat */}
  <Route path="/chat/:otherUserId" element={<Chat />} /> 
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>

        <Footer />
        <PrivacyModal />
      </div>
    </div>
  );
}

export default App;




























// frist working code 




// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import BloomLoader from "./components/BloomLoader";
// import BloomInfo from "./pages/BloomInfo";
// import WhyBloom from "./components/WhyBloom";
// import OnboardingFlow from "./features/onboarding/OnboardingFlow";
// import FaceVerification from "./features/onboarding/FaceVerification";
// import InfoUploadForm from "./features/onboarding/InfoUploadForm";

// // import PaymentStep from "./features/onboarding/PaymentStep";
// import WelcomeScreen from "./features/onboarding/WelcomeScreen";
// // import ProceedToPayment from "./components/payments/ProceedToPayment";
// // import CardPayment from "./components/payments/CardPayment";
// // import BankTransfer from "./components/payments/BankTransfer";
// // import GhanaPayment from "./components/payments/GhanaPayment";
// // import KenyaPayment from "./components/payments/KenyaPayment";
// // import PaypalPayment from "./components/payments/PaypalPayment";
// // import CryptoPayment from "./components/payments/CryptoPayment";

// // import AdminLogin from "./pages/AdminLogin";
// // import AdminDashboard from "./pages/AdminDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Footer from "./components/Footer";
// import PrivacyModal from "./components/PrivacyModal";

// import Home from "./pages/Home";
// import Chat from "./pages/Chat";
// import Profile from "./pages/Profile";
// import Discover from "./pages/Discover";
// import Settings from "./pages/Settings";
// import Layout from "./components/Layout";
// import LoginModal from "./components/LoginModal";
// import Notifications from "./pages/Notifications";

// import ChatPagetherapy from "./pages/ChatPagetherapy";
// import TherapyPage from "./pages/TherapyPage";

// import Privacy1 from "./pages/Privacy1";
// import Terms from "./pages/Terms";
// import ForgotPassword from "./pages/ForgotPassword";
// import ScrollToTop from "./components/ScrollToTop";



// import "./App.css";

// function App() {
//   const [loading, setLoading] = useState(true);

//   return (
//     <div>
//       {/* Loader */}
//       {loading && <BloomLoader totalDuration={1800} onFinish={() => setLoading(false)} />}

//       <div className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
       
//        <ScrollToTop /> 
//         <Routes>
//           {/* BloomInfo */}
//           <Route path="/" element={<BloomInfo />} />
//           <Route path="/bloominfo" element={<BloomInfo />} /> {/* optional extra URL */}

//           {/* Other standalone pages */}
//           <Route path="/whyBloom" element={<WhyBloom />} />
//           <Route path="/onboarding" element={<OnboardingFlow />} />
//           <Route path="/face" element={<FaceVerification />} />
//           <Route path="/info" element={<InfoUploadForm />} />
//         <Route path="/privacy1" element={<Privacy1 />} />
//         <Route path="/terms" element={<Terms />} />

// {/* 
//           <Route path="/payment" element={<PaymentStep />} /> */}
//           <Route path="/welcome" element={<WelcomeScreen />} />
//           <Route path="/login" element={<LoginModal />} />
//           {/* <Route path="/proceed-to-payment" element={<ProceedToPayment />} />
//           <Route path="/card-payment" element={<CardPayment />} />
//           <Route path="/bank-transfer" element={<BankTransfer />} />
//           <Route path="/ghana-payment" element={<GhanaPayment />} />
//           <Route path="/kenya-payment" element={<KenyaPayment />} />
//           <Route path="/paypal-payment" element={<PaypalPayment />} />
//           <Route path="/crypto-payment" element={<CryptoPayment />} /> */}

//           {/* Admin */}
//           {/* <Route path="/admin-login" element={<AdminLogin />} />
//           <Route
//             path="/admin-dashboard"
//             element={
//               <ProtectedRoute>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           /> */}
// <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/therapy" element={<TherapyPage />} />
//            <Route path="/chat-therapy" element={<ChatPagetherapy />} />


//           {/* Notifications */}
//           <Route path="/notifications" element={<Notifications />} />

//           {/* Nested Layout for main app pages */}
//           <Route element={<Layout />}>
//             <Route path="/home" element={<Home />} />
//             <Route path="/chat/:userId" element={<Chat />} />

//             <Route path="/chat" element={<Chat />} />                  {/* General chat */}
//   <Route path="/chat/:otherUserId" element={<Chat />} /> 
//             <Route path="/profile/:id" element={<Profile />} />
//             <Route path="/discover" element={<Discover />} />
//             <Route path="/settings" element={<Settings />} />
//           </Route>
//         </Routes>

//         <Footer />
//         <PrivacyModal />
//       </div>
//     </div>
//   );
// }

// export default App;