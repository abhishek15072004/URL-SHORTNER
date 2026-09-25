const express=require("express");
const {connecttomongodb}=require("./connect.js");
const urlroutes=require("./routes/url");
const URL=require('./models/url.js');
const app=express();
const port=8005;

connecttomongodb("mongodb://localhost:27017/short-url").then(()=>console.log("mongodb connected"));
app.use(express.json());
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