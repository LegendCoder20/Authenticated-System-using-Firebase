import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
//
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
//
import ContactMe from "./components/ContactMe";
//
import NotFoundPage from "./components/NotFoundPage";
//
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/forgotpassword"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route
            path="/changepassword"
            element={<ChangePassword></ChangePassword>}
          ></Route>

          {/*  */}
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/aboutme" element={<AboutUs></AboutUs>}></Route>
          {/*  */}
          <Route path="/contactme" element={<ContactMe></ContactMe>}></Route>
          {/*  */}
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          {/*  */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
