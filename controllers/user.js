const {v4:uuidv4}=require('uuid')
const user=require("../models/user");
const {setuser}=require('../service/auth');

async function handleusersignup(req,res) {
    const {name,email,password}=req.body;
    await user.create({
        name,
        email,
        password,
    });
    return res.render("home");
    
}

async function handleuserlogin(req,res) {
    const {email,password}=req.body;
  const user1= await user.findOne({email,password});
if(!user1){ 
    return res.render("login", {
        error:"Invalid username or password",
    });
}
const sessionid=uuidv4();
setuser(sessionid,user1);
res.cookie('uid',sessionid);
    return res.redirect("/");


    
}

module.exports={
    handleusersignup,
    handleuserlogin,
}