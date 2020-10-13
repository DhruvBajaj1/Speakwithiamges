import React, {useEffect,useState,useContext} from 'react'
import {UserContext} from "../../App"
const Profile= () =>{
    const [mypics,setPics] = useState([]);
    const {state,dispatch}= useContext(UserContext);
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        fetch("/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(res=>{
            //console.log(res);
            setPics(res.mypost);
        })
    },[])
    useEffect(()=>{
        if(image){
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
              //console.log(data.url)
              setUrl(data.url)
             // localStorage.setItem("user",JSON.stringify({...StaticRange,pic:data.url}))
             // dispatch({type:"UPDATEPIC",payload:data.url})
              fetch("/updatepic",{
                  method:"put",
                  headers:{
                      "Content-Type":"application/json",
                      "Authorization":"Bearer "+localStorage.getItem("jwt")
                  },
                  body:JSON.stringify({
                      pic:data.url
                  })
              }).then(res=>res.json())
              .then(result=>{
                  console.log(result)
                  localStorage.setItem("user",JSON.stringify({...StaticRange,pic:result.pic}))
                  dispatch({type:"UPDATEPIC",payload:result.pic})
              })
             // window.location.reload()
              //console.log(data);
            })
            .catch(err =>{console.log(err)})
        }
    },[image])
    const updatePhoto = (file)=>{
        //console.log(file);
        setImage(file)
    }
    return(
        <div style = {{maxWidth:"800px",margin:"0px auto"}}>
            <div style = {{
            display: "flex",
            margin:"18px 0px",
            justifyContent:"space-around",
            borderBottom:"2px solid grey"
            }}>
                <div>
                <div>
                    <img 
                    style = {{width:"200px",height:"200px",borderRadius:"100px"}}
                    src={state?state.pic:"loading..."}
                     />
                </div>
                <div className="file-field input-field">
                    <div style={{marginLeft:"50px",marginBottom:"5px"}} className="btn #6a1b9a purple darken-3">
                        <span>Upload Profile pic</span>
                        <input type="file" 
                            onChange={(event)=>{updatePhoto(event.target.files[0])}}
                        />
                    </div>
                        <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <div>
                {/* <button style={{marginLeft:"50px",marginBottom:"5px"}} className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" 
                onClick={()=>{
                    updatePhoto()
                }}
                >Update pic</button> */}
                </div>
                </div>
                <div>
                    <h4>{state? state.name:"loading"}</h4>
                    <div style = {{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                          <h6>{state && state.followers ? state.followers.length:"0"} followers</h6>
                          <h6>{state && state.following ? state.following.length:"0"} following</h6>  
                    </div>
                </div>
            </div>
    
        <div className = "gallery">
        {
            mypics.map(item=>{
                return  <img style = {{width:"250px",height:"250px"}}
                key ={item._id} className="item" src={item.photo} alt ={item.title}/>
            })
        }
        </div>
        </div>
    )
}
export default Profile;