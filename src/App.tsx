import type React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./components/Layout";

import Createbrain from "./components/BrainComponent/CreatebrainItem";
import Mybrain from "./components/BrainComponent/Mybrain";
import BrainItem from "./components/BrainComponent/BrainItem";
import Sharedbrain from "./components/BrainComponent/Sharedbrain";

import Login from "./components/UserComponent/Login";
import Singup from "./components/UserComponent/Singup";
import Myprofile from "./components/UserComponent/Myprofile";

import Aboutdev from "./components/UiDetailedComponent/Aboutdev";
import About from "./components/UiDetailedComponent/Aboutus";
import Usage from "./components/UiDetailedComponent/Usage";
import Contact from "./components/UiDetailedComponent/Contactus";

import Home from "./components/Home";


function App(): React.ReactElement {
    return (
        <Router>
            <AnimatePresence mode="wait">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Singup />} />
                        <Route path="/create-brain" element={<Createbrain />} />
                        <Route path="/my-profile" element={<Myprofile />} />
                        <Route path="/about-dev" element={<Aboutdev />} />
                        <Route path="/about-brain" element={<About />} />
                        <Route path="/how-to-use" element={<Usage />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/my-brain" element={<Mybrain />} />
                        <Route
                            path="/my-brain/:brainId"
                            element={<BrainItem />}
                        />
                        <Route
                            path="/share/:brainId"
                            element={<Sharedbrain />}
                        />
                    </Route>
                </Routes>
            </AnimatePresence>
        </Router>
    );
}

export default App;
