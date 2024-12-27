import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setErrMsg("");
      } else {
        setErrMsg(data.message);
      }
    } catch (err) {
      setErrMsg("Server error");
    }
  };

  return (
    <div className="h-[650px] flex justify-center items-center">
      <section>
        <p>{errMsg}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="bg-white" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
