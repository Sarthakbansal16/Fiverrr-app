import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // const currentUser = null

  return (
    <div className={active? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          {/* <Link className="link" to="/"> */}
            <span className="text">Fiverr</span>
          {/* </Link> */}
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sign in</span>
          <span>Become a Seller</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
