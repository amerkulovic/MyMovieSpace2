import { useRef, useState, useEffect } from "react";

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
    <section className="bg-red-600 w-1/3 max-xl:w-1/2 max-md:w-10/12 p-3">
      <p ref={errRef} className={errMsg ? "errmsg" : "hidden"} aria-live="assertive">
        {errMsg}
      </p>
      <h1 className="movie-header text-5xl pb-5">Create Account</h1>
      <form className="flex flex-col">
        <div className="my-4">
          <div>
            <label className="text-white" htmlFor="username">
              Username:
            </label>
            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hidden"} />
            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hidden" : "invalid"} />
          </div>
          <div>
            <input className="w-full rounded-lg p-2" type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} />
          </div>
          <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "hidden"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>

        <div className="my-4">
          <div>
            <label className="text-white" htmlFor="password">
              Password:
            </label>
            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hidden"} />
            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : "invalid"} />
          </div>
          <input className="w-full rounded-lg p-2" type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} />

          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hidden"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special character.
            <br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>
        </div>
        <div className="my-4 pb-5">
          <div>
            <label className="text-white" htmlFor="confirm_pwd">
              Confirm Password:
            </label>
            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hidden"} />
            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hidden" : "invalid"} />
          </div>
          <div>
            <input className="w-full rounded-lg p-2" type="password" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)} value={matchPwd} required aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)} />
          </div>
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "hidden"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
        </div>
        <button className="bg-red-800 movie-header text-2xl py-3 rounded-lg mb-10" disabled={!validName || !validPwd || !validMatch ? true : false}>
          Sign Up
        </button>
      </form>
      <p className="font-light text-white">
        Already registered?
        <br />
        <Link to="/signin">
          <span>
            <p className="underline">Sign In</p>
          </span>
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
