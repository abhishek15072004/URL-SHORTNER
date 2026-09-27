const express=require("express");
const path =require('path');
const {connecttomongodb}=require("./connect.js");
const urlroutes=require("./routes/url");
const staticroute=require('./routes/staticrouters')
const URL=require('./models/url.js');
const app=express();
const port=8005;

connecttomongodb("mongodb://localhost:27017/short-url").then(()=>console.log("mongodb connected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static("public"));


app.use('/',staticroute);
app.use("/url",urlroutes);



app.get('/:shortid',async (req,res)=>{
    const shortid=req.params.shortid;
   const entry= await URL.findOneAndUpdate(
        {
            shortid,
        },
        {
            $push:{
                visithistory: {
        timestamp: Date.now()
    }
            },
        }
    );
    res.redirect(entry.redirecturl);
})





app.listen(port,()=>console.log(`server started at ${port}`));