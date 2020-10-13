import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from "../App"
const $ = window.$;
const NavBar = () =>{

  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const renderlist = () =>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/myfollowingpost">Following</Link></li>,
        <li><Link to="/create">Createpost</Link></li>,
        <li><Link to="/">Home</Link></li>,
        <button className="btn waves-effect waves-light #6a1b9a purple darken-3 "
        onClick = {()=>{
          localStorage.clear();
          dispatch({
            type:"CLEAR"
          })
          history.push("/login")
        }}>
        Logout</button>
      ]
    }else{
      return[
      <li><Link to="/login">Login</Link></li>,
      <li><Link to="/signup">Signup</Link></li>]
    }
  }

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
    return(
    <div>
    
  <nav>
    <div className="nav-wrapper grey darken-4">
    <Link to={state ? "/": "/signup" }className="brand-logo left">SpeakWithImages</Link>
      <Link to="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></Link>
      <ul className="right hide-on-med-and-down">
        {renderlist()}
      </ul>
    </div>
  </nav>

  <ul className="sidenav grey darken-4" id="mobile-demo">
        {renderlist()}
  </ul>
  </div>
    )
}
export default NavBar;

