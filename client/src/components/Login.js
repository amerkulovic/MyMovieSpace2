import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Toast from "./Toast";

const Login = ({ onLogin }) => {
  const { login, success, setSuccess } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, setSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(username, password);
    if (result.success) {
      setErrMsg("");
      navigate("/");
      onLogin();
    } else {
      setErrMsg(result.message);
    }
  };

  return (
    <div className="h-[650px] flex justify-center items-center w-full">
      <section className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 w-1/3 max-xl:w-1/2 max-md:w-10/12 p-3">
        <p>{errMsg}</p>
        <h1 className="movie-header text-5xl pb-5">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="my-4 pb-5">
            <label className="text-white" htmlFor="username">
              Username:
            </label>
            <input className="w-full rounded-lg p-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="my-4 pb-5">
            <label className="text-white" htmlFor="username">
              Password:
            </label>
            <input className="w-full rounded-lg p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="bg-red-800 movie-header text-2xl py-3 rounded-lg mb-10 w-full border border-white" type="submit">
            Login
          </button>
          <p className="font-light text-white">
            Don't have an account?
            <br />
            <Link to="/signup">
              <span>
                <p className="underline">Sign Up</p>
              </span>
            </Link>
          </p>
        </form>
      </section>
      {success && <Toast message={"Signed up successfully"} />}
    </div>
  );
};

export default Login;
