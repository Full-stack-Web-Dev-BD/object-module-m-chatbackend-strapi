import React, { useEffect, useState } from "react";
import ChatShell from "./chatshell/ChatShell";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import axios from "axios";

const index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // use effect
  useEffect(() => {
    if (window.localStorage.getItem("chatapptoken")) {
      let token = window.localStorage.getItem("chatapptoken");
      let decoded = jwtDecode(token);
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div>
      {isAuthenticated ? (
        <ChatShell />
      ) : (
        <div className="text-center">
          <h2 className="text-center text-warning mt-8 pt-5">
            You are Not Logged in , Please Login to see this page !
          </h2>
          <div className=" mt-8 ">
            <Link href="/">
              <a className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go to Login Page
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
