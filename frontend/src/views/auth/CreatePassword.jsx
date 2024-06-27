import React, { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios_api from '../../utils/axios';

function CreatePassword() {
  const [password,setPassword] = useState('');
  const [password2,setPassword2] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const otp = searchParams.get('otp');
  const uidb64 = searchParams.get('uidb64');
  const navigate = useNavigate();

  const handlePass = (e)=>{
    setPassword(e.target.value);
  }
  const handlePass2 = (e)=>{
    setPassword2(e.target.value);
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    if(password!==password2){
        alert("Password does not match");
        setIsLoading(false);
    }
    else{
        const formData = new FormData();
        formData.append('password',password);
        formData.append('otp',otp);
        formData.append('uidb64',uidb64);

        try {
            await axios_api.post('user/password-change/',formData).then((res)=>{
                alert("Password Changed Successfully!");
                console.log(res.data);
                setIsLoading(false);
                navigate('/login');
            })
        } catch (error) {
            alert("An error occured");
            console.log(error);
            setIsLoading(false);
        }
    }

  }
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

                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <form onSubmit={handleSubmit}>

                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Enter Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={password}
                              className="form-control"
                              placeholder="Enter Password"
                              onChange={(e) => handlePass(e)}
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              id="p2"
                              name="p2"
                              value={password2}
                              className="form-control"
                              placeholder="Confirm Password"
                              onChange={(e) => handlePass2(e)}
                            />
                          </div>


                          {
                            isLoading===true?
                            <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            <span className="mr-2">Processing </span>
                            <i className="fas fa-spinner fa-spin" />
                          </button>
                          :
                          <button
                          className="btn btn-primary w-100"
                          type="submit"
    
                        >
                          <span className="mr-2">Change Password </span>
                          <i className="fas fa-check-circle" />
                        </button>
                          }


                          <div className="text-center">
                            <p className="mt-4">
                              Want to sign in?
                              <Link to="/login">Login</Link>
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
  )
}

export default CreatePassword