const shortid=require("shortid");
const url=require('../models/url');
async function handlegeneratenewshorturl(req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({error:'url is required'});

    // if redirecturl already exist
    const existingurl = await url.findOne({
        redirecturl: body.url
    });

    if (existingurl) {

        const allurls = await url.find({});

        return res.render("home", {
            id: existingurl.shortid,
            urls: allurls
        });
    }



// creating new shortid
        const id=shortid();
    await url.create({
        shortid:id,
        redirecturl:body.url,
        visithistory:[],
        createdby:req.user._id,

    });
    const allurls=await url.find({});
    
    return res.render('home',
        {
         id:id,
         urls:allurls,
        });
}
async function handlegetanalytics(req,res){
    const shortid = req.params.shortid;

    const result = await url.findOne({shortid});

    return res.json({
        totalclicks: result.visithistory.length,
        analytics: result.visithistory
    });
}
module.exports={
    handlegeneratenewshorturl,
    handlegetanalytics,
}