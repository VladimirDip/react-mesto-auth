import React from "react";

const Footer = () => {
  const getData = () => {
    const date = new Date();
    return date.getFullYear();
  };
  // console.log(getData());
  return (
    <>
      <footer className="footer page__footer">
        <p className="footer__title">© {getData()} Mesto Russia</p>
      </footer>
    </>
  );
};

export default Footer;
