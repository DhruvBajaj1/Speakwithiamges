import React, {useEffect,useState,useContext} from 'react'
import {UserContext} from "../../App"
import {useParams} from 'react-router-dom'
const UserProfile= () =>{
    const [userProfile,setProfile] = useState(null);
    const {state,dispatch}= useContext(UserContext);
    const {userid} = useParams()
    const [showfollow,setShowFollow]=useState(state? !state.following.includes(userid) :true);
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(res=>{
            //console.log(res)
            setProfile(res)
        })
    },[])
    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }

    return(
        <>
        {userProfile? 
            <div style = {{maxWidth:"800px",margin:"0px auto"}}>
            <div style = {{
            display: "flex",
            margin:"18px 0px",
            justifyContent:"space-around",
            borderBottom:"2px solid grey"
            }}>
                <div>
                    <img 
                    style = {{width:"200px",height:"200px",borderRadius:"100px"}}
                    src={userProfile.user.pic}
                     />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <div style = {{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{userProfile.posts.length} posts</h6>
                        <h6>{userProfile.user.followers.length} followers</h6>
                        <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {
                        showfollow ?
                        <div>
                        <button className="btn waves-effect waves-light #ec407a pink lighten-1"
                        onClick = {()=>followUser()} >Follow</button>
                        </div>
                        :
                        <div>
                        <button className="btn waves-effect waves-light #ec407a pink lighten-1"
                        onClick = {()=>unfollowUser()} >Unfollow</button>
                        </div>
                    }
                </div>
            </div>
        
        <div className = "gallery">
        {
            userProfile.posts.map(item=>{
                return  <img style = {{width:"250px",height:"250px"}}
                key ={item._id} className="item" src={item.photo} alt ={item.title}/>
            })
        }
        </div>
        </div>
         :<h2>loading</h2>}
        </>
    )
}
export default UserProfile;