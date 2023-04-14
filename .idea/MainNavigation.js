import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>AndalaGPT</div>
      </Link>
      <nav>
        <ul>
          {localStorage.getItem("isLogin") == true ? null : (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button
              onClick={() => {
                toast.success("Loged out successfully.", {
                  style: {
                    border: "3px solid #dbf64d",
                    padding: "10px",
                    color: "black",
                  },
                  iconTheme: {
                    primary: "#dbf64d",
                    secondary: "#FFFAEE",
                  },
                });
                localStorage.setItem("isLogin", false);
                console.log(localStorage.getItem("isLogin"));
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
