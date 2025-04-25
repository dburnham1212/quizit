import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./components/pages/SigninPage";
import Navbar from "./components/navbar/Navbar";
import RegisterPage from "./components/pages/RegisterPage";
import HomePage from "./components/pages/HomePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<SigninPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
