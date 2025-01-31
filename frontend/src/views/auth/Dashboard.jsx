import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

function Dashboard() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  return (
    <>
      {isLoggedIn() ?
        <div>
          <h1>Dashboard</h1>
          <Link to={"/logout"}>Logout</Link>
        </div>
       : 
        <div>
          <h1>Home Page</h1>
          <div className="d-flex">
          <Link className='btn btn-primary' to={"/register"}>Register</Link>
          <br />
          <Link className='btn btn-success ms-4' to={"/login"}>Login</Link>
          </div>

        </div>
      }
    </>
  );
}

export default Dashboard;
