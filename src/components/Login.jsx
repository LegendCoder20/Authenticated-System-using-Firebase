import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
//
import {db} from "./config/Firebase";
import {auth} from "./config/Firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {ref, get, query, orderByChild, equalTo} from "firebase/database";

function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hEmail = (e) => {
    setEmail(e.target.value);
  };
  const hPassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const emailQuery = query(
        ref(db, "register"),
        orderByChild("email"),
        equalTo(email)
      );

      const getEmail = await get(emailQuery);

      if (getEmail.exists()) {
        const userData = getEmail.val();
        const userKey = Object.keys(userData)[0];
        var name = userData[userKey].name;
      } else {
        console.log("No Such Email Exists");
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          localStorage.setItem("admin", name);
          nav("/home");
        })
        .catch((err) => {
          setErrorVisible(true);
          setErrorMessage("Invalid Credentials");
          setTimeout(() => {
            setErrorVisible(false);
            setErrorMessage("");
          }, 4000);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={hEmail}
                  className="bg-gray-50 border  text-gray-900 text-sm  rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 placeholder-gray-400 ring-gray-300"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgotpassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={hPassword}
                  className="bg-gray-50 border  text-gray-900 text-sm  rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 placeholder-gray-400 ring-gray-300"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
          <Link to="/register">
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member? Register here
            </p>
          </Link>
          {/*  */}
          {errorVisible && (
            <div className="fixed top-4 right-4 z-[1000] transform transition-all duration-500 ease-in-out opacity-100">
              <div
                className="flex items-center w-full max-w-xs p-2 space-x-3 bg-red-600 border border-red-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                role="alert"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                  <svg
                    className="w-5 h-5 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="pl-2 text-sm font-medium">{errorMessage}</div>
              </div>
            </div>
          )}
          {/*  */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
