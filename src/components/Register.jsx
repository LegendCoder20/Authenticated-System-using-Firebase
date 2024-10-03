import React, {useState, useRef, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
//
import {db, auth} from "./config/Firebase";
import {ref, set} from "firebase/database";
import {createUserWithEmailAndPassword} from "firebase/auth";

function Register() {
  const rName = useRef();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  //
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hName = (e) => {
    setName(e.target.value);
  };
  const hEmail = (e) => {
    setEmail(e.target.value);
  };
  const hPassword = (e) => {
    setPassword(e.target.value);
  };
  const hCPassword = (e) => {
    setCPassword(e.target.value);
  };

  //

  const register = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      alert("Password and Confirm Password Doesn't Match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const data = {name, email};
        const node = `${name}_${new Date().toString()}`;
        const refDatabase = ref(db, `register/${node}`);
        set(refDatabase, data);
        localStorage.setItem("admin", name);
        alert("Registered Successfully");
        nav("/home");
      })
      .catch((err) => {
        setErrorVisible(true);
        setErrorMessage("Email Already Exists");
        setTimeout(() => {
          setErrorVisible(false);
          setErrorMessage("");
        }, 4000);
      });
  };

  return (
    <React.Fragment>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={register}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-e-0 rounded-s-md dark:text-gray-400 -gray-600">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={name}
                  onChange={hName}
                  ref={rName}
                  className="rounded-none bg-gray-50 border text-gray-900 text-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 placeholder-gray-400 ring-gray-300"
                  placeholder="eg. Aryan Manjarekar"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={hEmail}
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 placeholder-gray-400 ring-gray-300"
                  required
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
                Register
              </button>
            </div>
          </form>
          <Link to="/">
            <p className="mt-5 text-center text-sm text-gray-500">
              Existing User? Login Here
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

export default Register;
