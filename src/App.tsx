import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import type React from "react";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Singup from "./components/Singup";
import Createbrain from "./components/CreatebrainItem";
import Myprofile from "./components/Myprofile";
import Aboutdev from "./components/Aboutdev";
import About from "./components/Aboutus";
import Usage from "./components/Usage";
import Contact from "./components/Contactus";
import Mybrain from "./components/Mybrain";
import BrainItem from "./components/BrainItem";
import Sharedbrain from "./components/Sharedbrain";

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
