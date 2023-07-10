import { useRef, useState, useEffect } from "react";

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //   useEffect(() => {
  //     useRef.current.focus();
  //   }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <section className="bg-red-400 w-3/6">
      <p ref={errRef} className={errMsg ? "errmsg" : "hidden"} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Sign Up</h1>
      <form className="">
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} />
          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hidden"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hidden" : "invalid"} />
          <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "hidden"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} />
          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hidden"} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : "invalid"} />
          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hidden"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special character.
            <br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
