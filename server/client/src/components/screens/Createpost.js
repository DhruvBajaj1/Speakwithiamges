import React,{useState,useEffect} from 'react';
import M from "materialize-css";
import {Link,useHistory} from "react-router-dom"

const Createpost =()=>{
  const history = useHistory();
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [image,setImage] = useState("");
  const [url,setUrl] = useState("");
  useEffect(()=>{
    if(url){
    fetch("/createpost",{
      method:"post",
      headers:{"Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
      body:JSON.stringify({
        title,
        body,
        img_url:url
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
     if(data.error){
         M.toast({html:data.error,classes:"#ef9a9a red lighten-3"});
     }else{
         M.toast({html:"Created Post Successfully",classes:"#a5d6a7 green lighten-3"})
         history.push('/');
     }
  })
  .catch(err =>{
      console.log(err);
  })}
  },[url])
  //useEffect code will kick in when url mounts or changes
  const postDetails = () =>{
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
    return (
    <div className="card"
    style = {{
        margin:"10px auto",
        height:"500px  !important" ,
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center",
        backgroundColor:"#536dfe ",
        border:"1px",
        borderRadius:"30px"
    }}>
    <input type="text" 
    style = {{color:"white"}} 
    placeholder ="title" 
    onChange = {(event)=>{setTitle(event.target.value)}}
    value = {title}
    />
    <textarea rows="20" cols="10" 
    placeholder ="body" 
    style = {{color:"white" ,height:"130px"}}
    onChange = {(event)=>{setBody(event.target.value)}}
    value = {body}
    />
    <div className="file-field input-field">
      <div className="btn #6a1b9a purple darken-3">
        <span>Upload Image</span>
        <input type="file" 
          onChange={(event)=>{setImage(event.target.files[0])}}
        />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
    <button onClick = {()=>{
      console.log("Hello")
      postDetails()}
      }
    className="btn waves-effect waves-light #6a1b9a purple darken-3 " type="submit" name="submit">Submit Post
    <i className="material-icons right">send</i>
  </button>
    </div>
    )
}
export default Createpost;