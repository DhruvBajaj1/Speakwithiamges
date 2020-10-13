const express = require("express");

const router = express.Router()
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin")

const {JWT_SECRET} = require("../config/keys")

// router.get("/protected",requireLogin,(req,res)=>{
//     res.send("Hello user")
// })
router.post("/signup",(req,res)=>{
    const {name,email,password,pic} = req.body;
    if(!email || !password || !name){
        //422 means server has understood the request but cannot process it.
        return res.status(422).json({error:"please add all the fields"});
    }
    User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"user already exists with that email"})
            }
            else{
                bcrypt.hash(password,12)
                .then(hashedpassword=>{
                    const user = new User({
                        //email : email, or condense them
                        email,
                        password:hashedpassword,
                        name,
                        pic,
                    })
                    user.save()
                    .then(user=>{
                        res.json({message:"saved Successfully"})
                    })
                    .catch(err =>{
                        console.log(err);
                    })
                }
                )}    
            })
        .catch(err =>{
            console.log(err);
        })
        
});
router.post("/signin",(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(422).json({error:"Please add email or password"});
    }
    User.findOne({email:email})
    .then(savedUser =>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or Password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){// boolean value in doMatch
                //res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
                }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})
module.exports = router;
