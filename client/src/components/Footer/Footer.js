import React from "react";
// import Logo from "../../images/Logo.png";
import ContactFooter from "./ContactFooter";
import FooterSection from "./FooterSection";
import { useAuth } from "../AuthContext";

const Footer = () => {
  return (
    <>
      <ContactFooter />
      <footer className="bg-gradient-to-r from-black via-red-700 to-black flex flex-wrap justify-between max-sm:justify-center items-center pl-5 py-5">
        <section className="flex flex-row max-md:flex-row max-md:mb-10">
          <FooterSection header="Discover" item1="Home" item1link="/" item2="Message Board" item2link="/messages" item3="Profile" item3link="/profile" item4="Create Account" item4link="/signup" item5="Login" item5link="/login" />
          <FooterSection header="Contact" item2="(555)-555-5555" />
        </section>
        <div className="flex flex-col items-center mr-10">
          <h1 className="header-font text-white text-5xl mt-1">MyMovieSpace</h1>
        </div>
      </footer>
    </>
  );
};

export default Footer;
