import React,{useState,useEffect} from 'react';
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css";

const Signup = () =>{

    const history =  useHistory();
    const [name,setName] = useState("");
    const[password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    //Network Request
    useEffect(()=>{
        if(url){
            uploadFields();
        }
    },[url])

    const uploadFields = ()=>{
        if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))){
            return M.toast({html:"invalid email",classes:"#ef9a9a red lighten-3"});
        }
        fetch("/signup",{
            method:"post",
            headers : { 
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        })
        .then(res => res.json())
        .then(data=>{
           if(data.error){
               M.toast({html:data.error,classes:"#ef9a9a red lighten-3"});
           }else{
               M.toast({html:data.message,classes:"#a5d6a7 green lighten-3"})
               history.push('/login');
           }
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const postData = ()=>{
        if(image){
            uploadPic();
        }else{
            uploadFields();
        }
       
    }

    const uploadPic = () =>{
           const data = new FormData()
           data.append("file",image)
           data.append("upload_preset","speakwithimages")
           data.append("cloud_name","dhruvb")
           fetch("https://api.cloudinary.com/v1_1/dhruvb/image/upload",{
             method:"post",
             body:data
           })
           .then(res =>res.json())
           .then(data=>{
             setUrl(data.url)
             //console.log(data);
           })
           .catch(err =>{console.log(err)})
      }


    return(
        <div className = "mycard">
        <div className="card auth-card">
            <div className="card-content">
                SpeakWithImages
                <input
                type="text"
                placeholder="Name"
                onChange = {(event)=>{
                    setName(event.target.value)
                }
                }
                value={name}
                />
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
                value = {password}
                />
                 <div className="file-field input-field">
                    <div className="btn #6a1b9a purple darken-3">
                        <span>Upload Profile pic</span>
                        <input type="file" 
                            onChange={(event)=>{setImage(event.target.files[0])}}
                        />
                    </div>
                        <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>

                <button className="btn waves-effect waves-light" 
                onClick = {()=>postData()}
                >Signup</button>
                <h5>
                    <Link to="/login">
                        Already have an account
                    </Link>
                </h5>
            </div>
        </div>
    </div>
    )
}
export default Signup;