import { useRouter } from "next/router";
import { useState } from "react";
import Message from "../message";
import catchError from "../../utils/catchError";
import {
  setToken,
  setProfile,
  setIsAuthenticated,
} from "../../utils/AuthService ";
import { AxiosInstance } from "../../utils/Helper";
import styles from "./index.module.scss";

export default function LoginComponent() {
  const router = useRouter();

  const INITIAL_USER = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(INITIAL_USER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit");
    if (!re.test(user.email)) {
      setError("Enter valid email address");
      return;
    }
    setLoading(true);
    setError("");

    try {
      AxiosInstance.post("/auth/login", JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log(res);

          if (res.status == 200 && res.data.user) {
            setProfile(res.data.user);
            setToken(res.data.jwt);
            setIsAuthenticated(true);
            router.replace("/uploads");
          } else {
            setError(res.data.error);
          }
        })
        .catch((error) => {
          setError(catchError(error));
        })
        .then(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setError("Something went wront try again");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFacebookSuccess = (data) => {
    console.log(data);
  };

  const handleSocialLoginFailure = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div
        className={`d-flex align-items-center min-vh-100 py-3 py-md-0 ${styles.login} `}
      >
        <div className="container">
          <div className={`card ${styles.loginCard}`}>
            <div className="row no-gutters">
              <div className="col-md-5">
                <img
                  src="/img/login.webp"
                  alt="Login"
                  className={styles.loginCardImg}
                />
              </div>
              <div className={styles.close}>
                <img
                  alt="Close"
                  src="/svg/close.svg"
                  width={25}
                  height={25}
                  onClick={() => router.replace("/")}
                />
              </div>
              <div className="col-md-7">
                <div className={styles.cardBody}>
                  <div className={styles.brandWrapper}>
                    <img
                      src="/img/logo.png"
                      alt={process.env.NAME_SPACE}
                      className="logo"
                      onClick={() => router.replace("/")}
                    />
                  </div>
                  <p className={styles.loginCardDescription}>
                    Sign into your account
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        value={user.email}
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="***********"
                        value={user.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button
                      name="login"
                      id="login"
                      className={`btn btn-block mb-4 ${styles.loginBtn}`}
                      type="submit"
                      value="Login"
                    >
                      {" "}
                      {!loading ? (
                        "Login"
                      ) : (
                        <div>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          Loading...
                        </div>
                      )}
                    </button>
                  </form>

                  {error && <Message success={false} message={error} />}

                  {/* <a href='#!' className='forgot-password-link'>
                      Forgot password?
                    </a> */}
                  <p className={styles.loginCardFooterText}>
                    Don't have an account?{" "}
                    <button
                      onClick={() => router.replace("/signup")}
                      className="btn btn-link"
                    >
                      Register here
                    </button>
                  </p>
                  {/* <SocialButton
                    provider='facebook'
                    appId='YOUR_APP_ID'
                    onLoginSuccess={handleFacebookSuccess}
                    onLoginFailure={handleSocialLoginFailure}
                  >
                    Login with Facebook
                  </SocialButton> */}
                  {/* <nav className='login-card-footer-nav'>
                      <a href='#!'>Terms of use.</a>
                      <a href='#!'>Privacy policy</a>
                    </nav> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
