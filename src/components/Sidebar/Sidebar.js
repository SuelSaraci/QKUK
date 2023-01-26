import React from "react";
import Logo from "../../images/logo.png";
import SearchInput from "../SearchBar/Search";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={Logo} alt="Logo" className="logo" />
      <ul className="workouts">
        <form className="form ">
          <div className="form__row">
            <SearchInput />
          </div>

          <button className="form__btn">OK</button>
        </form>
      </ul>
      <p className="copyright">
        © Copyright by{" "}
        <a
          className="twitter-link"
          href="https://www.linkedin.com/in/suel-s-a37624171/"
        >
          Suel Saraçi
        </a>{" "}
        and{" "}
        <a
          className="twitter-link"
          href="https://www.linkedin.com/in/berat-ademi1/"
        >
          Berat Ademi
        </a>
      </p>
    </div>
  );
}

export default Sidebar;
