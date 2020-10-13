import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Login from "./components/screens/Login"
import Profile from "./components/screens/Profile"
import Home from "./components/screens/Home"
import Signup from "./components/screens/Signup"
import Createpost from "./components/screens/Createpost"
import {reducer, initialState} from  "./reducers/userReducer"
import UserProfile from './components/screens/UserProfile';
import SubscribedUserPosts from './components/screens/SubscribedUserPosts';
export const UserContext = createContext()

const Routing = () =>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({
        type:"USER",
        payload:user
      })
      //history.push("/")
    }
    else{
      history.push("/login")
    }
  },[])
  // switch will make sure that one route is active at a time
  return (
  <Switch> 
    <Route exact path = "/">
      <Home/>
    </Route>
    <Route path = "/signup">
      <Signup/>
    </Route>
    <Route path = "/login">
      <Login/>
    </Route>
    <Route exact path = "/profile">
      <Profile/>
    </Route>
    <Route path = "/create">
      <Createpost/>
    </Route>
    <Route path = "/profile/:userid">
      <UserProfile/>
    </Route>
    <Route path = "/myfollowingpost">
      <SubscribedUserPosts/>
    </Route>
  </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="App">
    <UserContext.Provider value = {{state:state,dispatch:dispatch}}>
    <BrowserRouter>
    <NavBar/>
    < Routing />
    </BrowserRouter>
    </UserContext.Provider>
    </div>
  );
}

export default App;
