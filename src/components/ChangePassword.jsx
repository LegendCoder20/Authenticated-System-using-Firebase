import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
//
import {auth} from "./config/Firebase";
import {updatePassword} from "firebase/auth";

function ChangePassword() {
  const nav = useNavigate();

  useEffect(() => {
    let userName = localStorage.getItem("admin");
    if (userName) {
      setUserName(userName);
    } else {
      nav("/");
    }
  }, []);

  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const hPassword = (e) => {
    setPassword(e.target.value);
  };
  const hCPassword = (e) => {
    setCPassword(e.target.value);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      alert("Password and Confirm Password Doesn't Match!");
      return;
    }

    const user = auth.currentUser;

    if (user) {
      try {
        await updatePassword(user, password);
        alert(
          "Password changed successfully. Please Re-Login To your Account using New Password"
        );
        localStorage.removeItem("admin");
        nav("/");
      } catch (err) {
        console.log(err);
        alert("Failed to change password. Please try again");
      }
    } else {
      alert("No authenticated user found. Please log in again");
    }
  };

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change Password
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleUpdatePassword}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  minLength="6"
                  value={password}
                  onChange={hPassword}
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 placeholder-gray-400 ring-gray-300"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  required
                  minLength="6"
                  value={cpassword}
                  onChange={hCPassword}
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 placeholder-gray-400 ring-gray-300"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChangePassword;
