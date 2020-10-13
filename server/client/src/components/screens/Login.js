import React,{useState,useContext} from 'react'
import {UserContext} from "../../App"
import {Link,useHistory} from "react-router-dom"
import M from "materialize-css";
const Login = () =>{
    const history =  useHistory();
    const {state,dispatch} = useContext(UserContext);
    const[password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const postData = ()=>{
        if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))){
            return M.toast({html:"invalid email",classes:"#ef9a9a red lighten-3"});
        }
        fetch("/signin",{
            method:"post",
            headers : { 
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                password,
                email,
            })
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data);
           if(data.error){
               M.toast({html:data.error,classes:"#ef9a9a red lighten-3"});
           }else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               //action creator
               dispatch({
                    type:"USER",
                    payload :data.user
               })
               M.toast({html:"Logged in Successfully",classes:"#a5d6a7 green lighten-3"})
               history.push('/');
           }
        })
        .catch(err =>{
            console.log(err);
        })
    }
    return(
        <div className = "mycard">
                <div className="card auth-card">
                    <div className="card-content">
                        SpeakWithImages
                        <input
                        type="text"
                        placeholder="Email"
                        onChange = {(event)=>{
                        setEmail(event.target.value)
                        }
                        }
                        value = {email}
                        />
                        <input
                        type="password"
                        placeholder="Password"
                        onChange = {(event)=>{
                        setPassword(event.target.value)
                        }
                        }
                        />
                        <button className="btn waves-effect waves-light"
                        onClick = {()=>postData()} >Login</button>
                        <h5>
                    <Link to="/signup"><ul>
                        Don't have an account</ul>
                    </Link>
                </h5>
                    </div>
                </div>
            </div>
  
    )
}
export default Login;