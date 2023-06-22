const ContactFooter = () => {
  return (
    <div className="bg-[#2C2E43] border-b border-yellow-400 pt-32 pl-5 pb-10 flex justify-between max-sm:flex-col items-center">
      <section className="flex flex-col justify-start text-white pl-4">
        <h1 className="text-5xl pb-2" style={{ fontFamily: "Bruno Ace SC" }}>
          Stay Updated
        </h1>
        <p className="font-extralight">
          Sign up to be the first to find out when we add new classes, amenities, and more.
          <br />
          We respect your privacy and will never share your information with any third-party vendors.
        </p>
      </section>
      <section className="flex flex-row mr-10 items-center max-sm:mt-5">
        <input style={{ fontFamily: "Bruno Ace SC" }} placeholder="email" className="h-14 px-4 mr-2" />
        <button className="bg-yellow-400 p-4 h-14" style={{ fontFamily: "Bruno Ace SC" }}>
          Sign Up
        </button>
      </section>
    </div>
  );
};

export default ContactFooter;
