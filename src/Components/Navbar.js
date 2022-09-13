import React from 'react';
import { Link} from 'react-router-dom';

export default function Navbar({setIsAuth, isAuth}) {
  
  const signUserOut = ()=>{
      try{
          localStorage.clear();
          setIsAuth(false);
          
      }catch(e){
          console.log("error");
      }
  }

  return (
    <nav className="navbar shadow-sm fixed-top navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Questionaire</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {isAuth&&<li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>}
                    {!isAuth&&<li className="nav-item">
                        <Link className="nav-link btn btn-light btn-sm" to="/login">Login</Link>
                    </li>}
                    {!isAuth&&<li className="nav-item">
                        <Link className="nav-link btn btn-light btn-sm" to="/signup" style={{"color": "black"}}>Signup</Link>
                    </li>}
                    {isAuth&&<li className="nav-item">
                        <Link className="nav-link" to="/me">Profile</Link>
                    </li>}
                    {isAuth&&<li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={signUserOut}>Logout</Link>
                    </li>}
                </ul>
            </div>
        </div>
    </nav>
  )
}
