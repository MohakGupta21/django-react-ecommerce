import React, { useState } from "react";
import axios_api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Send email to the backend
    setIsLoading(true);
    try {
      await axios_api.get(`user/password-reset/${email}/`).then((res) => {
        console.log(res.data.otp);
        alert("An Email has been sent to you");
        // navigate('/create-new-password');
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      alert("Email does not exist");
      setIsLoading(false);
    }
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
                        <div>
                          {/* Email input */}
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={email}
                              className="form-control"
                              placeholder="Enter Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>


                          {
                            isLoading===true?
                            <button
                            className="btn btn-primary w-100"
                            onClick={handleSubmit}
                          >
                            <span className="mr-2">Processing </span>
                            <i className="fas fa-spinner fa-spin" />
                          </button>
                          :
                          <button
                          className="btn btn-primary w-100"
                          
                          onClick={handleSubmit}
                        >
                          <span className="mr-2">Send Email</span>
                          <i className="fas fa-paper-place" />
                        </button>
                          }


                          <div className="text-center">
                            <p className="mt-4">
                              Want to sign in?
                              <Link to="/login">Login</Link>
                            </p>
                          </div>
                        </div>
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

export default ForgotPassword;
