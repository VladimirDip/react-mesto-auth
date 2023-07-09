import React, { useState } from "react";
import logo from "../../images/Logo.svg";
import burgerOpened from "../../images/CloseIcon.svg";
import burgerClosed from "../../images/Burger.svg";

const Header = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <>
      <header className="header page__header">
        <div className="header__container">
          <img className="header__logo" src={logo} alt="Логотип" />
          <button
            onClick={() => setMenuIsOpen((prev) => !prev)}
            className="navBar__menu-btn"
          >
            {menuIsOpen ? (
              <img src={burgerOpened} alt="" />
            ) : (
              <img src={burgerClosed} alt="" />
            )}
          </button>
        </div>
        {React.cloneElement(children, { menuIsOpen: menuIsOpen })}
      </header>
    </>
  );
};

export default Header;
