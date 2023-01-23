import React from "react";
import Logo from "../../images/logo.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={Logo} alt="Logo" className="logo" />
      <ul className="workouts">
        <form className="form hidden">
          <div className="form__row">
            <label className="form__label">Type</label>
            <select className="form__input form__input--type">
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
            </select>
          </div>
          <div className="form__row">
            <label className="form__label">Distance</label>
            <input
              className="form__input form__input--distance"
              placeholder="km"
            />
          </div>
          <div className="form__row">
            <label className="form__label">Duration</label>
            <input
              className="form__input form__input--duration"
              placeholder="min"
            />
          </div>
          <div className="form__row">
            <label className="form__label">Cadence</label>
            <input
              className="form__input form__input--cadence"
              placeholder="step/min"
            />
          </div>
          <div className="form__row form__row--hidden">
            <label className="form__label">Elev Gain</label>
            <input
              className="form__input form__input--elevation"
              placeholder="meters"
            />
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
