const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const {MONGOURI} = require("./config/keys");

mongoose.connect(MONGOURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        .then(()=>{
            console.log("Connected to mongoDB....")
        })
        .catch(err =>{
            console.log(err);
        })

require("./models/user");
require("./models/post");


app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/posts"));    
app.use(require("./routes/user"));  



if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"))
    const path = require("path")
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



app.listen(PORT,()=>{
    console.log("Server is running at port " + PORT);
})





// Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.
// a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());
// b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());


//making custom middleware for node
//middleware will modify the request before it reaches actual route handler
// const customMiddleware = (req,res,next) =>{
//     console.log("middleware executed!")
//     //next will execute the code further or next middleware
//     next();
// }
// This middleware will run for all routes
//app.use(customMiddleware);

// const customElements = (req,res,next) =>{
//     console.log("elements middleware executed!")
//     //next will execute the code further or next middleware
//     next();
// }


// app.get('/about',customElements,(req,res)=>{
//     console.log("about");
//     res.send("About Page");
// })