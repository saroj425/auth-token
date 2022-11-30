const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const secret = "sarojsecret"

const PORT = 3000;


app.get("/",(req,res)=>{
    res.json({message:"Hello serveer"});
}),

app.post("/login",(req,res)=>{
    const user = {
        id:1,
        username : "saroj",
        email:"saroj425@gmail.com"
    }
    jwt.sign({user},secret,{expiresIn:'300s'},(error,token)=>{
            res.json({
                token
            })
    })
})

app.post("/profile",verifytoken,(req,res)=>{
    jwt.verify(req.token,secret,(error,authData)=>{
        if(error){
            res.send({
                result:"Invalid token"
            })
        }else{
            res.json({
                message:"Profile accessed",
                authData
            })
        }
    })
  
})

function verifytoken(req,res,next){
    const brearerdHeader = req.headers['authorization'];
    if(typeof brearerdHeader !== "undefined"){

        const bearer = brearerdHeader.split(" ");
        const token = bearer[1];
        req.token=token;
        next();
    }else{
        res.send({
            result:"Token is not valid"
        })
    }
}



app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} port`);
})
