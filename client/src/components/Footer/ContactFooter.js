import emailjs from "emailjs-com";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

const ContactFooter = () => {
  let [email, setEmail] = useState("");
  let [wasSent, setWasSent] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await emailjs.send("service_bj8hrq4", "template_auuau19", { user_email: email }, "VakBFA1QLBGZOMeSo");
      setWasSent(true);
      setTimeout(() => {
        setWasSent(false);
        setIsLoading(false);
      }, 3000);
      setEmail("");
    } catch (error) {
      setTimeout(() => {
        setWasSent(false);
      }, 3000);
      console.log("Something went wrong :(");
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-900 via-red-700 to-red-900 border-b border-white py-10 pl-5 flex justify-between max-sm:flex-col items-center">
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
        <button className={`${wasSent ? "bg-green-600" : "bg-red-600"} relative min-w-[100px] p-4 h-14 rounded-tr-xl rounded-br-xl font-bold text-white`} onClick={handleSubmit}>
          {wasSent ? (
            "Sent!"
          ) : isLoading ? (
            <div className="absolute left-[32px] top-[-26px]">
              <LoadingSpinner color="slate" size="small" />
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </section>
    </div>
  );
};

export default ContactFooter;
