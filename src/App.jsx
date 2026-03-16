import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./pages/Hero"
import About from "./pages/About"
import Contact from "./pages/Contact.jsx"
import Login from "./pages/Login"
import Register from "./pages/Register";
import RequestDemo from "./pages/RequestDemo";
import TechnicalSpec from "./pages/TechnicalSpec";
import AnalogMeasurement from "./pages/AnalogMeasurement";
import DR from "./pages/DR";
import Events from "./pages/Events";
import Services from "./pages/Services";
import ModbusControlPanel from "./pages/ModbusControlPanel";
import ChatBot from "./pages/ChatBot";
import PageNotFound from "./pages/PageNotFound"
import Digital_inputs from "./pages/Digital_inputs";
import BinaryI from "./pages/Binary-input";
import IntegratedDashboard from './pages/ModbusControlPanel';
// import HistoryDownload from "./pages/HistoryDownload.jsx";
import Adminrelay from "./admin/Relay.jsx";
import Adminlogin from "./admin/Adminlogin.jsx";
import Userdatailrelay from "./admin/Userrelay_detail.jsx"
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="">
         <ChatBot />

        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/request-demo" element={<RequestDemo />} />
            <Route path="/technical-specifications" element={<TechnicalSpec />} />
            <Route path="/analog-data" element={<AnalogMeasurement />} />
            {/* <Route path="/history" element={<HistoryDownload />} /> */}
            <Route path="/dr" element={<DR />} />
            <Route path="/events" element={<Events />} />
            <Route path="/digital-inputs" element={<Digital_inputs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/relay" element={<IntegratedDashboard />} />
            <Route path="/binary-input" element={<BinaryI/>}/>
            <Route path="/admin-relay" element={<Adminrelay/>}/>
            <Route path="/admin-login" element={<Adminlogin/>}/>
            <Route path="/admin-relaydetail" element={<Userdatailrelay/>}/>
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="" element={<BinaryI/>}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;