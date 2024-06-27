import React from "react";
import { useState, useEffect } from "react";
import { login } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await login(email, password);
    console.log(error);
    if (error !== null) {
      alert(error);
    } else {
      navigate("/");
      resetForm();
      
    }
    setLoading(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <section>
      <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <div className="container">
          {/* Section: Login form */}
          <section className="">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-5 col-md-8">
                <div className="card rounded-5">
                  <div className="card-body p-4">
                    <h3 className="text-center">Login</h3>
                    <br />

                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <form onSubmit={handleLogin}>
                          {/* Email input */}
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Email Address
                            </label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              value={email}
                              className="form-control"
                              placeholder="Enter Email"
                              onChange={(e) => handleEmailChange(e)}
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="loginPassword"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={password}
                              placeholder="Enter Password"
                              className="form-control"
                              onChange={(e) => handlePasswordChange(e)}
                            />
                          </div>

                          {loading === true ? (
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              <span className="mr-2">Processing</span>
                              <i className="fas fa-spinner fa-spin" />
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              <span className="mr-2">Sign In </span>
                              <i className="fas fa-user-alt" />
                            </button>
                          )}

                          <div className="text-center">
                            <p className="mt-4">
                              Don't have an account?{" "}
                              <Link to="/register">Register</Link>
                            </p>
                            <p className="mt-0">
                              <Link
                                to="/forgot-password/"
                                className="text-danger"
                              >
                                Forgot Password?
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </section>
  );
}

export default Login;
