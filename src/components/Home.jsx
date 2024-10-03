import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import {auth} from "./config/Firebase";
import {signOut} from "firebase/auth";

function Home() {
  const nav = useNavigate();

  useEffect(() => {
    let userName = localStorage.getItem("admin");
    if (userName) {
      setName(userName);
    } else {
      nav("/");
    }
  }, []);

  const [name, setName] = useState("");

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        localStorage.removeItem("admin");
        setName("");
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="mt-4 mr-10 text-end ">
        <button
          onClick={handleSignOut}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2 px-4 rounded "
          type="submit"
        >
          Sign Out
        </button>
      </div>
      <div className="text-center mt-1 font-bold text-3xl">Home Page</div>
      <div className="text-center mt-14 font-bold text-6xl">Welcome {name}</div>
    </React.Fragment>
  );
}

export default Home;
