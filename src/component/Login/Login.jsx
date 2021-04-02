import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import {
  fireAuth,
  googleSignIn,
  initializeAppfirebase,
  signInWithEmailAndPassword,
  signupWithEmailAndPassword,
} from "../../Firebase/FirebaseAuthentication";

initializeAppfirebase();

const Login = () => {
  const [setLoggedInUserInfo, isLoggedIn, setIsLoggedIn] = useContext(
    UserContext
  );

  const [logInError, setLogInError] = useState("");

  const [isNewUser, setIsNewUser] = useState(() => false);
  const [inputError, setInputError] = useState({});
  const [inputStatus, setInputStatus] = useState({});
  const [inputUserInfo, setInputUserInfo] = useState({});
  const [inputLoginUser, setInputLoginUser] = useState({});

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  if (!isLoggedIn) {
    fireAuth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        setLoggedInUserInfo(userAuth);
        setIsLoggedIn(true);
        history.replace(from);
      } else {
        console.log("userAuth");
        setLoggedInUserInfo({});
        setIsLoggedIn(false);
      }
    });
  }

  const updateInputUserInfo = (name, value) => {
    const newInputUserInfo = { ...inputUserInfo };
    newInputUserInfo[name] = value;
    setInputUserInfo(newInputUserInfo);
    //console.log(inputUserInfo)
  };

  const inputValidator = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let message = "";
    let status = false;

    if (name === "name") {
      if (/[0-9a-zA-Z]{6,}/.test(value)) {
        message = "";
        status = true;
      } else {
        message = "Name should be at least 6 character";
      }
    }

    if (name === "email") {
      if (/\S+@\S+\.\S+/.test(value)) {
        message = "";
        status = true;
      } else {
        message = "Please input valid email address";
      }
    }

    if (name === "password") {
      if (/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(value)) {
        message = "";
        status = true;
      } else {
        message =
          "Password shuld be minimum 8 characters and at least 1 number";
      }
    }

    if (name === "confirmPassword") {
      if (value === inputUserInfo?.password) {
        message = "";
        status = true;
      } else {
        message = "Password did not match";
      }
    }

    if (status) {
      updateInputUserInfo(name, value);
    } else {
      updateInputUserInfo(name, "");
    }

    const newInputError = { ...inputError };
    newInputError[name] = message;

    const newInputStatus = { ...inputStatus };
    newInputStatus[name] = status;

    setInputError(newInputError);
    setInputStatus(newInputStatus);
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = inputUserInfo;
    if (name && email && password && confirmPassword) {
      signupWithEmailAndPassword(email, password, name).then((res) => {
        const newUser = {
          ...res,
          displayName: name,
        };

        handleResponse(newUser, res.success);
      });
    }
  };

  const handleLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputLoginUser({
      ...inputLoginUser,
      [name]: value,
    });
  };

  const submitSignIn = (e) => {
    e.preventDefault();
    const { email, password } = inputLoginUser;
    console.log(email, password);
    signInWithEmailAndPassword(email, password).then((res) => {
      handleResponse(res, res.success);
    });
  };

  const signInWithGoogle = () => {
    googleSignIn().then((res) => {
      console.log(res);
    });
  };

  const handleResponse = (res, success) => {
    if (success) {
      console.log(res);
      setLoggedInUserInfo(res);
      setLogInError("");
      history.replace(from);
    } else {
      console.log(res.error);
      setLogInError(res.error);
    }
  };

  const registrationForm = (
    <form className="form" onSubmit={submitSignUp}>
      <h3 className="mb-3">Create an account</h3>
      <div className="form-group">
        <input
          className="form-control"
          name="name"
          onChange={inputValidator}
          type="text"
          placeholder="Enter your name"
          required
        />
        <small className="text-danger">{inputError?.name}</small>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          name="email"
          onChange={inputValidator}
          type="text"
          placeholder="Enter your email"
          required
        />
        <small className="text-danger">{inputError?.email}</small>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          name="password"
          onChange={inputValidator}
          type="password"
          placeholder="Create your password"
          required
        />
        <small className="text-danger">{inputError?.password}</small>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          name="confirmPassword"
          onChange={inputValidator}
          type="password"
          placeholder="Re-type your password"
          required
        />
        <small className="text-danger">{inputError?.confirmPassword}</small>
      </div>
      <div className="form-group">
        <input
          className="btn btn-primary btn-block"
          type="submit"
          value="Create an account"
        />
      </div>

      <div className="text-center">
        <p className="p-0 m-0">
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setIsNewUser(false)}
            className="text-success"
          >
            {" "}
            Login
          </span>{" "}
        </p>
        <p>-OR-</p>
      </div>
    </form>
  );

  const loginForm = (
    <form className="form" onSubmit={submitSignIn}>
      <h3 className="mb-3">Login</h3>
      <div className="form-group">
        <input
          className="form-control"
          name="email"
          onChange={handleLoginInput}
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          name="password"
          onChange={handleLoginInput}
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary btn-block" type="submit">
          <span>
            <i className="fas fa-sign-in-alt"></i>{" "}
          </span>{" "}
          Sign in{" "}
        </button>
      </div>

      <div className="text-center">
        <p className="p-0 m-0">
          Don't have a account?{" "}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setIsNewUser(true)}
            className="text-primary"
          >
            {" "}
            Create an account
          </span>{" "}
        </p>
        <p>-OR-</p>
      </div>
    </form>
  );

  return (
    <div className="container">
      <div className=" d-flex justify-content-center mt-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {isNewUser ? registrationForm : loginForm}

              <div className="text-center">
                <button
                  onClick={signInWithGoogle}
                  className="btn btn-primary btn-block"
                >
                  <span>
                    <i className="fab fa-google"></i>{" "}
                  </span>{" "}
                  Sign in with Google
                </button>
              </div>
              {logInError ? (
                <div className="alert alert-warning mt-4" role="alert">
                  {logInError}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
