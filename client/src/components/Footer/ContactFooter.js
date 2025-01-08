import emailjs from "emailjs-com";
import { useState } from "react";

const ContactFooter = () => {
  let [email, setEmail] = useState("");
  let [wasSent, setWasSent] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await emailjs.send("service_bj8hrq4", "template_auuau19", { user_email: email }, "VakBFA1QLBGZOMeSo");
      setWasSent(true);
      setTimeout(() => {
        setWasSent(false);
      }, 3000);
      setEmail("");
      console.log("It worked!")
    } catch (error) {
      setTimeout(() => {
        setWasSent(false);
      }, 3000);
      console.log("Something went wrong :(");
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-red-700 to-black border-b border-white pt-10 pl-5 pb-10 flex justify-between max-sm:flex-col items-center">
      <section className="flex flex-col justify-start text-white pl-4">
        <h1 className="text-5xl pb-2">Stay Updated</h1>
        <p className="font-extralight">
          Sign up to be the first to find out when we add new movies, shows, and more.
          <br />
          We respect your privacy and will never share your information with any third-party vendors.
        </p>
      </section>
      <section className="flex flex-row mr-10 items-center max-sm:mt-5">
        <input placeholder="email" className="h-14 px-4 rounded-tl-xl rounded-bl-xl" value={email} onChange={handleChange} />
        <button className="bg-red-600 p-4 h-14 rounded-tr-xl rounded-br-xl font-bold text-white" onClick={handleSubmit}>
          Sign Up
        </button>
      </section>
    </div>
  );
};

export default ContactFooter;
